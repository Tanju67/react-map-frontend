import React from "react";
import styles from "./Button.module.css";

function Button({ children, onClick, type, className, size }) {
  return (
    <button
      className={`${styles.btn} ${className} ${styles[size]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
