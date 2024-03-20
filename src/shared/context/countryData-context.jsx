import { createContext, useCallback, useState } from "react";

export const CountryDataContext = createContext({
  isLoading: false,
  error: null,
  countries: [],
  selectedCountry: {},
  sendRequest: () => {},
  getAllCountries: () => {},
  setCountries: () => {},
  setSelectedCountry: () => {},
  deleteCountry: () => {},
  setError: () => {},
  getCountryDetail: () => {},
});

export const CountryDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  const sendRequest = useCallback(async (endPoint, body, headers, fn) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/country${endPoint}`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: headers,
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      }
      fn(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsLoading(false);
    }
  }, []);

  const getAllCountries = useCallback(async (fn) => {
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:5000/api/v1/country`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      }
      fn(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsLoading(false);
    }
  }, []);

  const getCountryDetail = useCallback(async (endPoint, fn) => {
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/country/${endPoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      }
      fn(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsLoading(false);
    }
  }, []);

  const deleteCountry = useCallback(async (endpoint) => {
    const token = localStorage.getItem("token");
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/v1/country/${endpoint}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg);
      }

      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsLoading(false);
    }
  }, []);

  return (
    <CountryDataContext.Provider
      value={{
        isLoading,
        error,
        sendRequest,
        getAllCountries,
        countries,
        setCountries,
        selectedCountry,
        setSelectedCountry,
        deleteCountry,
        setError,
        getCountryDetail,
      }}
    >
      {children}
    </CountryDataContext.Provider>
  );
};
