import { createContext, useCallback, useEffect, useState } from "react";

export const CountryDataContext = createContext({
  isLoading: false,
  error: null,
  sendRequest: () => {},
});

export const CountryDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      console.log(data);
      fn(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
      setIsLoading(false);
    }
  }, []);

  return (
    <CountryDataContext.Provider value={{ isLoading, error, sendRequest }}>
      {children}
    </CountryDataContext.Provider>
  );
};
