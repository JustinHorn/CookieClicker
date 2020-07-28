import React, { useRef, useState } from "react";

import Cookie from "./components/Cookie";
import "./App.css";

import axios from "axios";
import { act } from "react-dom/test-utils";

function App() {
  const [user, setUser] = useState({ name: "Guest", clicks: 0 });

  const input = useRef(null);
  const inputPassword = useRef(null);

  const inputNew = useRef(null);
  const inputNewPassword = useRef(null);

  const login = (e) => {
    if (input.current.value.trim() && inputPassword.current.value.trim()) {
      getUser({
        name: input.current.value,
        password: inputPassword.current.value,
      })
        .then((response) => {
          act(() => setUser(response.data.user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const register = () => {
    if (
      inputNew.current.value.trim() &&
      inputNewPassword.current.value.trim()
    ) {
      const newUser = {
        name: inputNew.current.value,
        password: inputNewPassword.current.value,
        clicks: 0,
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

  return (
    <div className="App">
      <Cookie user={user} />

      <div>
        <div>
          <h3>Login</h3>
          <form>
            <input
              type="text"
              ref={input}
              className="enterName"
              placeholder="enter name"
              required
            />
            <input
              type="password"
              ref={inputPassword}
              className="enterPassword"
              placeholder="enter password"
              required
            />
            <input
              type="button"
              className="login"
              onClick={(e) => login(e)}
              value="login"
            />
          </form>
        </div>
        <br />
        <div>
          <h3>Register</h3>
          <form>
            <input
              type="text"
              ref={inputNew}
              className="enterNewName"
              placeholder="enter NEW name"
              required
            />
            <input
              type="password"
              ref={inputNewPassword}
              className="enterNewPassword"
              placeholder="enter password"
              required
            />
            <input
              type="button"
              className="register"
              onClick={(e) => register()}
              value="register"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

const parts = window.location.origin.split(":");
const url = parts[0] + ":" + parts[1] + ":9000";

export async function getUser(params) {
  return await axios.post("/api/get", params);
}

export async function createUser(params) {
  return await axios.post("/api/create", params);
}

export default App;
