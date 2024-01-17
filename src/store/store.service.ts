import {
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { StoreRepository } from "./store.repository";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { CreateStoreRequest } from "./dto/request/create-store.request";
import { StoreEmitter } from "./background-jobs/store.emitter";
import { Store } from "./entities/store.entity";
import { StoreAddedEvent } from "./background-jobs/events/store-added.event";
import { StoreEvents } from "./background-jobs/events/store.event.enum";
import { PaginatorOfStores } from "./dto/response/paginator-of-stores.dto";
import { Types } from "mongoose";
@Injectable()
export class StoreService {
  private readonly logger = new Logger(StoreService.name);
  constructor(
    private readonly _storeRepo: StoreRepository,
    private readonly _storeEmitter: StoreEmitter,
    private readonly _emitter: EventEmitter2,
  ) {}

  async createStore(
    vendor_id: Types.ObjectId,
    createStoreDto: CreateStoreRequest,
  ): Promise<Store> {
    const createdStore = await this._storeRepo.createStore(
      vendor_id,
      createStoreDto,
    );
    if (createdStore) {
      this._emitter.emit(
        StoreEvents.STORE_ADDED,
        new StoreAddedEvent(String(vendor_id), String(createdStore._id)),
      );
      //TODO: fire event to update business module
      return createdStore;
    } else throw new NotAcceptableException("Sorry! Request is not accepted");
  }
  async getStoresWithinCertainMeters(
    coordinates: number[],
    distInMeter: number,
    name: string,
    page: number,
    limit: number,
  ): Promise<PaginatorOfStores> {
    return await this._storeRepo.getStoresWithinCertainMeters(
      coordinates,
      distInMeter,
      name,
      page,
      limit,
    );
  }
  async findStoreById(id: string): Promise<Store | null> {
    const store: Store | null = await this._storeRepo.findStoreById(id);
    return store;
  }
  // async updateWorkingHours(
  //   userId: string,
  //   workingHours: StoreWorkingHours,
  // ): Promise<string> {
  //   const storeId =
  // }
  async finAll(): Promise<Store[] | null> {
    const stores: Store[] = await this._storeRepo.find({});
    return stores;
  }
  async findAllWithpagination(
    limit: number,
    page: number,
    name: string,
  ): Promise<{
    queries: string;
    cur_page: number;
    total_pages: number;
    total_entity: number;
    entities: Store[];
  }> {
    const regex = new RegExp(String(name === undefined ? "" : name), "i");
    const storesPerPage = await this._storeRepo.findAllWithPagination(
      limit === undefined ? 10 : limit,
      page === undefined ? 1 : page,
      { store_name: regex },
      null,
    );
    if (storesPerPage !== null && storesPerPage !== undefined) {
      return storesPerPage;
    } else {
      throw new NotFoundException("Documents not found");
    }
  }
}
