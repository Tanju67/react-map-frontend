import React, { useContext, useState } from "react";
import styles from "./SideBarTab.module.css";
import { NavLink } from "react-router-dom";
import { SearchPageContetx } from "../../shared/context/serachPage-context";

function SideBarTab() {
  const [tabIndex, setTabIndex] = useState(1);
  const { setShowForm } = useContext(SearchPageContetx);
  return (
    <div className={styles.tabs}>
      <NavLink
        onClick={() => {
          setTabIndex(1);
          setShowForm(false);
        }}
        className={`${styles.tab} ${tabIndex === 1 ? styles.active : ""}`}
        to={"search"}
      >
        Search
      </NavLink>

      <NavLink
        onClick={() => {
          setTabIndex(2);
          setShowForm(false);
        }}
        className={`${styles.tab} ${tabIndex === 2 ? styles.active : ""}`}
        activeclassname="active"
        to={"countries"}
      >
        Countries
      </NavLink>

      <NavLink
        onClick={() => {
          setTabIndex(3);
          setShowForm(false);
        }}
        className={`${styles.tab} ${tabIndex === 3 ? styles.active : ""}`}
        activeclassname="active"
        to={"detail"}
      >
        Travel Detail
      </NavLink>
    </div>
  );
}

export default SideBarTab;
