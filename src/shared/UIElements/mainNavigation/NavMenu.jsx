import React from "react";
import styles from "./NavMenu.module.css";
import { NavLink } from "react-router-dom";

function NavMenu() {
  return (
    <ul className={styles.menu}>
      <li>
        <NavLink>Login</NavLink>
      </li>
    </ul>
  );
}

export default NavMenu;
