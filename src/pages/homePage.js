import React from "react";
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import RecipeCard from "../component/card";

const HomePage = () => {
  const { recipes, status, error } = useSelector((state) => state.recipes);

  const linkToRecipePage = (title) => {
    const recipeFilter = recipes.find(
      (item) => item.title.toLowerCase() === title.toLowerCase()
    );
    window.location.href = `/recipe/${recipeFilter.id}`;
  };

  return (
    <>
      {status === "loading" ? (
        <Typography
          variant="h5"
          sx={{ marginTop: "200px", textAlign: "center" }}
        >
          LOADING...
        </Typography>
      ) : (
        <Container
          component="main"
          sx={{ marginTop: "90px", width: "100%", paddingBottom: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: { xs: "100%", md: "600px" },
              margin: "auto",
              alignItems: "center",
              mb: 4,
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
      )}
    </>
  );
};

export default HomePage;
