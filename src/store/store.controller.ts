import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { UtilService } from "src/shared/utils/util.service";
import { StoreService } from "./store.service";
import { Roles } from "src/shared/auth/decorators/roles.decorator";
import { RolesGuard } from "src/shared/auth/guards/roles.guard";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Store } from "./entities/store.entity";
import { CreateStoreRequest } from "./dto/request/create-store.request";
import { StoreParamsDto } from "./dto/request/store-params.request";
import { AuthGuard } from "src/shared/auth/guards/auth.guard";
import { StoresResponse } from "./dto/response/stores.response";
import { StoreResponse } from "./dto/response/store.response";
import { CommonErrorResponseDto } from "src/shared/utils/dtos/common-error-response.dto";
import { GetUser } from "src/shared/auth/decorators/get-user.decorator";
import { LoggedInUser } from "src/shared/auth/dto/loggedIn-user.dto";
@ApiTags("Module store")
@Controller("store")
export class StoreController {
  constructor(
    private readonly _util: UtilService,
    private readonly _storeService: StoreService,
  ) {}

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Create Store" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Store has been created successfully",
    type: StoreResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/create")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async createStore(
    @Res() res: Response,
    @Body() body: CreateStoreRequest,
    @GetUser() user: LoggedInUser,
  ): Promise<Response<StoreResponse>> {
    const createdStore: Store = await this._storeService.createStore(
      user._id,
      body,
    );
    const resObj = this._util.successResponseCreated(
      "Store has been created successfully",
      createdStore,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Find Store By 'id'" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Store result",
    type: StoreResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Get("/get/one/:id")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async getStoreById(
    @Res() res: Response,
    @Param("id") id: string,
  ): Promise<Response<StoreResponse>> {
    const store = await this._storeService.findStoreById(id);
    const resObj = this._util.successResponseOk("Store result", store);
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "List Of Nearby Stores" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "List of stores",
    type: StoresResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Get("/get")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async getStores(
    @Res() res: Response,
    @Query() query: StoreParamsDto,
  ): Promise<Response<StoresResponse>> {
    const { lat, lon, dist, page, limit, name } = query;
    const { data, ...meta } =
      await this._storeService.getStoresWithinCertainMeters(
        [Number(lat), Number(lon)],
        Number(dist),
        name,
        Number(page ?? "1"),
        Number(limit ?? "10"),
      );
    const resObj = this._util.successResponseOk("List of nearby stores", data, {
      ...meta,
    });
    return res.status(HttpStatus.OK).json(resObj);
  }
  // @Post("add/working-hours")
  // async addWorkingHours(
  //   @Res() res: Response,
  //   @Body() workingHours: StoreWorkingHours,
  //   @GetUser() user: User
  // ){
  //   const { _id } = user;
  //   const updatedStore = await this._storeService.updateWorkingHours(_id, workingHours);
  // }
  //TODO: add API to get average rating
  //TODO: add API to update working hours
  //TODO: add API to update managers
  //TODO: add API to update store location & address
  //TODO: add API to update image
  //TODO: add API to update title, description, contact_no1 n 2
  //TODO: add API to find top rated stores
  //TODO: add API to find best selling stores
  // @Get("/get/all")
  // async getAllStores(): Promise<Response<StoresResponse>> {
  //   const stores: Store[] = await this._storeService.finAll();
  //   if (stores !== null && stores !== undefined) {
  //     return this._util.successResponseOk("List of all stores", stores);
  //   } else throw new NotFoundException("Not found");
  // }
}
