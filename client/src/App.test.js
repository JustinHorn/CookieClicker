import React from "react";
import App from "./App";
import { mount } from "enzyme";

import axios from "axios";

jest.mock("axios");

const USER_NAME = "test_user";
const PASSWORD = "1234";
const CLICKS = 20;

const DO_NOT_REGISTER = "DO_NOT_REGISTER";

const standardUser = {
  data: {
    user: { name: USER_NAME, password: PASSWORD, clicks: CLICKS },
    success: true,
  },
};
axios.post.mockImplementation((api) => {
  if (api === "/api/scoreboard") {
    return Promise.resolve({
      data: {
        scores: [
          { name: "Justin", clicks: 10 },
          { name: "test", clicks: 15 },
          { name: "Justin", clicks: 10 },
          { name: "test", clicks: 15 },
          { name: "Justin", clicks: 10 },
          { name: "test", clicks: 15 },
        ],
      },
    });
  }

  return Promise.resolve({ ...standardUser });
});

describe("App", () => {
  describe("start", () => {
    const app = mount(<App />);

    test("Cookie does not exists", () => {
      expect(app.find("Cookie").exists()).toBe(true);
      expect(app.find("Cookie").find(".username").text()).toBe("Guest");
    });
    test("inputs exists", () => {
      const login = app.find(".login");

      const register = app.find(".register");

      expect(login.find(".name").exists()).toBe(true);
      expect(login.find(".password").exists()).toBe(true);
      expect(login.find(".button").exists()).toBe(true);

      expect(register.find(".name").exists()).toBe(true);
      expect(register.find(".password").exists()).toBe(true);
      expect(register.find(".button").exists()).toBe(true);
    });

    test("table exists", (done) => {
      setTimeout(() => {
        app.update();
        setTimeout(() => {
          const table = app.find(".table");
          expect(table.find("td").at(6).exists()).toBe(true);
          done();
        }, 0);
      }, 100);
    });
  });

  describe("login", () => {
    const app = mount(<App />);

    beforeAll(() => {
      const login = app.find(".login");

      login.find(".name").instance().value = USER_NAME;
      login.find(".name").simulate("change");
      login.find(".password").instance().value = PASSWORD;
      login.find(".password").simulate("change");
      login.find(".button").simulate("click");
    });

    test("cookie exists", () => {
      app.update();
      expect(app.find("Cookie").find(".username").text()).toBe(USER_NAME);
    });

    test("clicks loaded", () => {
      expect(app.find("Cookie").find(".clicks").text()).toBe("20");
      axios.post.mockClear();
    });

    afterAll(() => {
      app.detach();
    });
  });

  describe("register", () => {
    const app = mount(<App />);

    beforeAll(() => {
      const register = app.find(".register");

      register.find(".name").instance().value = DO_NOT_REGISTER;
      register.find(".name").simulate("change");
      register.find(".password").instance().value = PASSWORD;
      register.find(".password").simulate("change");
      register.find(".button").simulate("click");
    });

    test("cookie exists", () => {
      app.update();

      expect(app.find("Cookie").find(".username").text()).toBe(DO_NOT_REGISTER);
    });
    afterAll(() => {
      app.detach();
    });
  });

  describe("guest clicks before register", () => {
    const app = mount(<App />);

    const amountOfClicks = 5;

    beforeAll(() => {
      const register = app.find(".register");

      Array(amountOfClicks)
        .fill(null)
        .forEach((v) => {
          app.find("#test_cookie").simulate("click");
        });
      register.find(".name").instance().value = DO_NOT_REGISTER;
      register.find(".name").simulate("change");
      register.find(".password").instance().value = PASSWORD;
      register.find(".password").simulate("change");
      register.find(".button").simulate("click");
      axios.post.mockClear();
    });

    test("cookie exists", () => {
      app.update();

      expect(app.find("Cookie").find(".username").text()).toBe(DO_NOT_REGISTER);
      expect(app.find("Cookie").find(".clicks").text()).toBe(
        amountOfClicks + ""
      );
      expect(axios.post.mock.calls[0]).toEqual([
        "/api/update",
        { name: DO_NOT_REGISTER, password: PASSWORD, clicks: amountOfClicks },
      ]);
    });
    afterAll(() => {
      app.detach();
    });
  });

  describe("non-guest login before register", () => {
    const app = mount(<App />);

    beforeAll(() => {
      const login = app.find(".login");

      login.find(".name").instance().value = USER_NAME;
      login.find(".name").simulate("change");
      login.find(".password").instance().value = PASSWORD;
      login.find(".password").simulate("change");
      login.find(".button").simulate("click");

      const register = app.find(".register");

      register.find(".name").instance().value = DO_NOT_REGISTER;
      register.find(".name").simulate("change");
      register.find(".password").instance().value = PASSWORD;
      register.find(".password").simulate("change");
      register.find(".button").simulate("click");
      axios.post.mockClear();
    });

    test("cookie exists", () => {
      app.update();

      expect(app.find("Cookie").find(".username").text()).toBe(DO_NOT_REGISTER);
      expect(app.find("Cookie").find(".clicks").text()).toBe(0 + "");
      expect(axios.post.mock.calls.length).toBe(0);
    });
    afterAll(() => {
      app.detach();
    });
  });
});
