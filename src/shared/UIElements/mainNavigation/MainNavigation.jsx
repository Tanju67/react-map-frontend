import React from "react";
import styles from "./MainNavigation.module.css";
import Logo from "../Logo";
import NavMenu from "./NavMenu";

function MainNavigation() {
  return (
    <nav className={styles.nav}>
      <Logo link={"/"} withText={true} />
      <NavMenu />
    </nav>
  );
}

export default MainNavigation;
