import React from "react";
import styles from "./Button.module.css";
import { motion } from "framer-motion";

function Button({ children, onClick, type, className, size }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "var(--clr-primary-shade)" }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500 }}
      className={`${styles.btn} ${className} ${styles[size]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}

export default Button;
