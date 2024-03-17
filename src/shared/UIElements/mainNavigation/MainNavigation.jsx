import React from "react";
import styles from "./MainNavigation.module.css";
import Logo from "../Logo";
import NavMenu from "./NavMenu";
import SmallScreen from "./SmallScreen";

function MainNavigation() {
  return (
    <nav className={styles.nav}>
      <Logo link={"/"} withText={true} />
      <NavMenu />
      <SmallScreen />
    </nav>
  );
}

export default MainNavigation;
