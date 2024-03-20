import React, { useContext } from "react";
import styles from "./TravelDetail.module.css";
import { motion } from "framer-motion";
import { CountryDataContext } from "../../shared/context/countryData-context";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/UIElements/Button";
import { SearchFormContext } from "../../shared/context/searchForm-context";
import Modal from "../../shared/UIElements/Modal";
import { BeatLoader } from "react-spinners";

function TravelDetail() {
  const {
    selectedCountry,
    deleteCountry,
    getAllCountries,
    setSelectedCountry,
    setCountries,
    isLoading,
    error,
    setError,
  } = useContext(CountryDataContext);
  const { dispatch } = useContext(SearchFormContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const countryId = searchParams.get("id");

  const deleteCountryHandler = () => {
    deleteCountry(countryId, (data) => {});
    getAllCountries((data) => {
      setCountries(data.countries);
    });
    navigate("/app/countries");
    dispatch({ type: "SET_TAB_INDEX", payload: 2 });
    setSelectedCountry([]);
  };

  return (
    <div className={styles.page}>
      {error && !isLoading && (
        <Modal errorMsg={error} handleError={() => setError(null)} />
      )}
      {isLoading && <BeatLoader className="loader" color="#36d7b7" />}
      <Card className={styles.detailCard}>
        <div>
          <div className={styles.header}>
            <div className={styles.imgBox}>
              <img src={selectedCountry?.image} alt="" />
            </div>
            <div className={styles.infoBox}>
              <h3>{selectedCountry?.name}</h3>
              <p>
                <span>First day in {selectedCountry?.name}:</span>
                <span>{selectedCountry?.firstDay}</span>
              </p>
              <p>
                <span>Last day in {selectedCountry.name}:</span>
                <span>{selectedCountry?.lastDay}</span>
              </p>
            </div>
          </div>
          <ul className={styles.detail}>
            <h4>Your destination addresses in {selectedCountry?.name}</h4>
            {selectedCountry?.destinationAddress?.map((item, i) => (
              <Link
                onClick={() => {
                  dispatch({ type: "SET_ZOOM", payload: 15 });
                }}
                to={`?lat=${selectedCountry?.destinationPoints[i].lat}&lng=${selectedCountry?.destinationPoints[i].lng}`}
                key={i}
              >
                <li>
                  {i + 1}) {item.address}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className={styles.btnBox}>
          <Link
            to={"/app/countries"}
            onClick={() => {
              dispatch({ type: "SET_TAB_INDEX", payload: 2 });
              dispatch({ type: "SET_ZOOM", payload: 6 });
              setSelectedCountry({});
            }}
          >
            <Button size={"sm"}>Back</Button>
          </Link>
          <Button onClick={deleteCountryHandler} size={"sm"}>
            Delete Travel Plan
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default TravelDetail;
