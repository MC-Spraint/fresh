import { Logger } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { StoreAddedEvent } from "./events/store-added.event";
import { StoreEvents } from "./events/store.event.enum";
export class StoreEmitter {
  constructor(private readonly _emitter: EventEmitter2) {}
  private readonly logger: Logger = new Logger(StoreEmitter.name);
  private readonly em = new EventEmitter2();
  public fireStoreAdded(payload: StoreAddedEvent): void {
    this._emitter.emit(StoreEvents.STORE_ADDED, payload);
    this.logger.log(`Emitted ${StoreEvents.STORE_ADDED}`);
  }
}
