import React, { useContext } from "react";
import styles from "./AppLayout.module.css";
import SideBar from "./SideBar";
import Map from "./Map";
import { SearchPageContetx } from "../../shared/context/serachPage-context";
import Modal from "../../shared/UIElements/Modal";
import { AnimatePresence } from "framer-motion";

function AppLayout() {
  const { mapError, setMapError } = useContext(SearchPageContetx);
  return (
    <div className={styles.layout}>
      <SideBar />
      <Map />
      <AnimatePresence>
        {mapError && <Modal errorMsg={mapError} handleError={setMapError} />}
      </AnimatePresence>
    </div>
  );
}

export default AppLayout;
