import React, { useContext } from "react";
import styles from "./NavMenu.module.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-contxt";

function NavMenu() {
  const { onLogout, isLoggedIn } = useContext(AuthContext);
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
        <NavLink to={isLoggedIn ? "app/search" : "/login"}>App</NavLink>
      </li>
      <li>
        <NavLink
          onClick={isLoggedIn ? onLogout : null}
          to={isLoggedIn ? "/" : "/login"}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </NavLink>
      </li>
    </ul>
  );
}

export default NavMenu;
