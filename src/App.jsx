import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayoutPage from "./pages/AppLayoutPage";
import SearchPage from "./pages/SearchPage";
import CountriesPage from "./pages/CountriesPage";
import TravelDetailPage from "./pages/TravelDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="app" element={<AppLayoutPage />}>
          <Route path="search" element={<SearchPage />} />
          <Route path="countries" element={<CountriesPage />} />
          <Route path="detail" element={<TravelDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
