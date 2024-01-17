import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class ImageDto {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  image_id: string;

  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  image_path: string;
}
