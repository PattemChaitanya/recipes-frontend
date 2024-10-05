import React from "react";
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import RecipeCard from "../component/card";
import Loader from "../component/loader";

const HomePage = () => {
  const { recipes, status, error } = useSelector((state) => state.recipes);

  const linkToRecipePage = (title) => {
    const recipeFilter = recipes.find(
      (item) => item.title.toLowerCase() === title.toLowerCase()
    );
    window.location.href = `/recipe/${recipeFilter.id}`;
  };

  if (status === "loading") {
    return <Loader isLoading={status} />;
  }

  return (
    <Container
      component="main"
      sx={{
        marginTop: window.innerWidth > 500 ? "90px" : "70px",
        width: "100%",
        paddingBottom: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: { xs: "100%", md: "600px" },
          margin: "auto",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Autocomplete
          freeSolo
          options={recipes.map((recipe) => recipe.title)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              placeholder="Search a recipe in database"
              size="small"
            />
          )}
          sx={{ xs: "100%", flexGrow: 1 }}
          onChange={(event, value) => linkToRecipePage(value)}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "18px",
        }}
      >
        {error === "failed"
          ? error
          : recipes
              .slice(0, 10)
              .map((item, index) => (
                <RecipeCard
                  key={index}
                  id={item.id}
                  title={item.title}
                  image={item.recipeImage}
                  description={item.description}
                  cookTime={item.cookTime}
                  prepTime={item.prepTime}
                />
              ))}
      </Box>
    </Container>
  );
};

export default HomePage;
