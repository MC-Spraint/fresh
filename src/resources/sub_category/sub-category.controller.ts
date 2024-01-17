import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { GetUser } from "src/shared/auth/decorators/get-user.decorator";
import { Roles } from "src/shared/auth/decorators/roles.decorator";
import { RolesGuard } from "src/shared/auth/guards/roles.guard";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UtilService } from "src/shared/utils/util.service";
import { LoggedInUser } from "src/shared/auth/dto/loggedIn-user.dto";
import { SubCategoryService } from "./sub-category.service";
import { SubCategory } from "./entities/sub-category.entity";
import { CreateSubCategoryDto } from "./dto/request/create-sub-category.dto";
import { CategoryResponse } from "./dto/response/create-sub-category.response";
import { AuthGuard } from "src/shared/auth/guards/auth.guard";
import { CommonErrorResponseDto } from "src/shared/utils/dtos/common-error-response.dto";
@ApiTags("Module sub-category")
@Controller("product/sub-category")
export class SubCategoryController {
  constructor(
    private readonly _util: UtilService,
    private readonly _subCategoryService: SubCategoryService,
  ) {}

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Add SubCategory" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Sub-Category has been created successfully",
    type: CategoryResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/create")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async createSubCategory(
    @GetUser() user: LoggedInUser,
    @Res() res: Response,
    @Body() body: CreateSubCategoryDto,
  ): Promise<Response<CategoryResponse>> {
    const createdSubCategory: SubCategory =
      await this._subCategoryService.createSubCategory(user.store_id, body);
    const resObj = this._util.successResponseCreated(
      "Sub-Category has been created successfully",
      createdSubCategory,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }
  //TODO: add API to get list of sub-categories by category_id
}
