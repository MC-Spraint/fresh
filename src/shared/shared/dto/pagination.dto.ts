import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto<T> {
  @ApiProperty()
  queries: string;
  @ApiProperty()
  cur_page: number;
  @ApiProperty()
  total_pages: number;
  @ApiProperty()
  total_entity: number;
  @ApiProperty()
  entities: T[] | null;
}
