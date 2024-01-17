/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from "@nestjs/testing";
import { XxController } from "../xx.controller";
import { XxService } from "../xx.service";
import { xxStub } from "./stubs/xx.stub";
import { Enm } from "../xx.model";

jest.mock("../xx.service");

describe("XxController", () => {
  let xxController: XxController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [XxController],
      providers: [XxService],
    }).compile();
    xxController = moduleRef.get<XxController>(XxController);
    jest.clearAllMocks();
  });

  it("", async () => {
    const result = await xxController.test();
    expect(result).toEqual([xxStub]);
  });
  it("", async () => {
    const xxArgs = {
      name: "Snahashis Das",
      age: 25,
      enm: Enm.FIELD_1,
      status: [
        { order_id: "0011", order_status: "default" },
        { order_id: "0012", order_status: "default" },
      ],
      field1: "whatever",
      field2: "however",
    };
    const result = await xxController.create(xxArgs);
    expect(result).toEqual([xxArgs]);
  });
});
