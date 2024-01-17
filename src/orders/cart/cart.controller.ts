import {
  Controller,
  HttpStatus,
  Param,
  Patch,
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
import { CartService } from "./cart.service";
import { Cart } from "./entities/cart.entity";
import { Response } from "express";
import { AuthGuard } from "src/shared/auth/guards/auth.guard";
import { RemoveCartItemResponse } from "./dto/response/remove-cart-item.response";
import { CartItemParams } from "./dto/request/cart-item.params";
import { CartItemResponse } from "./dto/response/cart-item.response";

@ApiTags("Module cart")
@Controller("cart")
export class CartController {
  constructor(
    private readonly _cartService: CartService,
    private readonly _util: UtilService,
  ) {}
  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Add To Cart" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Product has been added successfully to the cart",
    type: CartItemResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      "You Are Trying To Add A Product In Your Cart From " +
      "A Different Store Which Will Be Delivered By " +
      "A Different Delivery Partner, Plz Empty The Cart Or Place Order",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid Input",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Product Not Found",
    type: CommonErrorResponseDto,
  })
  @Post("/add-to-cart/:productId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async addToCart(
    @GetUser() { _id }: LoggedInUser,
    @Res() res: Response,
    @Param() { productId: product_id }: CartItemParams,
  ): Promise<Response<CartItemResponse>> {
    const data: Partial<Cart> | null = await this._cartService.requestAddToCart(
      _id,
      product_id,
    );
    const resObj = this._util.successResponseCreated(
      "Product has been added successfully to the cart",
      data,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Remove Cart Item" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Product has been removed successfully from the cart",
    type: RemoveCartItemResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid Input",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Product Not Found",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Cart Not Found",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Item Not Found In Cart",
    type: CommonErrorResponseDto,
  })
  @Post("/remove-cart-item/:productId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async removeProductFromCart(
    @GetUser() { _id }: LoggedInUser,
    @Res() res: Response,
    @Param() { productId: product_id }: CartItemParams,
  ): Promise<Response<RemoveCartItemResponse>> {
    const data: Partial<Cart> = await this._cartService.requestRemoveCartItem(
      _id,
      product_id,
    );
    const resObj = this._util.successResponseCreated(
      "Product has been removed successfully from the cart",
      data,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Increase Cart Item" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Total Quantity Increased To (number)",
    type: CartItemResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid Input",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Product Not Found",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Cart Not Found",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Item Not Found In Cart",
    type: CommonErrorResponseDto,
  })
  @Patch("/increase-cart-item/:productId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async increaseQuantity(
    @GetUser() { _id }: LoggedInUser,
    @Res() res: Response,
    @Param() { productId: product_id }: CartItemParams,
  ): Promise<Response<CartItemResponse>> {
    const data: Partial<Cart> = await this._cartService.requestIncreaseCartItem(
      _id,
      product_id,
    );
    const resObj = this._util.successResponseOk(
      `Total Quantity Increased to ${data.total_quantity}`,
      data,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }

  @ApiBearerAuth("Authorization")
  @ApiOperation({ description: "Decrease Cart Item" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Total Quantity Decreased To (number)",
    type: CartItemResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Invalid Input",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Item Quantity Must Be Greater Than 1",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Product Not Found",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Cart Not Found",
    type: CommonErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Item Not Found In Cart",
    type: CommonErrorResponseDto,
  })
  @Patch("/decrease-cart-item/:productId")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPER_ADMIN)
  async decreaseQuantity(
    @GetUser() { _id }: LoggedInUser,
    @Res() res: Response,
    @Param() { productId: product_id }: CartItemParams,
  ): Promise<Response<CartItemResponse>> {
    const data: Partial<Cart> = await this._cartService.requestDecreaseCartItem(
      _id,
      product_id,
    );
    const resObj = this._util.successResponseOk(
      `Total Quantity Decreased to ${data.total_quantity}`,
      data,
    );
    return res.status(HttpStatus.OK).json(resObj);
  }
}
