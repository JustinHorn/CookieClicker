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
      expect(app.find("Cookie").find("h1").text()).toBe("Guest");
    });
    test("inputs exists", () => {
      expect(app.find(".enterName").exists()).toBe(true);
      expect(app.find(".enterPassword").exists()).toBe(true);
      expect(app.find(".login").exists()).toBe(true);

      expect(app.find(".enterNewName").exists()).toBe(true);
      expect(app.find(".enterNewPassword").exists()).toBe(true);
      expect(app.find(".register").exists()).toBe(true);
    });
  });

  describe("login", () => {
    const app = mount(<App />);

    beforeAll(() => {
      app.find(".enterName").instance().value = USER_NAME;
      app.find(".enterName").simulate("change");
      app.find(".enterPassword").instance().value = PASSWORD;
      app.find(".enterPassword").simulate("change");
      app.find(".login").simulate("click");
    });

    test("cookie exists", () => {
      app.update();
      //console.log(app.debug());
      expect(app.find("Cookie").find("h1").text()).toBe(USER_NAME);

      expect(app.find(".enterName").exists()).toBe(true);
      expect(app.find(".login").exists()).toBe(true);
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
      app.find(".enterNewName").instance().value = "DO_NOT_REGISTER";
      app.find(".enterNewName").simulate("change");
      app.find(".enterNewPassword").instance().value = PASSWORD;
      app.find(".enterNewPassword").simulate("change");
      app.find(".register").simulate("click");
    });

    test("cookie exists", () => {
      app.update();

      expect(app.find("Cookie").find("h1").text()).toBe("DO_NOT_REGISTER");
      expect(app.find(".enterName").exists()).toBe(true);
      expect(app.find(".register").exists()).toBe(true);
    });
    afterAll(() => {
      app.detach();
    });
  });
});
