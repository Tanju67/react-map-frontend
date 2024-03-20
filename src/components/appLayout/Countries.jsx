import React, { useContext } from "react";
import styles from "./Countries.module.css";
import { CountryDataContext } from "../../shared/context/countryData-context";
import ItemCountry from "./ItemCountry";
import Modal from "../../shared/UIElements/Modal";
import { BeatLoader } from "react-spinners";

function Countries() {
  const { countries, isLoading, error, setError } =
    useContext(CountryDataContext);

  if (countries.length === 0) {
    return (
      <div className={styles.page}>
        {!isLoading && !error && (
          <p className={styles.noFound}>
            You don't have any travel plan for a country yet!
          </p>
        )}
      </div>
    );
  }
  return (
    <div className={styles.page}>
      {error && !isLoading && (
        <Modal errorMsg={error} handleError={() => setError(null)} />
      )}
      {isLoading && <BeatLoader className="loader" color="#36d7b7" />}
      <ul className={styles.countries}>
        {countries.map((item) => (
          <ItemCountry
            key={item._id}
            id={item._id}
            name={item.name}
            flag={item.image}
            firstDay={item.firstDay}
            lastDay={item.lastDay}
            coord={item.geoLocation}
          />
        ))}
      </ul>
    </div>
  );
}

export default Countries;
