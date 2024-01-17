import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class UpdateName {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ type: String, description: "newName" })
  name: string;
}
