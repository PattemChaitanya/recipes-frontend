import React from "react";
import { Helmet } from "react-helmet";
import { Box, Container, Grid, Alert } from "@mui/material";
import RecipeCard from "../component/card";
import Loader from "../component/loader";
import { useGetRecipesQuery } from "../app/api/recipeApi";

const RecipesPage = () => {
  const { data, isLoading, isError, error } = useGetRecipesQuery();
  
  // Ensure recipes is an array that we can map over safely
  const recipes = (() => {
    if (!data) return [];
    if (Array.isArray(data)) {
      try {
        // Only use flat if it's an array and the method exists
        return data.flat ? data.flat(2) : data;
      } catch (e) {
        console.error("Error flattening array:", e);
        return data;
      }
    }
    return Object.values(data);
  })();

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
      <Container 
        maxWidth="xl" 
        sx={{ 
          mt: { xs: 8, sm: 12 }, 
          mb: 4,
          width: "80%" 
        }}
      >
        <Grid 
          container 
          spacing={2} 
          justifyContent="center"
        >
          {recipes.map((recipe, index) => (
            <Grid 
              item 
              key={recipe?.id || index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                minWidth: { xs: "100%", sm: "200px" },
                maxWidth: { sm: "250px" },
                "@media (max-width: 580px)": {
                  minWidth: "100%",
                  maxWidth: "100%"
                },
                "@media (min-width: 581px)": {
                  minWidth: "200px",
                  maxWidth: "250px"
                }
              }}
            >
              <RecipeCard
                id={recipe?.id}
                title={recipe?.title}
                description={recipe?.description}
                prepTime={recipe?.prepTime}
                cookTime={recipe?.cookTime}
                totalTime={recipe?.totalTime}
                servings={recipe?.servings}
                recipeImage={recipe?.recipeImage}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default RecipesPage;
