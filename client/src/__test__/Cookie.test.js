import React from "react";
import Cookie from "../components/Cookie";

import { mount } from "enzyme";
import axios from "axios";

jest.mock("axios");

const USER_NAME = "test_user";

describe("Cookie", () => {
  const cookie = mount(<Cookie user={{ name: USER_NAME, clicks: 0 }}></Cookie>);

  test("exists", () => {
    expect(cookie.exists()).toBe(true);
    expect(cookie.find("h1").exists()).toBe(true);
    expect(cookie.find("h1").text()).toBe(USER_NAME);
  });

  test("increases clicks on click", () => {
    cookie.find(".click").simulate("click");
    expect(cookie.find(".click").text()).toBe("1");
  });

  test("send Data success", () => {
    axios.post.mockClear();
    axios.post.mockImplementationOnce((...args) => {
      return { success: true };
    });

    cookie.find(".send").simulate("click");
    expect(axios.post.mock.calls.length).toBe(1);
  });
});
