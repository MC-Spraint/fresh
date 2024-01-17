import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetUser } from "src/shared/auth/decorators/get-user.decorator";
import { Roles } from "src/shared/auth/decorators/roles.decorator";
import { LoggedInUser } from "src/shared/auth/dto/loggedIn-user.dto";
import { RolesGuard } from "src/shared/auth/guards/roles.guard";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";
import { CommonErrorResponseDto } from "src/shared/utils/dtos/common-error-response.dto";
import { UtilService } from "src/shared/utils/util.service";
import { DealService } from "./deal.service";
import { AddDealRequest } from "./dto/request/add-deal.request";
import { AddDealResponse } from "./dto/response/add-deal.response";
import { Deal } from "./entities/deal.entity";
import { Response } from "express";
import { AuthGuard } from "src/shared/auth/guards/auth.guard";

@ApiTags("Module deal")
@Controller("deal")
export class DealController {
  constructor(
    private readonly _util: UtilService,
    private readonly _dealService: DealService,
  ) {}

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Add Deal" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Deal has been created successfully",
    type: AddDealResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/add")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async createProduct(
    @GetUser() user: LoggedInUser,
    @Res() res: Response,
    @Body() body: AddDealRequest,
  ): Promise<Response<AddDealResponse>> {
    const addDeal: Partial<Deal> = await this._dealService.addDeal(
      user.store_id,
      body,
    );
    const resObj = this._util.successResponseCreated(
      "Deal has been added successfully",
      addDeal,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }
}
