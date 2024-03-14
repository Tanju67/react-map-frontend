import React, { useState } from "react";
import styles from "./FooterSection.module.css";
import Logo from "../../shared/UIElements/Logo";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import Reveal from "../../shared/UIElements/Reveal";

function FooterSection() {
  const [active, setActive] = useState(1);
  return (
    <Reveal>
      <div className={styles.footer}>
        <Logo />
        <ul className={styles.footerNav}>
          <li>
            <a href={"/#about"}>About Us</a>
          </li>
          <li>|</li>
          <li>
            <a href="/#pricing">Pricing</a>
          </li>
          <li>|</li>
          <li>
            <a href="/#review">Review</a>
          </li>
          <li>|</li>
          <li>
            <NavLink>App</NavLink>
          </li>
          <li>|</li>
          <li>
            <NavLink>Login</NavLink>
          </li>
        </ul>
        <div className={styles.socialMedia}>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
    </Reveal>
  );
}

export default FooterSection;
