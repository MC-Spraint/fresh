import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ContactController } from "./contact.controller";
import { ContactModel, contactSchema } from "./contact.model";
import { ContactService } from "./contact.service";
import { ContactRepository } from "./contact.repository";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactModel.name, schema: contactSchema },
    ]),
  ],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository],
  exports: [],
})
export class ContactModule {}
