import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPageContetx = createContext({
  query: "",
  countries: [],
  isLoading: false,
  error: null,
  showForm: false,
  countryName: "",
  firstDay: "",
  lastDay: "",
  formIndex: 0,
  destinationPoints: [],
  destinationAddress: [],
  dateValidationError: null,
  mapError: null,
  showFormHandler: () => {},
  hideFormHandler: () => {},
  setQuery: () => {},
  sendRequest: () => {},
  setShowForm: () => {},
  setCountryName: () => {},
  backBtnHandler: () => {},
  nextBtnHandler: () => {},
  setFirstDay: () => {},
  setLastDay: () => {},
  setDestinationPoints: () => {},
  reverseGeolocation: () => {},
  setCountryGeolocation: () => {},
  setMapError: () => {},
});

const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [formIndex, setFormIndex] = useState(0);
  const [destinationPoints, setDestinationPoints] = useState([]);
  const [destinationAddress, setDestinationAddress] = useState([]);
  const [countryGeolocation, setCountryGeolocation] = useState([]);
  const [dateValidationError, setDateValidationError] = useState(null);
  const [mapError, setMapError] = useState(null);
  const navigate = useNavigate();

  const sendRequest = async (e) => {
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
        countryName.toLowerCase()
      ) {
        setMapError(
          `Your destination country is ${countryName}.You can only choose destination points for ${countryName} on map. `
        );
        return;
      }

      setDestinationAddress((prev) => [
        ...prev,
        { address: data.features[0].properties.formatted },
      ]);
      fn();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const showFormHandler = (name) => {
    setShowForm(true);
    setCountryName(name);
    setFormIndex(1);
    setFirstDay("");
    setLastDay("");
  };

  const hideFormHandler = () => {
    setShowForm(false);
  };

  const backBtnHandler = () => {
    if (formIndex === 1) {
      setFormIndex(0);
      setShowForm(false);
      navigate("/app/search");
    }
    if (formIndex === 2) {
      setFormIndex(1);
      setDestinationAddress([]);
      setDestinationPoints([]);
    }
  };

  const nextBtnHandler = () => {
    if (formIndex === 1) {
      if (new Date(firstDay) < Date.now()) {
        setFirstDay("");
        setDateValidationError("First day can not be selected at past");
        return;
      }

      if (new Date(firstDay) > new Date(lastDay)) {
        setLastDay("");
        setDateValidationError(
          "Last day must be a date which is after first day"
        );
        return;
      }
      setDateValidationError(null);
      setFormIndex(2);
    }

    if (formIndex === 2) {
      const obj = {
        firstDay,
        lastDay,
        countryName,
        destinationAddress,
        destinationPoints,
        countryGeolocation,
      };
      console.log(obj);
    }
  };
  return (
    <SearchPageContetx.Provider
      value={{
        query,
        countries,
        isLoading,
        error,
        showForm,
        countryName,
        formIndex,
        firstDay,
        lastDay,
        destinationPoints,
        destinationAddress,
        dateValidationError,
        mapError,
        showFormHandler,
        hideFormHandler,
        setQuery,
        sendRequest,
        setShowForm,
        setCountryName,
        backBtnHandler,
        nextBtnHandler,
        setFirstDay,
        setLastDay,
        setDestinationPoints,
        reverseGeolocation,
        setCountryGeolocation,
        setMapError,
      }}
    >
      {children}
    </SearchPageContetx.Provider>
  );
};

export { SearchProvider, SearchPageContetx };