import React, { useEffect } from "react";
import MainRoutes from "./config/routes";
import Navbar from "./component/navbar";
import SearchPage from "./pages/searchPage";
import { useDispatch } from "react-redux";
import {
  updateError,
  updateRecipes,
  updateRecipesToLimit,
  updateStatus,
} from "./app/slices/recipesSlice";
import { useGetRecipesQuery } from "./app/api/recipeApi";

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useGetRecipesQuery();

  useEffect(() => {
    if (!isLoading) {
      const recipesData = data.data;
      dispatch(updateRecipes(recipesData));
      dispatch(updateRecipesToLimit(recipesData.slice(0, 10)));
    }
    if (isError) {
      dispatch(updateError(isError));
    }
    dispatch(updateStatus(isLoading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <Navbar />
      <SearchPage />
      <MainRoutes />
    </>
  );
}

export default App;
