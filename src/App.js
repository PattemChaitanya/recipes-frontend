import React, { useEffect } from "react";
import MainRoutes from "./config/routes";
import Navbar from "./component/navbar";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "./app/slices/recipesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar />
      <MainRoutes />
    </>
  );
}

export default App;
