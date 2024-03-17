import React from "react";
import { SiGoogleearth } from "react-icons/si";
import styles from "./Logo.module.css";
import { Link } from "react-router-dom";

function Logo({ withText, onClick, link }) {
  return (
    <Link to={link} className={styles.logo} onClick={onClick}>
      <SiGoogleearth />
      {withText && <span>R-Map</span>}
    </Link>
  );
}

export default Logo;
