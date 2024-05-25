import { useContext, useState } from "react";
import styles from "./SideBarTab.module.css";
import { NavLink } from "react-router-dom";
import { SearchFormContext } from "../../shared/context/searchForm-context";
import { CountryDataContext } from "../../shared/context/countryData-context";
import Modal from "../../shared/UIElements/Modal";

function SideBarTab() {
  const { dispatch, searchFormState } = useContext(SearchFormContext);
  const { selectedCountry } = useContext(CountryDataContext);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.tabs}>
      {showModal && (
        <Modal
          errorMsg={"Click a contry detail button!"}
          handleError={() => setShowModal(false)}
        />
      )}
      <NavLink
        onClick={() => {
          dispatch({ type: "RESET_FORM" });
          dispatch({ type: "SET_TAB_INDEX", payload: 1 });
        }}
        className={`${styles.tab} ${
          +searchFormState.tabIndex === 1 ? styles.active : ""
        }`}
        to={"search"}
      >
        Search
      </NavLink>

      <NavLink
        onClick={() => {
          dispatch({ type: "RESET_FORM" });
          dispatch({ type: "SET_TAB_INDEX", payload: 2 });
        }}
        className={`${styles.tab} ${
          +searchFormState.tabIndex === 2 ? styles.active : ""
        }`}
        activeclassname="active"
        to={"countries"}
      >
        Countries
      </NavLink>

      <NavLink
        onClick={() => {
          if (selectedCountry?.name === undefined) {
            setShowModal(true);
            return;
          }
          dispatch({ type: "RESET_FORM" });
          dispatch({ type: "SET_TAB_INDEX", payload: 3 });
        }}
        className={`${styles.tab} ${
          +searchFormState.tabIndex === 3 ? styles.active : ""
        }`}
        activeclassname="active"
        to={selectedCountry?.name === undefined ? "countries" : "detail"}
      >
        Travel Detail
      </NavLink>
    </div>
  );
}

export default SideBarTab;
