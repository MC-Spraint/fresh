import { Injectable } from "@nestjs/common";
import { AddressRepository } from "./address.repository";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "./entities/address.entity";
@Injectable()
export class AddressService {
  constructor(private readonly _addressRepo: AddressRepository) {}

  public async createAddress(
    userId: string,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    try {
      const response = await this._addressRepo.createAddress(
        userId,
        createAddressDto,
      );
      return response;
    } catch (err) {
      throw err;
    }
  }
  public async deleteAddress(
    userId: string,
    addressId: string,
  ): Promise<boolean> {
    try {
      const response = this._addressRepo.deleteAddress(userId, addressId);
      return response;
    } catch (err) {
      throw err;
    }
  }
  public async updateAddress(
    userId: string,
    addressId: string,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    try {
      const updatedAddress = await this._addressRepo.updateAddress(
        userId,
        addressId,
        updateAddressDto,
      );
      return updatedAddress;
    } catch (err) {
      throw err;
    }
  }
  async getAddressesWithinCertainMeters(
    coordinates: number[],
    distInMeter: number,
  ): Promise<Address[]> {
    try {
      const res = await this._addressRepo.getAddressesWithinCertainMeters(
        coordinates,
        distInMeter,
      );
      return res;
    } catch (err) {
      throw err;
    }
  }
}
