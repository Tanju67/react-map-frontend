import React, { useContext } from "react";
import styles from "./Form.module.css";
import Card from "../../shared/UIElements/Card";
import Button from "../../shared/UIElements/Button";
import { SearchFormContext } from "../../shared/context/searchForm-context";
import { SearchFormRequestContetx } from "../../shared/context/searchFormRequest-context";
import Modal from "../../shared/UIElements/Modal";
import { BeatLoader } from "react-spinners";

function Form() {
  const { searchFormState, dispatch, backBtnHandler, nextBtnHandler } =
    useContext(SearchFormContext);
  const { isLoading, error, setError } = useContext(SearchFormRequestContetx);

  let disabled;
  if (+searchFormState.formIndex === 1) {
    disabled =
      !searchFormState.selectedCountry.firstDay ||
      !searchFormState.selectedCountry.lastDay;
  }

  if (searchFormState.formIndex === 2) {
    disabled = searchFormState.selectedCountry.destinationAddress.length === 0;
  }

  const year = new Date(Date.now()).getFullYear();
  const month = new Date(Date.now()).getMonth();
  const day = new Date(Date.now()).getDate();

  return (
    <Card className={styles.formCard}>
      <form className={styles.form}>
        {searchFormState.formIndex === 1 && (
          <div>
            <h4>Your Dates in {searchFormState.selectedCountry.name} </h4>
            <div className={styles.formControl}>
              <label>First Day</label>
              <input
                onChange={(e) =>
                  dispatch({
                    type: "SET_FIRST_DAY",
                    payload: e.currentTarget.value,
                  })
                }
                value={searchFormState.selectedCountry.firstDay}
                type="date"
                min={`2024-04-1`}
                max={`${year + 1}-${month}-${day}`}
              />
            </div>
            <div className={styles.formControl}>
              <label>Last Day</label>
              <input
                onChange={(e) =>
                  dispatch({
                    type: "SET_LAST_DAY",
                    payload: e.currentTarget.value,
                  })
                }
                value={searchFormState.selectedCountry.lastDay}
                type="date"
                min={`${year}-${month}-${day}`}
                max={`${year + 1}-${month}-${day}`}
              />
            </div>
            {searchFormState.dateValidationError && (
              <p className={styles.dateErr}>
                Error:{searchFormState.dateValidationError}
              </p>
            )}
          </div>
        )}

        {searchFormState.formIndex === 2 && (
          <div className={styles.stepTwo}>
            <h4>
              Select destination points in{" "}
              {searchFormState.selectedCountry.name} by clicking on map.
            </h4>
            <ul>
              {error && !isLoading && (
                <Modal errorMsg={error} handleError={() => setError(null)} />
              )}
              {isLoading && <BeatLoader className="loader" color="#36d7b7" />}
              {searchFormState.selectedCountry.destinationAddress.map(
                (item, i) => (
                  <li key={i}>
                    {i + 1}) {item.address}
                  </li>
                )
              )}
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
            {searchFormState.formIndex === 2 ? "Add Travel Plan" : "Next"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default Form;
