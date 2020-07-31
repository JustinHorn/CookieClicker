import React, { useState, useEffect, useRef } from "react";

import CookieImage from "./cookie.svg";

import styles from "./cookie.module.css";
import axios from "axios";

export default function Cookie({ user }) {
  const [clicks, setClicks] = useState(user.clicks);

  const preUser = useRef();
  useEffect(() => {
    preUser.current = user;
  });
  const previousUser = preUser.current;

  useEffect(() => {
    if (previousUser) {
      if (isGuest(previousUser)) {
        user.clicks = user.clicks + previousUser.clicks;
        if (previousUser.clicks > 0) {
          updateClicks(user, user.clicks);
        }
      }
    }
    setClicks(user.clicks);
  }, [user]);

  useEffect(() => {
    if (user.clicks !== clicks && clicks % 10 === 0) {
      updateClicks(user, clicks);
    }
    user.clicks = clicks;
    animateCookie(user.clicks);
  }, [clicks]);

  return (
    <div className={styles.component}>
      <span className={styles.topLine}>
        Username: <span className="username">{user.name}</span>
      </span>
      <div className={styles.cookieContainer}>
        <img
          id="test_cookie"
          src={CookieImage}
          onClick={(e) => setClicks(clicks + 1)}
          className={styles.cookie}
          alt="Cookie"
        />
      </div>
      <br />
      <span>
        clicks: <span className="clicks">{clicks}</span>
      </span>
      <button className="send" onClick={getUpdateClicks(user, clicks)}>
        update clicks to server
      </button>
    </div>
  );
}

function isGuest(user) {
  return user.name === "Guest";
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

function getUpdateClicks(user, clicks) {
  return (e) => updateClicks(user, clicks);
}

function updateClicks(user, clicks) {
  if (!isGuest(user)) {
    updateUser({
      ...user,
      clicks: clicks,
    }).then((response) => {
      if (!response.success) {
        console.log(response.message);
      }
    });
  }
}

export async function updateUser(data) {
  return await axios.post("/api/update", data);
}
