import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import RecipeCard from "../component/card";
import Loader from "../component/loader";
import { getDeviceInfo } from "../config/user-details";
import { firebaseCallingFunctions } from "../utils/firebase-functions";
import { globalAnalytics } from "../config/firebase-analytics";

const HomePage = () => {
  const { recipesToLimit: recipes, error } = useSelector(
    (state) => state.recipes
  );
  const [isLoading, setIsLoading] = useState(true);

  const gettingDetails = async () => {
    const deviceInfo = await getDeviceInfo();
    firebaseCallingFunctions("post", deviceInfo);
    globalAnalytics({
      eventName: "viewer_home_page",
      type: "pageOnEnter",
    });
  };

  useEffect(() => {
    process.env.NODE_ENV !== "development" && gettingDetails();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (recipes.length === 0) {
    return <Loader isLoading={isLoading} />;
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
