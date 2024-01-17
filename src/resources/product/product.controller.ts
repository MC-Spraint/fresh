//TODO: add API to create product(Admin only)
//TODO: add API to update Product(not rating stuff)(Admin only)
//TODO: top rated product, best selling product
//TODO: product details with reviews and isfavourite
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
import { ProductService } from "./product.service";
import { CreateProductRequest } from "./dto/request/create-product.request";
import { Product } from "./entities/product.entity";
import { AuthGuard } from "src/shared/auth/guards/auth.guard";
import { ProductResponse } from "./dto/response/product.response";
import { CommonErrorResponseDto } from "src/shared/utils/dtos/common-error-response.dto";

@ApiTags("Module product")
@Controller("product")
export class ProductController {
  constructor(
    private readonly _util: UtilService,
    private readonly _productService: ProductService,
  ) { }

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Create Product" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Product has been created successfully",
    type: ProductResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/create")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async createProduct(
    @GetUser() user: LoggedInUser,
    @Res() res: Response,
    @Body() body: CreateProductRequest,
  ): Promise<Response<ProductResponse>> {
    const createdProduct: Product = await this._productService.createProduct(
      user.store_id,
      body,
    );
    const resObj = this._util.successResponseCreated(
      "Product has been added successfully",
      createdProduct,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }
}
