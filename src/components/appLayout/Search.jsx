import React, { useState } from "react";
import styles from "./Search.module.css";
import CountryItem from "./CountryItem";

function Search() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    setQuery("");
    console.log(countries);
  };
  return (
    <div className={styles.search}>
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
      <div className={styles.countries}>
        {countries.map((item, i) => (
          <CountryItem
            key={i}
            image={item.flags.svg}
            name={item.name.common}
            region={item.region}
            coord={item.latlng}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
