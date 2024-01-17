import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Query,
} from "@nestjs/common";
import { GetUser } from "src/shared/auth/decorators/get-user.decorator";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { Response } from "express";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/shared/auth/decorators/roles.decorator";
import { RolesGuard } from "src/shared/auth/guards/roles.guard";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";
import { LogoutResponse } from "src/user/dto/response/logout.response";
import { UtilService } from "src/shared/utils/util.service";
import { SuccessResponse } from "src/shared/utils/dtos/success-response.enum";
import { Address } from "../address/entities/address.entity";
import { User } from "src/user/entity/user.entity";
import { AuthGuard } from "src/shared/auth/guards/auth.guard";
import { CommonErrorResponseDto } from "src/shared/utils/dtos/common-error-response.dto";

@Controller("user/address")
export class AddressController {
  constructor(
    private readonly _util: UtilService,
    private readonly _addressService: AddressService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  @ApiOperation({ description: "Create address for user" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Address saved successfully!",
    type: LogoutResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Get("/get")
  async getAddressesWithinCertainMeters(
    @GetUser() user: User,
    @Query() query: any,
  ) {
    try {
      const { dist, location } = query;
      const addresses =
        await this._addressService.getAddressesWithinCertainMeters(
          [24.96982, 88.14635],
          Number(dist),
        );
      return addresses;
    } catch (err) {
      throw err;
    }
  }
  @Post("/create")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  @ApiOperation({ description: "Create address for user" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Address saved successfully!",
    type: LogoutResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  async create(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    const { _id } = user;
    const savedAddress = await this._addressService.createAddress(
      String(_id),
      createAddressDto,
    );
    const resObj = this._util.successResponse<Address>(
      SuccessResponse.CREATED,
      "Address saved successfully!",
      savedAddress,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }
  @Delete("/delete/:id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  @ApiOperation({ description: "Delete address for user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Address deleted successfully!",
    type: LogoutResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  async delete(
    @Res() res: Response,
    @GetUser() user: User,
    @Param("id") addressId: string,
  ) {
    const { _id: userId } = user;
    const response = await this._addressService.deleteAddress(
      addressId,
      String(userId),
    );
    const resObj = this._util.successResponse<boolean>(
      SuccessResponse.OK,
      "Address deleted successfully!",
      response,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }
  @Patch("/update/:id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  @ApiOperation({ description: "Updatee address for user" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Address updated successfully!",
    type: LogoutResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  async update(
    @Res() res: Response,
    @GetUser() user: User,
    @Body() updateAddressDto: UpdateAddressDto,
    @Param("id") addressId: string,
  ) {
    const { _id: userId } = user;
    const updataedAddress = await this._addressService.updateAddress(
      String(userId),
      addressId,
      updateAddressDto,
    );
    const resObj = this._util.successResponse<Address>(
      SuccessResponse.OK,
      "Address updated successfully!",
      updataedAddress,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }
}
