import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage";
import RecipePage from "../pages/recipePage";
import SearchPage from "../pages/searchPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};

export default MainRoutes;
