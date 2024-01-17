import {
  IsNotEmpty,
  IsString,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
} from "class-validator";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

function IsXxValid(
  validationOptions?: ValidationOptions,
): (object: XxModel, propertyName: string) => void {
  return function (object: XxModel, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: (): ValidatorConstraintInterface => {
        return {
          validate: (object: XxModel): boolean => {
            switch (object.enm) {
              case Enm.FIELD_1:
                return object.field1 !== undefined;
              case Enm.FIELD_2:
                return object.field2 !== undefined;
              default:
                return false;
            }
          },
        };
      },
    });
  };
}

export enum Enm {
  FIELD_1 = "field1",
  FIELD_2 = "field2",
}


@Schema({ _id: false, timestamps: true })
export class OrderStatusHistoryModel  {
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  order_id: string;

  @Prop({ default: "Default" })
  @IsString()
  order_status: string;
}
@Schema({ collection: "XxCollection", timestamps: true })
export class XxModel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  enm: Enm;

  @Prop({ type: Array<OrderStatusHistoryModel>, timestamps: true })
  status: OrderStatusHistoryModel[];

  @IsXxValid()
  @Prop({})
  field1?: string;

  @IsXxValid()
  @Prop({})
  field2?: string;

  async test(): Promise<number> {
    this.age++;
    return this.age;
  }
}

export const XxSchema = SchemaFactory.createForClass(XxModel);
