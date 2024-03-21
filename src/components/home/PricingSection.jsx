import React from "react";
import styles from "./PricingSection.module.css";
import Logo from "../../shared/UIElements/Logo";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/UIElements/Button";
import Reveal from "../../shared/UIElements/Reveal";

function PricingSection() {
  return (
    <div id="pricing" className={styles.section}>
      <Reveal>
        <h2>
          <Logo /> Pricing
        </h2>
      </Reveal>
      <Reveal>
        <div className={styles.pricingContainer}>
          <Reveal className={styles.pricingCard}>
            <div className={styles.text}>
              <h3 className={styles.title}>Premium</h3>
              <p className={styles.description}>
                Advanced features for pros who need more customization.
              </p>
              <div className={styles.priceBox}>
                <span>Starts at </span>
                <span className={styles.sign}>
                  <span>$</span>
                  <span className={styles.price}>39</span>
                </span>
                <span className={styles.month}>/month</span>
              </div>
            </div>
            <Button size={"normal"}>Buy Now</Button>
          </Reveal>
          <Reveal className={styles.pricingCard}>
            <div className={styles.text}>
              <h3 className={styles.title}>Standart</h3>
              <p className={styles.description}>
                Standart features for user who don't need more customization.
              </p>
              <div className={styles.priceBox}>
                <span>Starts at </span>
                <span className={styles.sign}>
                  <span>$</span>
                  <span className={styles.price}>9</span>
                </span>
                <span className={styles.month}>/month</span>
              </div>
            </div>
            <Button size={"normal"}>Buy Now</Button>
          </Reveal>
          <Reveal className={styles.pricingCard}>
            <div className={styles.text}>
              <div>
                <h3 className={styles.title}>Free</h3>
                <p className={styles.description}>Basic features for users</p>
              </div>
              <div className={styles.priceBox}>
                <span>Starts at </span>
                <span className={styles.sign}>
                  <span>$</span>
                  <span className={styles.price}>0</span>
                </span>
                <span className={styles.month}>/month</span>
              </div>
            </div>
            <Button size={"normal"}>Sign Up Free</Button>
          </Reveal>
        </div>
      </Reveal>
    </div>
  );
}

export default PricingSection;
