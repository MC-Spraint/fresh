import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
export class SaveAddressDto extends CreateAddressDto {
  // Relations
  @IsNotEmpty()
  @ApiProperty({})
  user_id: string;
}
