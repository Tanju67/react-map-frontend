import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: {},
  isLoading: false,
  error: null,
  onLogin: () => {},
  onLogout: () => {},
  sendAuthRequest: () => {},
  setError: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginHandler = (token, user) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setUser(user);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const sendAuthRequest = useCallback(async (endPoint, body, headers, fn) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + `/api/v1/${endPoint}`,
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

  const getCurentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/currentUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      getCurentUser();
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        sendAuthRequest,
        user,
        isLoading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
