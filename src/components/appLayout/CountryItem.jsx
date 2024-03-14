import React from "react";
import styles from "./CountryItem.module.css";

function CountryItem({ image, name, region }) {
  return (
    <div className={styles.item}>
      <div className={styles.imgBox}>
        <img src={image} alt={name} />
        <span>{name}</span>
      </div>
      <div className={styles.region}>
        <span>{region}</span>
      </div>
    </div>
  );
}

export default CountryItem;
