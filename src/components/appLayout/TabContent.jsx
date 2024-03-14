import React from "react";
import styles from "./TabContent.module.css";
import { Outlet } from "react-router-dom";

function TabContent() {
  return (
    <div className={styles.content}>
      <Outlet />
    </div>
  );
}

export default TabContent;
