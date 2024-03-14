import React from "react";
import styles from "./SideBar.module.css";
import Logo from "../../shared/UIElements/Logo";
import SideBarTab from "./SideBarTab";
import TabContent from "./TabContent";

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.logoBox}>
        <Logo withText={true} />
      </div>
      <SideBarTab />
      <TabContent />
    </div>
  );
}

export default SideBar;
