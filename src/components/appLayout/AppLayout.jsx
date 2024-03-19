import React, { useContext } from "react";
import styles from "./AppLayout.module.css";
import SideBar from "./SideBar";
import Map from "./Map";
import Modal from "../../shared/UIElements/Modal";
import { AnimatePresence } from "framer-motion";
import { SearchFormRequestContetx } from "../../shared/context/searchFormRequest-context";

function AppLayout() {
  const { mapError, setMapError } = useContext(SearchFormRequestContetx);
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
