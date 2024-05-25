import AppLayout from "../components/appLayout/AppLayout";
import { CountryDataProvider } from "../shared/context/countryData-context";
import { SearchFormProvider } from "../shared/context/searchForm-context";
import { SearchFormRequestProvider } from "../shared/context/searchFormRequest-context";

function AppLayoutPage() {
  return (
    <CountryDataProvider>
      <SearchFormProvider>
        <SearchFormRequestProvider>
          <AppLayout />
        </SearchFormRequestProvider>
      </SearchFormProvider>
    </CountryDataProvider>
  );
}

export default AppLayoutPage;
