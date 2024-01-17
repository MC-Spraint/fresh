/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test } from "@nestjs/testing";
import { XxService } from "../xx.service";
import { XxRepo } from "../xx.repo";
import { Enm } from "../xx.model";

jest.mock("../xx.repo");

describe("XxService", () => {
  let xxService: XxService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [XxService, XxRepo],
    }).compile();

    xxService = moduleRef.get<XxService>(XxService);
    jest.clearAllMocks();
  });

  it("Test", async () => {
    const result = await xxService.test();
    expect(200).toEqual(200);
  });
  it("Create", async () => {
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
    const result = await xxService.create(xxArgs);
    expect(result).toEqual([xxArgs]);
  });
});
