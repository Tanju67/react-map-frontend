import React, { useContext, useState } from "react";
import styles from "./AppLayout.module.css";
import SideBar from "./SideBar";
import Map from "./Map";
import Modal from "../../shared/UIElements/Modal";
import { AnimatePresence } from "framer-motion";
import { SearchFormRequestContetx } from "../../shared/context/searchFormRequest-context";
import { RiSideBarFill } from "react-icons/ri";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(true);
  const { mapError, setMapError } = useContext(SearchFormRequestContetx);
  return (
    <div className={styles.layout}>
      {!showSidebar && (
        <span onClick={() => setShowSidebar(true)} className={styles.showBtn}>
          <RiSideBarFill />
        </span>
      )}

      {showSidebar && <SideBar setShowSidebar={setShowSidebar} />}

      <Map />
      <AnimatePresence>
        {mapError && <Modal errorMsg={mapError} handleError={setMapError} />}
      </AnimatePresence>
    </div>
  );
}

export default AppLayout;
