import React, { useState, useEffect, useContext } from "react";

import CookieImage from "./cookie.svg";

import styles from "./cookie.module.css";
import axios from "axios";

import UserContext from "../../Context";

export default function Cookie({ user }) {
  const [clicks, setClicks] = useState(user.clicks);

  useEffect(() => {
    setClicks(user.clicks);
  }, [user]);

  useEffect(() => {
    animateCookie();
  }, [clicks]);

  return (
    <div className={styles.component}>
      <span className={styles.topLine}>
        Username: <span className="username">{user.name}</span>
      </span>
      <div className={styles.cookieContainer}>
        <img
          src={CookieImage}
          onClick={(e) => setClicks(clicks + 1)}
          className={styles.cookie}
          alt="Cookie"
        />
      </div>
      <br />
      <span>
        clicks: <span className="click">{clicks}</span>
      </span>
      <button className="send" onClick={getSend(user, clicks)}>
        update clicks to server
      </button>
    </div>
  );
}

function animateCookie(clicks) {
  const cookie = document.querySelector("." + styles.cookie);
  const container = document.querySelector("." + styles.cookieContainer);

  if (cookie) {
    container.style.width = clicks + 100 + "px";
    container.style.height = clicks + 100 + "px";

    cookie.style.marginTop = "-10px";
    setTimeout(() => {
      cookie.style.width = clicks + 100 + "px";
      cookie.style.height = clicks + 100 + "px";
      cookie.style.marginTop = "0";
    }, 500);
  }
}

function getSend(user, clicks) {
  return (e) => {
    if (user.name !== "Guest") {
      updateUser({
        ...user,
        clicks: clicks,
      }).then((response) => {
        if (!response.success) {
          console.log(response.message);
        }
      });
    }
  };
}

export async function updateUser(data) {
  return await axios.post("/api/update", data);
}
