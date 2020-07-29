import React from "react";
import App from "./App";
import { mount } from "enzyme";

import axios from "axios";

jest.mock("axios");

const USER_NAME = "test_user";
const PASSWORD = "1234";

const data = {
  data: {
    user: { name: USER_NAME, password: PASSWORD, clicks: 20 },
    success: true,
  },
};
axios.post.mockImplementationOnce(() => Promise.resolve(data));

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
      expect(app.find("Cookie").find(".click").text()).toBe("20");
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

      register.find(".name").instance().value = "DO_NOT_REGISTER";
      register.find(".name").simulate("change");
      register.find(".password").instance().value = PASSWORD;
      register.find(".password").simulate("change");
      register.find(".button").simulate("click");
    });

    test("cookie exists", () => {
      app.update();

      expect(app.find("Cookie").find(".username").text()).toBe(
        "DO_NOT_REGISTER"
      );
    });
    afterAll(() => {
      app.detach();
    });
  });
});
