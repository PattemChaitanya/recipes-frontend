import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import RecipeCard from "../component/card";
import Loader from "../component/loader";
import { getDeviceInfo } from "../config/user-details";
import { trackDeviceInfo, trackEvent } from "../utils/analytics";

const HomePage = () => {
  const { recipesToLimit: recipesData, error } = useSelector(
    (state) => state.recipes
  );
  const [isLoading, setIsLoading] = useState(true);

  // Ensure recipes is an array we can safely map over
  const recipes = recipesData ? (Array.isArray(recipesData) ? recipesData : Object.values(recipesData)) : [];

  const gettingDetails = async () => {
    const deviceInfo = await getDeviceInfo();
    trackDeviceInfo(deviceInfo);
    trackEvent({
      eventName: "viewer_home_page",
      type: "pageOnEnter",
    });
  };

  useEffect(() => {
    process.env.NODE_ENV !== "development" && gettingDetails();
    
    // Set a reasonable timeout for loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Show loader while loading or if recipes is empty
  if (isLoading || recipes.length === 0) {
    return <Loader isLoading={true} />;
  }

  return (
    <Container
      component="main"
      sx={{
        marginTop: window.innerWidth > 500 ? "90px" : "70px",
        width: "80%",
        paddingBottom: 2,
      }}
    >
      <Typography variant="h5" mb={2} textAlign="center">
        Recipes I liked so much
      </Typography>
      <Grid 
        container 
        spacing={2} 
        justifyContent="center"
      >
        {error === "failed" ? (
          <Grid item xs={12}>
            {error}
          </Grid>
        ) : (
          recipes.map((item, index) => (
            <Grid 
              item 
              key={index}
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
                id={item.id}
                title={item.title}
                image={item.recipeImage}
                description={item.description}
                cookTime={item.cookTime}
                prepTime={item.prepTime}
                recipeImage={item.recipeImage}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HomePage;
