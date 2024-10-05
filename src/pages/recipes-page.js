import React from "react";
import { useGetRecipesQuery } from "../app/api/recipeApi";
import { useSelector } from "react-redux";
import Loader from "../component/loader";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RecipesPage = () => {
  useGetRecipesQuery();
  const { data, loading, error } = useSelector((state) => state.allRecipes);
  const columnToShow = window.innerWidth > 500 ? 2 : 3;

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (error) {
    return <p>Error occurred</p>;
  }

  return (
    <Box
      component="div"
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexDirection: "column",
        padding: "0 16px 16px",
        marginTop: window.innerWidth > 500 ? "100px" : "80px",
      }}
    >
      <Typography variant="h5" mb={2}>
        Recipes i would love to have
      </Typography>
      {data?.length > 0 &&
        data.map((item) => (
          <Box
            component="div"
            style={{
              display: "flex",
              width: "800px",
              maxWidth: "100%",
              border: "1px solid #cecece",
              borderRadius: "8px",
              gap: "16px",
              padding: 0,
            }}
          >
            <img
              src={item.recipeImage}
              alt={item.title}
              style={{
                width: "150px",
                height: "120px",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
              }}
            />
            <Link
              to={`/recipe/${item.id}`}
              style={{
                display: "flex",
                flexDirection: "column",
                width: `calc(100% - 150px)`,
                padding: "8px 16px 8px 0",
                color: "#000",
              }}
            >
              <Typography variant="subtitle1" fontWeight="600">
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: columnToShow,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.5,
                  maxHeight: `calc(1.5em * ${columnToShow})`,
                }}
              >
                {item.description}
              </Typography>
            </Link>
          </Box>
        ))}
    </Box>
  );
};

export default RecipesPage;
