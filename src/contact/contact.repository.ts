import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MongooseRepository } from "src/shared/database/mongoose.repository";
import { ContactModel } from "./contact.model";
import { Contact } from "./entity/contact.entity";

@Injectable()
export class ContactRepository extends MongooseRepository<
  ContactModel,
  Contact
> {
  constructor(
    @InjectModel(ContactModel.name)
    private contactModel: Model<ContactModel>,
  ) {
    super(contactModel);
  }

  public async getContactById(contact_id: string): Promise<Contact | null> {
    const contact: Contact = await this.contactModel.findOne({
      _id: contact_id,
    });
    return contact;
  }

  public async updateContactById(
    contact_id: string,
    data: unknown,
  ): Promise<Contact> {
    const contact: Contact = await this.contactModel.findOneAndUpdate(
      { _id: contact_id },
      data,
      { new: true },
    );
    return contact;
  }
}
