import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";

export class LocationDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({})
    type: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({})
    // eslint-disable-next-line prettier/prettier
    @Type(()=> Array<number>)
    coordinates: number[];
}