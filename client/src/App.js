import React, { useRef, useState, useEffect } from "react";

import Cookie from "./components/cookie/";
import "./App.css";

import axios from "axios";
import { act } from "react-dom/test-utils";

import Authentication from "./components/authentication";

export default function App() {
  const [user, setUser] = useState({ name: "Guest", clicks: 0 });

  const loginRegister = getLoginAndRegister(setUser);

  const [scores, setScores] = useState([
    { name: "Justin", clicks: 30 },
    { name: "test", clicks: 15 },
    { name: "Justin", clicks: 10 },
    { name: "test", clicks: 0 },
  ]);
  useEffect(() => {
    getScoreboard()
      .then((response) => {
        act(() => setScores(response.data.scores));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Cookie user={user} />
      <Authentication {...loginRegister} />
      <h3>Highscores</h3>
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Clicks</th>
        </tr>
        {scores &&
          scores.map((score, i) => (
            <tr key={i}>
              <td>{score.name}</td>
              <td>{score.clicks}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}

function getLoginAndRegister(setUser) {
  const login = (name, password) => {
    if (name.trim() && password.trim()) {
      getUser({
        name: name,
        password: password,
      })
        .then((response) => {
          const new_user = response.data.user;
          act(() => setUser(new_user));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const register = (name, password) => {
    if (name.trim() && password.trim()) {
      const newUser = {
        name: name,
        password: password,
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
  return { login: login, register: register };
}

/*
 */
const getScoreboard = async () => {
  return await axios.get("/api/scoreboard");
};

export async function getUser(params) {
  return await axios.post("/api/get", params);
}

export async function createUser(params) {
  return await axios.post("/api/create", params);
}
