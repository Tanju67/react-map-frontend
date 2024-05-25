import { useContext, useEffect } from "react";
import Search from "../components/appLayout/Search";
import { SearchFormContext } from "../shared/context/searchForm-context";

function SearchPage() {
  const { dispatch } = useContext(SearchFormContext);

  useEffect(() => {
    dispatch({ type: "SET_TAB_INDEX", payload: 1 });
  }, []);
  return <Search />;
}

export default SearchPage;
