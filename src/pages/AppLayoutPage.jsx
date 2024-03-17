import React from "react";
import AppLayout from "../components/appLayout/AppLayout";
import { SearchProvider } from "../shared/context/serachPage-context";

function AppLayoutPage() {
  return (
    <SearchProvider>
      <AppLayout />
    </SearchProvider>
  );
}

export default AppLayoutPage;
