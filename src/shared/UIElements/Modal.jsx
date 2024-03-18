import React from "react";
import styles from "./Modal.module.css";
import Card from "./Card";
import Button from "./Button";
import { motion } from "framer-motion";

function Modal({ errorMsg, handleError }) {
  return (
    <motion.div
      variants={{
        hidden: { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" },
        show: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
      className={styles.backdrop}
    >
      <Card className={styles.modal}>
        <h2>Error!</h2>
        <p>{errorMsg}</p>
        <Button onClick={() => handleError(null)} size={"sm"}>
          Ok
        </Button>
      </Card>
    </motion.div>
  );
}

export default Modal;
