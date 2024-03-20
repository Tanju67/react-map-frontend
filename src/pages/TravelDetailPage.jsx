import React, { useContext, useEffect } from "react";
import TravelDetail from "../components/appLayout/TravelDetail";
import { SearchFormContext } from "../shared/context/searchForm-context";
import { useSearchParams } from "react-router-dom";
import { CountryDataContext } from "../shared/context/countryData-context";

function TravelDetailPage() {
  const { dispatch } = useContext(SearchFormContext);
  const { getCountryDetail, setSelectedCountry } =
    useContext(CountryDataContext);
  const [searchParams] = useSearchParams();
  const countryId = searchParams.get("id");

  useEffect(() => {
    getCountryDetail(countryId, (data) => {
      console.log(data);
      setSelectedCountry(data.country);
    });
    dispatch({ type: "SET_TAB_INDEX", payload: 3 });
  }, []);
  return <TravelDetail />;
}

export default TravelDetailPage;
