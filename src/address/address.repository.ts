import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { CreateAddressDto } from "./dto/create-address.dto";
import { SaveAddressDto } from "./dto/save-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Address } from "../address/entities/address.entity";
import { AddressModel } from "src/shared/database/models/address/address.model";
import { UserModel } from "src/shared/database/models/user/user.model";

@Injectable()
export class AddressRepository extends MongooseRepository<
  AddressModel,
  Address
> {
  constructor(
    @InjectModel(AddressModel.name)
    private addressModel: Model<AddressModel>,
    @InjectModel(UserModel.name)
    private userModel: Model<UserModel>,
  ) {
    super(addressModel);
  }
  public async createAddress(
    _id: string,
    createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    try {
      const found = await this.addressModel.find({ user_id: _id });
      if (found.length === 0) {
        const savedAddressDto: SaveAddressDto = {
          ...createAddressDto,
          user_id: _id,
        };
        const newEntity = new this.addressModel(savedAddressDto);
        const savedAddress = await newEntity.save();
        const { _id: addressId } = savedAddress;
        await this.userModel.findOneAndUpdate(
          { _id: _id },
          { address_id: addressId },
        );
        return savedAddress.toObject();
      } else {
        throw new BadRequestException("Sorry! An address already exists!");
      }
    } catch (err) {
      throw err;
    }
  }
  public async deleteAddress(
    userId: string,
    addressId: string,
  ): Promise<boolean> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: userId, address_id: addressId },
        { address_id: null },
      );
      if (updatedUser) {
        const deletedAddress = await this.addressModel.findOneAndDelete({
          _id: addressId,
          user_id: userId,
        });
        if (deletedAddress) return true;
        else throw new NotFoundException("NOT_FOUND");
      } else {
        throw new NotFoundException("NOT_FOUND");
      }
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
      const updateAddress = await this.addressModel.findOneAndUpdate(
        { _id: addressId, user_id: userId },
        { ...updateAddressDto },
        { new: true },
      );
      if (updateAddress) {
        return updateAddress.toObject();
      } else {
        throw new NotFoundException("NOT_FOUND");
      }
    } catch (err) {
      throw err;
    }
  }
  async getAddressesWithinCertainMeters(
    coordinates: number[],
    distInMeter: number,
  ): Promise<Address[]> {
    try {
      const res = await this.addressModel.aggregate([
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
      ]);
      return res;
    } catch (err) {
      throw err;
    }
  }
}
// const options = {
//     location:{
//     $geoWithin:{$centerSphere:[[88.146350,24.969820], 150/3963.2]}
//     }
// };
