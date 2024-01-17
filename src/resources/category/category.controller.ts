//TODO: add API to get list of all categories(Dropdown list of categories)
//TODO: add API to get category details by category_id
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
import { CreateCategoryRequest } from "./dto/request/create-category.request";
import { UtilService } from "src/shared/utils/util.service";
import { CategoryService } from "./category.service";
import { CategoryResponse } from "./dto/response/category.response";
import { LoggedInUser } from "src/shared/auth/dto/loggedIn-user.dto";
import { Category } from "./entities/category.entity";
import { AuthGuard } from "src/shared/auth/guards/auth.guard";
import { CommonErrorResponseDto } from "src/shared/utils/dtos/common-error-response.dto";
@ApiTags("Module category")
@Controller("product/category")
export class CategoryController {
  constructor(
    private readonly _util: UtilService,
    private readonly _categoryService: CategoryService,
  ) {}

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Create Category" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Category has been created successfully",
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
  async createCategory(
    @GetUser() user: LoggedInUser,
    @Res() res: Response,
    @Body() body: CreateCategoryRequest,
  ): Promise<Response<CategoryResponse>> {
    const createdCategory: Category =
      await this._categoryService.createCategory(user.store_id, body);
    const resObj = this._util.successResponseCreated(
      "Category has been created successfully",
      createdCategory,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }
}
