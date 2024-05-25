import { useContext, useEffect } from "react";
import Countries from "../components/appLayout/Countries";
import { CountryDataContext } from "../shared/context/countryData-context";
import { SearchFormContext } from "../shared/context/searchForm-context";

function CountriesPage() {
  const { getAllCountries, setCountries } = useContext(CountryDataContext);
  const { dispatch } = useContext(SearchFormContext);

  useEffect(() => {
    getAllCountries((data) => {
      console.log(data);
      setCountries(data.countries);
    });

    dispatch({ type: "SET_TAB_INDEX", payload: 2 });
  }, []);
  return <Countries />;
}

export default CountriesPage;
