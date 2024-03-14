import React from "react";
import styles from "./NavMenu.module.css";
import { NavLink } from "react-router-dom";

function NavMenu() {
  return (
    <ul className={styles.menu}>
      <li>
        <a href={"/#about"}>About Us</a>
      </li>
      <li>
        <a href="/#pricing">Pricing</a>
      </li>
      <li>
        <a href="/#review">Review</a>
      </li>
      <li>
        <NavLink>App</NavLink>
      </li>
      <li>
        <NavLink>Login</NavLink>
      </li>
    </ul>
  );
}

export default NavMenu;
