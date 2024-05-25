import { createContext, useContext, useState } from "react";
import { SearchFormContext } from "./searchForm-context";

const SearchFormRequestContetx = createContext({
  mapError: null,
  isLoading: false,
  error: null,
  getCountryDataFromApi: () => {},
  reverseGeolocation: () => {},
  setMapError: () => {},
  setError: () => {},
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
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reverseGeolocation = async (coords, fn) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${coords[0]}&lon=${
          coords[1]
        }&apiKey=${import.meta.env.VITE_GEOCODING_API_KEY}`
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
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <SearchFormRequestContetx.Provider
      value={{
        getCountryDataFromApi,
        reverseGeolocation,
        mapError,
        setMapError,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </SearchFormRequestContetx.Provider>
  );
};

export { SearchFormRequestProvider, SearchFormRequestContetx };
