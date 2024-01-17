import { Controller, Post, Body, Get, Delete } from "@nestjs/common";
import { XxService } from "./xx.service";
import { CreateXxReq as CreateXxDto } from "./dto/create-xx.dto";
import { ApiTags } from "@nestjs/swagger";
import { Xx } from "./entities/xx.entity";
@ApiTags("Module test")
@Controller("test")
export class XxController {
  [x: string]: any;
  constructor(private readonly xxService: XxService) {}
  @Post("/create")
  async create(@Body() createXxDto: CreateXxDto): Promise<Xx> {
    return await this.xxService.create(createXxDto);
  }
  @Get("/test")
  async test(): Promise<any> {
    return this.xxService.test();
  }
  @Delete("/delete")
  async delete(): Promise<any> {
    return this.xxService.delete();
  }
  @Get("/get")
  async find(): Promise<any> {
    return this.xxService.findAll();
  }
}
