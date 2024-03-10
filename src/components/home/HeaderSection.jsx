import React from "react";
import styles from "./HeaderSection.module.css";
import MainNavigation from "../../shared/UIElements/mainNavigation/MainNavigation";
import Button from "../../shared/UIElements/Button";

function HeaderSection() {
  return (
    <header className={styles.header}>
      <MainNavigation />
      <div className={styles.content}>
        <h1>Your Travel on Map</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          minima?
        </p>
        <Button className={styles.button} size="normal">
          Discover
        </Button>
      </div>
    </header>
  );
}

export default HeaderSection;
