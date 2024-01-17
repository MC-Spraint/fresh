import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class StoreAddressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  country: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({})
  postal_code: string;
}
