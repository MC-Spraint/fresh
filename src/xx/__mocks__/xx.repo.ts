import { xxStub } from "../test/stubs/xx.stub";

export const XxRepo = jest.fn().mockReturnValue({
  createAndSave: jest.fn().mockResolvedValue([xxStub]),
  test: jest.fn().mockResolvedValue([xxStub]),
});
