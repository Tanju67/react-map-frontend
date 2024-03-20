import React, { useContext } from "react";
import styles from "./Search.module.css";
import CountryItem from "./CountryItem";
import { Outlet } from "react-router-dom";
import { SearchFormContext } from "../../shared/context/searchForm-context";
import { SearchFormRequestContetx } from "../../shared/context/searchFormRequest-context";
import Modal from "../../shared/UIElements/Modal";
import { BeatLoader } from "react-spinners";

function Search() {
  const { dispatch, showFormHandler, searchFormState } =
    useContext(SearchFormContext);
  const { getCountryDataFromApi, isLoading, error, setError } = useContext(
    SearchFormRequestContetx
  );
  const submitHandler = async (e) => {
    e.preventDefault();
    getCountryDataFromApi();
    dispatch({ type: "RESET_QUERY" });
  };

  return (
    <div className={styles.search}>
      {!searchFormState.formIsVisible && (
        <>
          <form onSubmit={submitHandler} className={styles.formControl}>
            {error && !isLoading && (
              <Modal errorMsg={error} handleError={() => setError(null)} />
            )}
            {isLoading && <BeatLoader className="loader" color="#36d7b7" />}
            <input
              onChange={(e) =>
                dispatch({ type: "SET_QUERY", payload: e.target.value })
              }
              value={searchFormState.query}
              type="text"
              placeholder="Search country..."
            />
            <button type="submit" className={styles.searchBtn}>
              Search
            </button>
          </form>
          <ul className={styles.countries}>
            {searchFormState.searchedCountries.map((item, i) => (
              <CountryItem
                key={i}
                image={item.flags.svg}
                name={item.name.common}
                region={item.region}
                coord={item.latlng}
                onClick={showFormHandler}
              />
            ))}
          </ul>
        </>
      )}
      {searchFormState.formIsVisible && <Outlet />}
    </div>
  );
}

export default Search;
