import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { StoreType } from "./enums/store-type.enum";
import { CommonImage } from "../common-image.model";
import { StoreAddressModel } from "./store-address.model";
import { StoreLocationModel } from "./store-location.model";
import { StoreWorkingHoursModel } from "./store-working-hours.model";
import { PaymentType } from "./enums/payment-type.enum";
import { ShippingType } from "./enums/shipping-type.enum";
import { DeliveryType } from "./enums/delivery-type.enum";
import { TaxType } from "./enums/tax-type.enum";

@Schema({ collection: "storeCollection", timestamps: true })
export class StoreModel extends Document {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: CommonImage })
  image: CommonImage;

  @Prop({ required: true, type: String, unique: true })
  store_code: string;

  @Prop({ required: true, type: String })
  contact_no1: string;

  @Prop({ required: true, type: String })
  contact_no2: string;

  @Prop({ required: true, type: String, unique: true })
  contact_email: string;

  @Prop({ required: true })
  currency_code: string;

  @Prop({ required: true })
  currency_symbol: string;

  @Prop({ required: true, type: StoreAddressModel })
  store_address: StoreAddressModel;

  @Prop({ required: true, type: StoreLocationModel })
  store_location: StoreLocationModel;

  @Prop({ required: true /*define type*/ })
  working_hours: StoreWorkingHoursModel[];

  @Prop({ required: true, enum: Object.values(StoreType) })
  store_type: StoreType;

  @Prop({ required: true, enum: Object.values(PaymentType) })
  payment_type: PaymentType;

  @Prop({ required: true, enum: Object.values(ShippingType) })
  shipping_type: ShippingType;

  @Prop({ required: true, enum: Object.values(DeliveryType) })
  delivery_type: DeliveryType;

  @Prop({ required: true, enum: Object.values(TaxType) })
  tax_type: TaxType;

  @Prop({ required: true })
  tax_name: string;

  @Prop({ required: true, type: Number })
  tax_amount: number; //to this

  @Prop({ required: true, type: Number })
  mininum_order_amount: number;

  @Prop({ type: Number })
  delivery_charge_per_km: number;

  @Prop({ type: Number })
  delivery_coverage_in_km: number;

  @Prop({ type: Number })
  fix_delivery_charge: number;

  @Prop({ type: Number })
  mininum_order_amount_for_free_delivery: number;

  @Prop({ type: Number, default: 0 })
  total_ratings: number;

  @Prop({ type: Number, default: 0 })
  total_number_of_people_rated: number;

  @Prop({ type: Number, default: 30 })
  business_commissions: number;

  @Prop({ type: Boolean, default: true })
  status: boolean;

  // Relations
  @Prop({ type: [SchemaTypes.ObjectId], ref: "UserModel" })
  managers: Types.ObjectId[];

  @Prop({
    required: true,
    unique: true,
    type: SchemaTypes.ObjectId,
    ref: "UserModel",
  })
  vendor_id: Types.ObjectId;
}
export const StoreSchema = SchemaFactory.createForClass(StoreModel).index({
  store_location: "2dsphere",
});
