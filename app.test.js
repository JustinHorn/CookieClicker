//try to learn one think at a time!
// try to mod ths project to use import and from instead of require!

import app from "./app";
import { expect } from "chai";

import request from "supertest";

// do not send id tomorrow

describe("App", () => {
  describe("CRUD", () => {
    it("get ", () => {
      return request(app)
        .post("/api/get")
        .send({ name: "test", password: "1234" })
        .then((response) => {
          expect(response.body.user.clicks).to.be.an("number");
        });
    });

    it("get wrong pw", () => {
      return request(app)
        .post("/api/get")
        .send({ name: "test", password: "4321" })
        .then((response) => {
          expect(response.status).to.equal(400);
        });
    });

    it("create", async () => {
      await request(app)
        .post("/api/get")
        .send({ name: "test_create", password: "1234" })
        .then((response) => {
          expect(response.status).to.equal(400);
        });

      await request(app)
        .post("/api/create")
        .send({ name: "test_create", password: "1234", clicks: 20 })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        });

      await request(app)
        .post("/api/get")
        .send({ name: "test_create", password: "1234" })
        .then((response) => {
          expect(response.body.user.clicks).to.equal(20);
        });
    });

    it("update name", async () => {
      await request(app)
        .post("/api/get")
        .send({ name: "test_create", password: "1234" })
        .then((response) => {
          expect(response.body.user.clicks).to.equal(20);
        });

      await request(app)
        .post("/api/update")
        .send({ name: "test_create", password: "1234", clicks: 25 })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        });

      await request(app)
        .post("/api/get")
        .send({ name: "test_create", password: "1234" })
        .then((response) => {
          expect(response.body.user.clicks).to.equal(25);
        });
    });

    it("update pw error", async () => {
      await request(app)
        .post("/api/update")
        .send({ name: "test_create", password: "4321", clicks: 25 })
        .then((response) => {
          expect(response.status).to.equal(400);
        });
    });

    it("update name that doesn't exist", async () => {
      await request(app)
        .post("/api/update")
        .send({ name: "does_not_exist", password: "1234", clicks: 25 })
        .then((response) => {
          expect(response.status).to.equal(400);
        });
    });

    it("delete wrong pw", async () => {
      await request(app)
        .post("/api/get")
        .send({ name: "test_create", password: "4321" })
        .then((response) => {
          expect(response.status).to.equal(400);
        });
      await request(app)
        .post("/api/get")
        .send({ name: "test_create", password: "1234" })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        });
    });
    it("delete name", async () => {
      await request(app)
        .post("/api/get")
        .send({ name: "test_create", password: "1234" })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        });

      await request(app)
        .get("/api/delete")
        .send({ name: "test_create", password: "1234" })
        .then((response) => {
          expect(response.body.success).to.equal(true);
        })
        .catch((err) => console.log(err));

      await request(app)
        .post("/api/get")
        .send({ name: "test_create", password: "1234" })
        .then((response) => {
          expect(response.status).to.equal(400);
        });
    });
  });
});

// learn about proper request handling!
