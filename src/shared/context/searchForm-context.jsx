import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { CountryDataContext } from "./countryData-context";

const SearchFormContext = createContext({
  searchFormState: {},
  dispatch: () => {},
  hideFormHandler: () => {},
  backBtnHandler: () => {},
  nextBtnHandler: () => {},
});

const initialState = {
  query: "",
  zoom: 6,
  tabIndex: 1,
  searchedCountries: [],
  formIsVisible: false,
  formIndex: 0,
  dateValidationError: null,
  selectedCountry: {
    name: "",
    firstDay: "",
    lastDay: "",
    coords: [],
    flag: "",
    destinationPoints: [],
    destinationAddress: [],
  },
};

const searchFormReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_COUNTRY":
      return {
        ...state,
        selectedCountry: {
          ...state.selectedCountry,
          flag: action.payload.image,
          name: action.payload.name,
          coords: action.payload.coord,
        },
      };

    case "UPDATE_DESTINATION_POINTS":
      return {
        ...state,
        selectedCountry: {
          ...state.selectedCountry,
          destinationPoints: [
            ...state.selectedCountry.destinationPoints,
            action.payload,
          ],
        },
      };

    case "DELETE_DESTINATION_POINTS":
      return {
        ...state,
        selectedCountry: {
          ...state.selectedCountry,
          destinationPoints: [],
        },
      };

    case "UPDATE_DESTINATION_ADDRESS":
      return {
        ...state,
        selectedCountry: {
          ...state.selectedCountry,
          destinationAddress: [
            ...state.selectedCountry.destinationAddress,
            action.payload,
          ],
        },
      };

    case "DELETE_DESTINATION_ADDRESS":
      return {
        ...state,
        selectedCountry: {
          ...state.selectedCountry,
          destinationAddress: [],
        },
      };

    case "SET_QUERY":
      return {
        ...state,
        query: action.payload,
      };

    case "SET_SEARCH_RESULT":
      return {
        ...state,
        searchedCountries: action.payload,
      };

    case "SHOW_FORM":
      return {
        ...state,
        formIsVisible: true,
      };
    case "HIDE_FORM":
      return {
        ...state,
        formIsVisible: false,
      };

    case "UPDATE_FORM_INDEX":
      return {
        ...state,
        formIndex: +action.payload,
      };

    case "SET_FIRST_DAY":
      return {
        ...state,
        selectedCountry: {
          ...state.selectedCountry,
          firstDay: action.payload,
        },
      };

    case "SET_LAST_DAY":
      return {
        ...state,
        selectedCountry: {
          ...state.selectedCountry,
          lastDay: action.payload,
        },
      };

    case "SET_DATE_VALIDATION":
      return {
        ...state,
        dateValidationError: action.payload,
      };

    case "SET_TAB_INDEX":
      return {
        ...state,
        tabIndex: +action.payload,
      };

    case "SET_ZOOM":
      return {
        ...state,
        zoom: +action.payload,
      };

    case "RESET_QUERY":
      return {
        ...state,
        query: "",
      };

    case "RESET_FORM":
      return initialState;

    default:
      break;
  }
};

const SearchFormProvider = ({ children }) => {
  const [searchFormState, dispatch] = useReducer(
    searchFormReducer,
    initialState
  );
  const navigate = useNavigate();

  const { sendRequest: sendCountryRequest } = useContext(CountryDataContext);

  const showFormHandler = (name, image, coord) => {
    dispatch({ type: "UPDATE_COUNTRY", payload: { name, image, coord } });
    dispatch({ type: "SHOW_FORM" });
    dispatch({ type: "UPDATE_FORM_INDEX", payload: 1 });
    dispatch({ type: "SET_FIRST_DAY", payload: "" });
    dispatch({ type: "SET_LAST_DAY", payload: "" });
  };

  const hideFormHandler = () => {
    dispatch({ type: "HIDE_FORM" });
  };

  const backBtnHandler = () => {
    if (searchFormState.formIndex === 1) {
      dispatch({ type: "UPDATE_FORM_INDEX", payload: 0 });
      dispatch({ type: "HIDE_FORM" });
      navigate("/app/search");
    }
    if (searchFormState.formIndex === 2) {
      dispatch({ type: "UPDATE_FORM_INDEX", payload: 1 });
      dispatch({ type: "DELETE_DESTINATION_POINTS" });
      dispatch({ type: "DELETE_DESTINATION_ADDRESS" });
    }
  };

  const nextBtnHandler = () => {
    if (searchFormState.formIndex === 1) {
      if (new Date(searchFormState.selectedCountry.firstDay) < Date.now()) {
        dispatch({ type: "SET_FIRST_DAY", payload: "" });
        dispatch({
          type: "SET_DATE_VALIDATION",
          payload: "First day can not be selected at past",
        });
        return;
      }
      if (
        new Date(searchFormState.selectedCountry.firstDay) >
        new Date(searchFormState.selectedCountry.lastDay)
      ) {
        dispatch({ type: "SET_LAST_DAY", payload: "" });
        dispatch({
          type: "SET_DATE_VALIDATION",
          payload: "Last day must be a date which is after first day",
        });

        return;
      }
      dispatch({ type: "SET_DATE_VALIDATION", payload: null });
      dispatch({ type: "UPDATE_FORM_INDEX", payload: 2 });
    }

    if (searchFormState.formIndex === 2) {
      const token = localStorage.getItem("token");
      sendCountryRequest(
        "",
        {
          name: searchFormState.selectedCountry.name,
          geoLocation: searchFormState.selectedCountry.coords,
          image: searchFormState.selectedCountry.flag,
          destinationPoints: searchFormState.selectedCountry.destinationPoints,
          destinationAddress:
            searchFormState.selectedCountry.destinationAddress,
          firstDay: searchFormState.selectedCountry.firstDay,
          lastDay: searchFormState.selectedCountry.lastDay,
        },
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        () => {
          navigate("/app/countries");
        }
      );
      dispatch({ type: "RESET_FORM" });
      dispatch({ type: "SET_TAB_INDEX", payload: 2 });
    }
  };
  return (
    <SearchFormContext.Provider
      value={{
        searchFormState,
        showFormHandler,
        dispatch,
        hideFormHandler,
        backBtnHandler,
        nextBtnHandler,
      }}
    >
      {children}
    </SearchFormContext.Provider>
  );
};

export { SearchFormContext, SearchFormProvider };
