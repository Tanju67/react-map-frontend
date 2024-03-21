import React, { useState } from "react";
import styles from "./SideBar.module.css";
import Logo from "../../shared/UIElements/Logo";
import SideBarTab from "./SideBarTab";
import TabContent from "./TabContent";
import { motion } from "framer-motion";

function SideBar({ setShowSidebar }) {
  return (
    <motion.div
      initial={{ opacity: 0, transition: { duration: 1 } }}
      animate={{ opacity: 1 }}
      className={styles.sideBar}
    >
      <span onClick={() => setShowSidebar(false)} className={styles.clsBtn}>
        &times;
      </span>
      <div className={styles.logoBox}>
        <Logo link={"/"} withText={true} />
      </div>
      <SideBarTab />
      <TabContent />
    </motion.div>
  );
}

export default SideBar;
