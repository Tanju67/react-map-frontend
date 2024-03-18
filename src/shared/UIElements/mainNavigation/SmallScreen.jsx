import React, { useContext, useState } from "react";
import styles from "./SmallScreen.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/auth-contxt";

function SmallScreen() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const showmenu = () => {
    setIsMenuVisible(true);
  };
  const { isLoggedIn, onLogout } = useContext(AuthContext);
  return (
    <div className={styles.smallScreen}>
      <GiHamburgerMenu onClick={showmenu} />
      <AnimatePresence>
        {isMenuVisible && (
          <motion.ul
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{
              opacity: 0,
              width: 0,
            }}
            className={styles.menu}
          >
            <motion.span
              whileHover={{ scale: 1.5, rotate: 90 }}
              onClick={() => setIsMenuVisible(false)}
            >
              &times;
            </motion.span>
            <li onClick={() => setIsMenuVisible(false)}>
              <a href={"/#about"}>About Us</a>
            </li>
            <li onClick={() => setIsMenuVisible(false)}>
              <a href="/#pricing">Pricing</a>
            </li>
            <li onClick={() => setIsMenuVisible(false)}>
              <a href="/#review">Review</a>
            </li>
            <li onClick={() => setIsMenuVisible(false)}>
              <NavLink to={isLoggedIn ? "app/search" : "/login"}>App</NavLink>
            </li>
            <li onClick={() => setIsMenuVisible(false)}>
              <NavLink
                onClick={isLoggedIn ? onLogout : null}
                to={isLoggedIn ? "/" : "/login"}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </NavLink>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SmallScreen;
