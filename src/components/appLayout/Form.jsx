import React, { useContext, useEffect, useState } from "react";
import styles from "./Form.module.css";
import { SearchPageContetx } from "../../shared/context/serachPage-context";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/UIElements/Button";

function Form() {
  const {
    countryName,
    formIndex,
    backBtnHandler,
    nextBtnHandler,
    firstDay,
    setFirstDay,
    lastDay,
    setLastDay,
    destinationAddress,
    dateValidationError,
  } = useContext(SearchPageContetx);

  let disabled;
  if (formIndex === 1) {
    disabled = !firstDay || !lastDay;
  }

  if (formIndex === 2) {
    disabled = destinationAddress.length === 0;
  }

  const year = new Date(Date.now()).getFullYear();
  const month = new Date(Date.now()).getMonth();
  const day = new Date(Date.now()).getDate();

  return (
    <Card className={styles.formCard}>
      <form className={styles.form}>
        {formIndex === 1 && (
          <div>
            <h4>Your Dates in {countryName} </h4>
            <div className={styles.formControl}>
              <label>First Day</label>
              <input
                onChange={(e) => setFirstDay(e.currentTarget.value)}
                value={firstDay}
                type="date"
                min={`2024-04-1`}
                max={`${year + 1}-${month}-${day}`}
              />
            </div>
            <div className={styles.formControl}>
              <label>Last Day</label>
              <input
                onChange={(e) => setLastDay(e.currentTarget.value)}
                value={lastDay}
                type="date"
                min={`${year}-${month}-${day}`}
                max={`${year + 1}-${month}-${day}`}
              />
            </div>
            {dateValidationError && (
              <p className={styles.dateErr}>Error:{dateValidationError}</p>
            )}
          </div>
        )}

        {formIndex === 2 && (
          <div className={styles.stepTwo}>
            <h4>
              Select destination points in {countryName} by clicking on map.
            </h4>
            <ul>
              {destinationAddress.map((item, i) => (
                <li key={i}>
                  {i + 1}) {item.address}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.formAction}>
          <Button type={"button"} onClick={backBtnHandler} size={"sm"}>
            Back
          </Button>
          <Button
            type={"button"}
            onClick={nextBtnHandler}
            disabled={disabled}
            className={`${styles.nextBtn}`}
            size={"sm"}
          >
            {formIndex === 2 ? "Add Travel Plan" : "Next"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
