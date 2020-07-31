import React from "react";
import Cookie from "../components/Cookie";

import { mount } from "enzyme";
import axios from "axios";

jest.mock("axios");

const USER_NAME = "test_user";
const PASSWORD = "1234";

axios.post.mockImplementation(() => {
  return Promise.resolve({ success: true });
});

describe("Cookie", () => {
  const cookie = mount(
    <Cookie user={{ name: USER_NAME, password: PASSWORD, clicks: 0 }} />
  );

  test("exists", () => {
    expect(cookie.exists()).toBe(true);
    expect(cookie.find(".username").exists()).toBe(true);
    expect(cookie.find(".username").text()).toBe(USER_NAME);
  });

  test("increases clicks on click", () => {
    cookie.find("img").simulate("click");
    expect(cookie.find(".clicks").text()).toBe("1");
  });

  test("send Data success", () => {
    cookie.find(".send").simulate("click");
    expect(axios.post.mock.calls.length).toBe(1);
  });

  test("send Data every 10 clicks", () => {
    axios.post.mockClear();

    Array(20)
      .fill(null)
      .forEach((v) => {
        cookie.find("img").simulate("click");
      });
    expect(axios.post.mock.calls.length).toBe(2);
  });
});
