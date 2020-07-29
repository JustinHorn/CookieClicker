import React, { useRef } from "react";

export default ({ login, register, user }) => {
  const name = useRef(null);
  const pw = useRef(null);

  const newName = useRef(null);
  const newPw = useRef(null);

  return (
    <div>
      <div>
        <h3>Login</h3>
        <form>
          <input
            type="text"
            ref={name}
            className="enterName"
            placeholder="enter name"
            required
          />
          <input
            type="password"
            ref={pw}
            className="enterPassword"
            placeholder="enter password"
            required
          />
          <input
            type="button"
            className="login"
            onClick={(e) => login(getValue(name), getValue(pw), user)}
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
            ref={newName}
            className="enterNewName"
            placeholder="enter NEW name"
            required
          />
          <input
            type="password"
            ref={newPw}
            className="enterNewPassword"
            placeholder="enter password"
            required
          />
          <input
            type="button"
            className="register"
            onClick={(e) => register(getValue(newName), getValue(newPw), user)}
            value="register"
          />
        </form>
      </div>
    </div>
  );
};

function getValue(input) {
  return input.current.value;
}
