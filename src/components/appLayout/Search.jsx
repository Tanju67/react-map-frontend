import React, { useContext } from "react";
import styles from "./Search.module.css";
import CountryItem from "./CountryItem";
import { Outlet } from "react-router-dom";
import { SearchPageContetx } from "../../shared/context/serachPage-context";

function Search() {
  const { showForm, setQuery, query, countries, showFormHandler, sendRequest } =
    useContext(SearchPageContetx);
  const submitHandler = async (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <div className={styles.search}>
      {!showForm && (
        <>
          <form onSubmit={submitHandler} className={styles.formControl}>
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
              placeholder="Search country..."
            />
            <button type="submit" className={styles.searchBtn}>
              Search
            </button>
          </form>
          <ul className={styles.countries}>
            {countries.map((item, i) => (
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
      {showForm && <Outlet />}
    </div>
  );
}

export default Search;
