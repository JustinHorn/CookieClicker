import React, { useRef } from "react";

import styles from "./authentication.module.css";

export default ({ login, register }) => {
  return (
    <div className={styles.basicBuild}>
      <AuthenticationComponent
        text="Register"
        styles={styles.register}
        onClick={register}
      />
      <AuthenticationComponent
        text="Login"
        styles={styles.login}
        onClick={login}
      />
    </div>
  );
};

const AuthenticationComponent = ({ text, styles, onClick }) => {
  const name = useRef(null);
  const pw = useRef(null);

  const lowertext = text.toLowerCase();
  return (
    <div className={styles + " " + lowertext}>
      <h3>{text}</h3>
      <form>
        <input
          type="text"
          ref={name}
          className="name"
          placeholder="enter name"
          required
        />
        <input
          type="password"
          ref={pw}
          className="password"
          placeholder="enter password"
          required
        />
        <input
          type="button"
          className={"button"}
          onClick={(e) => onClick(getValue(name), getValue(pw))}
          value={lowertext}
        />
      </form>
    </div>
  );
};

function getValue(input) {
  return input.current.value;
}
