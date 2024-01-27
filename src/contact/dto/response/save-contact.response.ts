import { ApiProperty } from "@nestjs/swagger";
import { Contact } from "src/contact/entity/contact.entity";
import { CommonResponse } from "src/shared/shared/dto/common-response";

export class SaveContactResponse extends CommonResponse {
  @ApiProperty({})
  public data: Contact;
}
