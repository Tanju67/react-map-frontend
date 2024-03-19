import React, { useContext } from "react";
import styles from "./SideBarTab.module.css";
import { NavLink } from "react-router-dom";
import { SearchFormContext } from "../../shared/context/searchForm-context";

function SideBarTab() {
  const { dispatch, searchFormState } = useContext(SearchFormContext);
  return (
    <div className={styles.tabs}>
      <NavLink
        onClick={() => {
          dispatch({ type: "RESET_FORM" });
          dispatch({ type: "SET_TAB_INDEX", payload: 1 });
        }}
        className={`${styles.tab} ${
          +searchFormState.tabIndex === 1 ? styles.active : ""
        }`}
        to={"search"}
      >
        Search
      </NavLink>

      <NavLink
        onClick={() => {
          dispatch({ type: "RESET_FORM" });
          dispatch({ type: "SET_TAB_INDEX", payload: 2 });
        }}
        className={`${styles.tab} ${
          +searchFormState.tabIndex === 2 ? styles.active : ""
        }`}
        activeclassname="active"
        to={"countries"}
      >
        Countries
      </NavLink>

      <NavLink
        onClick={() => {
          dispatch({ type: "RESET_FORM" });
          dispatch({ type: "SET_TAB_INDEX", payload: 3 });
        }}
        className={`${styles.tab} ${
          +searchFormState.tabIndex === 3 ? styles.active : ""
        }`}
        activeclassname="active"
        to={"detail"}
      >
        Travel Detail
      </NavLink>
    </div>
  );
}

export default SideBarTab;
