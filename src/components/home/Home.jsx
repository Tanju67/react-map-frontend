import React from "react";
import styles from "./Home.module.css";
import HeaderSection from "./HeaderSection";
import DiscoverSection from "./DiscoverSection";
import PricingSection from "./PricingSection";

function Home() {
  return (
    <div>
      <HeaderSection />
      <DiscoverSection />
      <PricingSection />
    </div>
  );
}

export default Home;
