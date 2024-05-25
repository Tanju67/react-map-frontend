import { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styles from "./HeaderSection.module.css";
import MainNavigation from "../../shared/UIElements/mainNavigation/MainNavigation";
import Button from "../../shared/UIElements/Button";
import { AuthContext } from "../../shared/context/auth-contxt";

function HeaderSection() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <MainNavigation />
      <div className={styles.content}>
        <motion.h1
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Your Travel on Map
        </motion.h1>
        <motion.p
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          minima?
        </motion.p>
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Button
            onClick={() =>
              isLoggedIn ? navigate("app/search") : navigate("/login")
            }
            className={styles.button}
            size="normal"
          >
            Discover App
          </Button>
        </motion.div>
      </div>
    </header>
  );
}

export default HeaderSection;
