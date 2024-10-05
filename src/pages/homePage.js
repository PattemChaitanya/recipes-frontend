import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import RecipeCard from "../component/card";
import Loader from "../component/loader";
import { useGetRecipesQuery } from "../app/api/recipeApi";
import { getDeviceInfo } from "../config/user-details";
import { firebaseCallingFunctions } from "../utils/firebase-functions";
import { globalAnalytics } from "../config/firebase-analytics";

const HomePage = () => {
  useGetRecipesQuery();
  const { recipes, status, error } = useSelector((state) => state.recipes);

  const gettingDetails = async () => {
    const deviceInfo = await getDeviceInfo();
    firebaseCallingFunctions("post", deviceInfo);
  };

  useEffect(() => {
    process.env.NODE_ENV !== "development" && gettingDetails();
    globalAnalytics({
      eventName: "viewer_home_page",
      type: "pageOnEnter",
    });
  }, []);

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
      <Typography variant="h5" mb={2} textAlign="center">
        Recipes I liked so much
      </Typography>
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
          : recipes.map((item, index) => (
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
