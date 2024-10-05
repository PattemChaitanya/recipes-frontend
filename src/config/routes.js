import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage";
import RecipePage from "../pages/recipePage";
import RecipesPage from "../pages/recipes-page";

const MainRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
      <Route path="/recipes" element={<RecipesPage />} />
    </Routes>
  );
};

export default MainRoutes;
