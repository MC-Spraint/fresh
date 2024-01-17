import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { Category } from "../../entities/category.entity";

export class CategoryResponse extends CommonResponse {
  @ApiProperty({})
  public data: Category;
}
