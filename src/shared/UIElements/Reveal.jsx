import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import styles from "./Reveal.module.css";

function Reveal({ children, width = "fit-content" | "100%", className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const divStyle = { position: "relative", width, overflow: "hidden" };

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);
  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Reveal;
