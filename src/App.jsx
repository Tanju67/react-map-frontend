import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayoutPage from "./pages/AppLayoutPage";
import SearchPage from "./pages/SearchPage";
import CountriesPage from "./pages/CountriesPage";
import TravelDetailPage from "./pages/TravelDetailPage";
import FormPage from "./pages/FormPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from "./shared/context/auth-contxt";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        {isLoggedIn && (
          <Route path="app" element={<AppLayoutPage />}>
            <Route path="search" element={<SearchPage />}>
              <Route path="form" element={<FormPage />} />
            </Route>
            <Route path="countries" element={<CountriesPage />} />
            <Route path="detail" element={<TravelDetailPage />} />
          </Route>
        )}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
