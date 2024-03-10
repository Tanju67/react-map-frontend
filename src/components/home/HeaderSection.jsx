import React from "react";
import styles from "./HeaderSection.module.css";
import MainNavigation from "../../shared/UIElements/mainNavigation/MainNavigation";

function HeaderSection() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <MainNavigation />
      </div>
    </header>
  );
}

export default HeaderSection;
