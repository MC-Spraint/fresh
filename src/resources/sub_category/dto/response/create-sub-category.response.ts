import { ApiProperty } from "@nestjs/swagger";
import { CommonResponse } from "src/shared/shared/dto/common-response";
import { SubCategory } from "../../entities/sub-category.entity";

export class CategoryResponse extends CommonResponse {
  @ApiProperty({})
  public data: SubCategory;
}
