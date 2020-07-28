import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Cookie({ user }) {
  const [clicks, setClicks] = useState(user.clicks);

  useEffect(() => {
    setClicks(user.clicks);
  }, [user]);

  const send = (e) => {
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

  return (
    <div>
      <button className="click" onClick={(e) => setClicks(clicks + 1)}>
        {clicks}
      </button>
      <button className="send" onClick={send}>
        send data
      </button>
      <h1>{user.name}</h1>
    </div>
  );
}

const parts = window.location.origin.split(":");
const url = parts[0] + ":" + parts[1] + ":9000";

export async function updateUser(data) {
  return await axios.post("/api/update", data);
}
