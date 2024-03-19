import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CountryDataContext } from "./countryData-context";
import { SearchFormContext } from "./searchForm-context";

const SearchFormRequestContetx = createContext({
  mapError: null,
  getCountryDataFromApi: () => {},
  reverseGeolocation: () => {},
  setMapError: () => {},
});

const SearchFormRequestProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapError, setMapError] = useState(null);
  const { searchFormState, dispatch } = useContext(SearchFormContext);

  const getCountryDataFromApi = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchFormState.query}`
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      dispatch({ type: "SET_SEARCH_RESULT", payload: data });
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reverseGeolocation = async (coords, fn) => {
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${coords[0]}&lon=${coords[1]}&apiKey=7512e9b0f5f5484086d3c24625a72875`
      );
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      const data = await res.json();
      if (
        data.features[0].properties.country.toLowerCase() !==
        searchFormState.selectedCountry.name.toLowerCase()
      ) {
        setMapError(
          `Your destination country is ${searchFormState.selectedCountry.name}.You can only choose destination points for ${searchFormState.selectedCountry.name} on map. `
        );
        return;
      }

      dispatch({
        type: "UPDATE_DESTINATION_ADDRESS",
        payload: { address: data.features[0].properties.formatted },
      });

      fn();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <SearchFormRequestContetx.Provider
      value={{
        getCountryDataFromApi,
        reverseGeolocation,
        mapError,
        setMapError,
      }}
    >
      {children}
    </SearchFormRequestContetx.Provider>
  );
};

export { SearchFormRequestProvider, SearchFormRequestContetx };
