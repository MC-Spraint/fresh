import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { UtilService } from "src/shared/utils/util.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CommonErrorResponseDto } from "src/shared/utils/dtos/common-error-response.dto";
import { Public } from "src/shared/auth/decorators/public.decorator";
import { ContactService } from "./contact.service";
import { SaveContactRequest } from "./dto/request/save-contact.request";
import { Contact } from "./entity/contact.entity";
import { SaveContactResponse } from "./dto/response/save-contact.response";

@ApiTags("Module Contact")
@Controller("contact")
export class ContactController {
  constructor(
    private readonly _util: UtilService,
    private readonly _contactService: ContactService,
  ) {}

  @ApiOperation({ description: "Save Contact" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Contact has been saved successfully",
    type: SaveContactResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Bad request message",
    type: CommonErrorResponseDto,
  })
  @Post("/save")
  @Public()
  async saveContact(
    @Body() body: SaveContactRequest,
    @Res() res: Response,
  ): Promise<Response<Contact>> {
    const savedContact: Contact = await this._contactService.saveContact(body);
    const resObj = this._util.successResponseCreated(
      "Contact has been saved successfully",
      savedContact,
    );
    return res.status(HttpStatus.CREATED).json(resObj);
  }
}
