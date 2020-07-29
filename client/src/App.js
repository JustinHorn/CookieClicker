import React, { useRef, useState } from "react";

import Cookie from "./components/cookie/";
import "./App.css";

import axios from "axios";
import { act } from "react-dom/test-utils";

import Authentication from "./components/authentication";


export default function App() {
  const [user, setUser] = useState({ name: "Guest", clicks: 0 });

  const loginRegister = getLoginAndRegister(user, setUser);

  return (
    <div className="App">
        <Cookie user={user} />
        <Authentication {...loginRegister} />
    </div>
  );
}

function getLoginAndRegister(user, setUser) {
  const login = (name, password) => {
    if (name.trim() && password.trim()) {
      getUser({
        name: name,
        password: password,
      })
        .then((response) => {
          const new_user = response.data.user;
          new_user.clicks = new_user.clicks + user.clicks;
          act(() => setUser(new_user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const register = (name, password) => {
    const clicks = user.name === "Guest" ? user.clicks : 0;
    if (name.trim() && password.trim()) {
      const newUser = {
        name: name,
        password: password,
        clicks: clicks,
      };
      createUser(newUser)
        .then((response) => {
          act(() => setUser(newUser));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return { login: login, register: register };
}

export async function getUser(params) {
  return await axios.post("/api/get", params);
}

export async function createUser(params) {
  return await axios.post("/api/create", params);
}
