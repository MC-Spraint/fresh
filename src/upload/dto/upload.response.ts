import { ApiProperty } from "@nestjs/swagger";

export class UploadResponse {
  @ApiProperty()
  file_id: string;
  @ApiProperty()
  file_path: string;
  @ApiProperty()
  file_url: string;
}
