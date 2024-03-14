import React from "react";
import styles from "./SideBarTab.module.css";
import { NavLink } from "react-router-dom";

function SideBarTab() {
  return (
    <div className={styles.tabs}>
      <NavLink className={styles.tab} activeclassname="active" to={"search"}>
        Search
      </NavLink>

      <NavLink className={styles.tab} activeclassname="active" to={"countries"}>
        Countries
      </NavLink>

      <NavLink className={styles.tab} activeclassname="active" to={"detail"}>
        Travel Detail
      </NavLink>
    </div>
  );
}

export default SideBarTab;
