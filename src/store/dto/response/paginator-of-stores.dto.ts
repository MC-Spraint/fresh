import { ApiProperty } from "@nestjs/swagger";
import { IPaginator } from "src/shared/utils/interfaces/IPaginator";
import { Store } from "../../entities/store.entity";

export class PaginatorOfStores implements IPaginator {
  @ApiProperty({})
  page: number;
  @ApiProperty({})
  per_page: number;
  @ApiProperty({})
  pre_page: number | null;
  @ApiProperty({})
  next_page: number | null;
  @ApiProperty({})
  total: number;
  @ApiProperty({})
  total_pages: number;
  @ApiProperty({
    description: "Array of Stores.",
    isArray: true,
    type: Store,
  })
  public data: Store[];
}
