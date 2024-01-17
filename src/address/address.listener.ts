import { Injectable } from "@nestjs/common";
import { AddressRepository } from "./address.repository";

@Injectable()
export class AddressListener {
  constructor(private readonly _addressRepo: AddressRepository) {}
}
