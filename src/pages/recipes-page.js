import React from "react";
import { useGetRecipesQuery } from "../app/api/recipeApi";
import { useSelector } from "react-redux";
import Loader from "../component/loader";
import { Typography } from "@mui/material";

const RecipesPage = () => {
  useGetRecipesQuery();
  const { data, loading, error } = useSelector((state) => state.allRecipes);

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  if (error) {
    return <p>Error occurred</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
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
          <div
            style={{
              display: "flex",
              width: "600px",
              maxWidth: "100%",
              border: "1px solid #cecece",
              borderRadius: "8px",
              gap: "8px",
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: `calc(100% - 150px)`,
                padding: "8px 8px 8px 0",
              }}
            >
              <Typography variant="subtitle1" fontWeight="600">
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                style={{
                  display: "-webkit-Box",
                  "-webkit-line-clamp": 2,
                  "-webkit-box-orient": "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: 1.5,
                  maxHeight: `calc(1.5em * 2)`,
                }}
              >
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RecipesPage;
