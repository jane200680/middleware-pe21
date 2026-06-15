import { jest, describe, it, expect } from "@jest/globals";
import { requireApiKey } from "./auth.js";

describe("Middleware requireApiKey", () => {
  it("debe responder 401 si no existe x-api-key", () => {
    const req: any = {
      headers: {}
    };

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });

    const res: any = { status };
    const next = jest.fn();

    requireApiKey(req, res, next);

    expect(status).toHaveBeenCalledTimes(1);
    expect(status.mock.calls[0][0]).toBe(401);
    expect(json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("debe responder 401 si la API key es incorrecta", () => {
    const req: any = {
      headers: {
        "x-api-key": "incorrecta"
      }
    };

    const json = jest.fn();
    const status = jest.fn().mockReturnValue({ json });

    const res: any = { status };
    const next = jest.fn();

    requireApiKey(req, res, next);

    expect(status).toHaveBeenCalledTimes(1);
    expect(status.mock.calls[0][0]).toBe(401);
    expect(json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("debe llamar a next() si la API key es correcta", () => {
    const req: any = {
      headers: {
        "x-api-key": "secreto-demo"
      }
    };

    const res: any = {};
    const next = jest.fn();

    requireApiKey(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});