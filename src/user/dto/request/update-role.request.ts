import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { UserRoles } from "src/shared/shared/enums/userRoles.enum";

export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRoles, {
    message: "Role type must be one of these " + Object.keys(UserRoles),
  })
  @ApiProperty({ enum: Object.keys(UserRoles) })
  role: UserRoles;
}
