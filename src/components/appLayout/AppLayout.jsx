import React from "react";
import styles from "./AppLayout.module.css";
import SideBar from "./SideBar";
import Map from "./Map";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <SideBar />
      <Map />
    </div>
  );
}

export default AppLayout;
