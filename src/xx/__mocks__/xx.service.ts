import { xxStub } from "../test/stubs/xx.stub";

export const XxService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([xxStub]),
  create: jest.fn().mockResolvedValue([xxStub]),
  delete: jest.fn().mockResolvedValue([xxStub]),
  test: jest.fn().mockResolvedValue([xxStub]),
});
