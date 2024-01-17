import { Types } from "mongoose";
export class Email {
  _id: Types.ObjectId;
  recipient: string;
  subject: string;
  message: string;

  constructor(
    _id: Types.ObjectId,
    recipient: string,
    subject: string,
    message: string,
  ) {
    this._id = _id;
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
  }
}
