import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Tokens } from "src/shared/auth/dto/tokens.dto";
import { JwtPayloadDto } from "src/shared/auth/dto/jwt-payload.dto";
export class Onboardings extends JwtPayloadDto {
  @IsNotEmpty()
  @Type(() => Tokens)
  @ApiProperty({})
  tokens: Tokens;
}
