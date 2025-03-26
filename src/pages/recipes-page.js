import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container, Grid, Alert } from "@mui/material";
import RecipeCard from "../component/card";
import Loader from "../component/loader";
import { useGetRecipesQuery } from "../app/api/recipeApi";

const RecipesPage = () => {
  const { data: recipes, isLoading, isError, error } = useGetRecipesQuery();

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Alert severity="error" sx={{ maxWidth: 600, margin: "auto" }}>
          {error?.message || "Error loading recipes. Please try again later."}
        </Alert>
      </Box>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Alert severity="info" sx={{ maxWidth: 600, margin: "auto" }}>
          No recipes found
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Helmet defer={false}>
        <title>{"Recipes - Chey's Diary"}</title>
        <meta
          name="description"
          content="Explore a collection of delicious recipes from Chey's Diary"
        />
      </Helmet>
      <Container maxWidth="xl" sx={{ mt: { xs: 8, sm: 12 }, mb: 4 }}>
        <Grid container spacing={4}>
          {recipes.map((recipe) => (
            <Grid item key={recipe.id} xs={12} sm={6} md={4} lg={3}>
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                description={recipe.description}
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                totalTime={recipe.totalTime}
                servings={recipe.servings}
                recipeImage={recipe.recipeImage}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default RecipesPage;
