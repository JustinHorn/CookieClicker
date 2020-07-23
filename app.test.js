//try to learn one think at a time!
// try to mod ths project to use import and from instead of require!

import app from "./app";
import { expect } from "chai";

import request from "supertest";

describe("App", () => {
  it("Hello World", async () => {
    const response = await request(app).get("/");
    expect(response.text).to.equal("Hello World");
  });
  it("Hello World", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.text).to.equal("Hello World");
      });
  });
});
