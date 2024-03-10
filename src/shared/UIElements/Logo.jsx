import React from "react";
import { SiGoogleearth } from "react-icons/si";
import styles from "./Logo.module.css";

function Logo({ withText, onClick }) {
  return (
    <div className={styles.logo} onClick={onClick}>
      <SiGoogleearth />
      {withText && <span>R-Map</span>}
    </div>
  );
}

export default Logo;
