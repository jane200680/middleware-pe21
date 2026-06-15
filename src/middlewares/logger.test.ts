import { jest, describe, it, expect } from "@jest/globals";
import { requestLogger } from "./logger.js";

describe("Middleware logger", () => {
  it("debe llamar a next()", () => {
    const req: any = {
      method: "GET",
      path: "/api/users"
    };

    const res: any = {
      on: jest.fn()
    };

    const next = jest.fn();

    requestLogger(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("debe registrar el método y la ruta", () => {
    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    let finishCallback: Function = () => {};

    const req: any = {
      method: "POST",
      path: "/api/products"
    };

    const res: any = {
      statusCode: 200,
      on: jest.fn((event: string, callback: Function) => {
        if (event === "finish") {
        finishCallback = callback;
  }
})
    };

    const next = jest.fn();

    requestLogger(req, res, next);

    finishCallback();

    expect(consoleSpy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});