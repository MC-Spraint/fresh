import { ContactRepository } from "./contact.repository";
import { Injectable } from "@nestjs/common";
import { SaveContactRequest } from "./dto/request/save-contact.request";
import { Contact } from "./entity/contact.entity";

@Injectable()
export class ContactService {
  constructor(private readonly _contactRepo: ContactRepository) {}
  async saveContact(contact: SaveContactRequest): Promise<Contact> {
    const savedContact = await this._contactRepo.createAndSave(contact);
    return savedContact;
  }

  async getAllContacts(): Promise<Contact[]> {
    const savedContact = await this._contactRepo.find();
    return savedContact;
  }

  async getContactById(id: string): Promise<Contact> {
    const savedContact = await this._contactRepo.getContactById(id);
    return savedContact;
  }
}
