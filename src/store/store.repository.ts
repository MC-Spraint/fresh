import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { CreateStoreRequest } from "./dto/request/create-store.request";
import { Store } from "./entities/store.entity";
import { StoreModel } from "src/shared/database/models/store/store.model";
import { UserModel } from "src/shared/database/models/user/user.model";
import { StoreWorkingHours } from "./entities/store-working-hours.entity";
import { PaginatorOfStores } from "./dto/response/paginator-of-stores.dto";
import { Types } from "mongoose";
@Injectable()
export class StoreRepository extends MongooseRepository<StoreModel, Store> {
  constructor(
    @InjectModel(StoreModel.name)
    private storeModel: Model<StoreModel>,
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>,
  ) {
    super(storeModel);
  }
  public async createStore(
    vendor_id: Types.ObjectId,
    createStoreDto: CreateStoreRequest,
  ): Promise<Store> {
    try {
      const userAlreadyhasStore = await this.storeModel.count({
        vendor_id: vendor_id,
      });
      if (userAlreadyhasStore === 1) {
        throw new BadRequestException("Store already exists");
      }
      const createdStore = new this.mongooseModel({
        vendor_id: vendor_id,
        ...createStoreDto,
      });
      const store = await createdStore.save();
      return store.toObject();
    } catch (err) {
      throw err;
    }
  }
  async findStoreById(id: string): Promise<Store | null> {
    try {
      const filter = { _id: id, status: true };
      const store: Store | null = await this.storeModel.findOne(filter);
      return store;
    } catch (err) {
      throw err;
    }
  }
  public async getStoresWithinCertainMeters(
    coordinates: number[],
    distInMeter: number,
    name: string,
    page_no: number,
    per_page: number,
  ): Promise<PaginatorOfStores> {
    try {
      const regex = new RegExp(String(name === undefined ? "" : name), "i");
      const total_entity: number = await this.storeModel.count({
        title: regex,
      });

      const page = page_no || 1;
      const limit = per_page || 5;
      const total_pages = Math.ceil(total_entity / limit);
      const pre_page = page - 1 ? page - 1 : null;
      const next_page = total_pages < page + 1 ? null : page + 1;
      const offset = (page - 1) * limit;
      const stores = await this.storeModel.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [coordinates[0], coordinates[1]],
            },
            maxDistance: distInMeter,
            spherical: true,
            distanceField: "distanceInMeter",
          },
        },
        { $match: { $and: [{ title: regex }, { status: { $eq: true } }] } },
        { $sort: { distanceInMeter: 1 } },
        { $skip: offset },
        { $limit: limit },
      ]);
      const paginatorOfStores = {
        page: page,
        per_page: limit,
        pre_page: pre_page,
        next_page: next_page,
        total: total_entity,
        total_pages: total_pages,
        data: stores,
      };
      return paginatorOfStores;
    } catch (err) {
      throw err;
    }
  }
  async addWorkingHours(
    storeId: string,
    workingHours: StoreWorkingHours,
  ): Promise<string> {
    try {
      const { _id } = await this.userModel.findOneAndUpdate(
        { _id: storeId },
        { ...workingHours },
        { new: true, projection: { _id: true } },
      );
      return _id;
    } catch (err) {
      throw err;
    }
  }
  async addManager(storeId: string, managerId: string): Promise<string> {
    try {
      const { _id } = await this.userModel.findOneAndUpdate(
        { _id: storeId },
        { $push: { managers: managerId } },
        { new: true, projection: { _id: true } },
      );
      return _id;
    } catch (err) {
      throw err;
    }
  }
  // public async findStoreWithinCertainKmsWithPagination(): Promise<Store[]> {

  // }
}
