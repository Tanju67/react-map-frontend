import React, { useContext } from "react";
import styles from "./CountryItem.module.css";
import { motion, spring } from "framer-motion";
import { Link } from "react-router-dom";
import { SearchPageContetx } from "../../shared/context/serachPage-context";

function CountryItem({ image, name, region, coord, onClick }) {
  const { setCountryGeolocation } = useContext(SearchPageContetx);
  return (
    <Link to={`form?lat=${coord[0]}&lng=${coord[1]}`}>
      <motion.li
        variants={{
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 },
        }}
        onClick={() => {
          onClick(name);
          setCountryGeolocation(coord);
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.5, type: "spring" }}
        className={styles.item}
        whileHover={{
          backgroundColor: "#e2e2e2",
        }}
      >
        <div className={styles.imgBox}>
          <img src={image} alt={name} />
          <span>{name}</span>
        </div>
        <div className={styles.region}>
          <span>{region}</span>
        </div>
      </motion.li>
    </Link>
  );
}

export default CountryItem;
