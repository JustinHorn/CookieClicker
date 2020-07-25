//try to learn one think at a time!
// try to mod ths project to use import and from instead of require!

import app from "./app";
import { expect } from "chai";

import request from "supertest";

// do not send id tomorrow

describe("App", () => {
  it("Hello World", async () => {
    const response = await request(app).get("/");
    expect(response.text).to.equal("Hello World");
  });

  describe("CRUD", () => {
    it("get ", () => {
      return request(app)
        .post("/api/get")
        .send({ name: "test" })
        .then((response) => {
          expect(response.body.user.clicks).to.be.an("number");
        });
    });

    it("create", async () => {
      await request(app)
        .post("/api/create")
        .send({ name: "test_create", clicks: 20 })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        });

      await request(app)
        .post("/api/get")
        .send({ name: "test_create" })
        .then((response) => {
          expect(response.body.user.clicks).to.equal(20);
        });
    });

    it("update name", async () => {
      await request(app)
        .post("/api/get")
        .send({ name: "test_create" })
        .then((response) => {
          expect(response.body.user.clicks).to.equal(20);
        });

      await request(app)
        .post("/api/update")
        .send({ name: "test_create", clicks: 25 })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        });

      await request(app)
        .post("/api/get")
        .send({ name: "test_create" })
        .then((response) => {
          expect(response.body.user.clicks).to.equal(25);
        });
    });

    it("delete name", async () => {
      await request(app)
        .post("/api/get")
        .send({ name: "test_create" })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        });

      await request(app)
        .get("/api/delete")
        .send({ name: "test_create" })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        })
        .catch((err) => console.log(err));

      await request(app)
        .post("/api/get")
        .send({ name: "test_create" })
        .then((response) => {
          expect(response.body.success).to.equal(false);
        });
    });
  });
});

// learn about proper request handling!
