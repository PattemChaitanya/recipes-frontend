import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
  Alert,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useGetRecipeByIdQuery } from "../app/api/singleRecipe";
import Loader from "../component/loader";

const RecipePage = () => {
  const { id } = useParams();
  const {
    data: singleRecipe,
    isLoading: singleStatus,
    isError: singleError,
  } = useGetRecipeByIdQuery(id);

  if (singleStatus) {
    return <Loader isLoading={singleStatus} />;
  }

  if (singleError) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Alert severity="error" sx={{ maxWidth: 600, margin: "auto" }}>
          {singleError.message ||
            "Error loading recipe. Please try again later."}
        </Alert>
      </Box>
    );
  }

  if (!singleRecipe) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Alert severity="info" sx={{ maxWidth: 600, margin: "auto" }}>
          Recipe not found
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Helmet defer={false}>
        <title>{(singleRecipe.title || "") + " - Chey's Diary"}</title>
        <meta name="description" content={singleRecipe.description || ""} />
      </Helmet>
      <Box
        sx={{
          marginTop: { xs: "65px", sm: "100px" },
          padding: "20px",
        }}
      >
        <Card
          sx={{
            display: "flex",
            maxWidth: 1000,
            m: "auto",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <CardHeader
              title={singleRecipe.title}
              titleTypographyProps={{
                align: "center",
                variant: "h4",
                fontWeight: 500,
              }}
            />
            <CardContent
              sx={{
                flex: "1 0 auto",
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                {singleRecipe.description || "No description available"}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Typography variant="body1" color="text.secondary">
                  Total Time:{" "}
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    {singleRecipe.totalTime || 0}
                  </Typography>{" "}
                  mins
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Prep Time:{" "}
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    {singleRecipe.prepTime || 0}
                  </Typography>{" "}
                  mins
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Cook Time:{" "}
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    {singleRecipe.cookTime || 0}
                  </Typography>{" "}
                  mins
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Servings:{" "}
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ fontWeight: 600 }}
                  >
                    {singleRecipe.servings || 1}
                  </Typography>
                </Typography>
              </Box>
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: "10px",
              mr: "10px",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: 250,
                height: 250,
                borderRadius: "5px",
              }}
              image={singleRecipe.recipeImage}
              alt={singleRecipe.title}
            />
          </Box>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            m: "auto",
            maxWidth: 1000,
            gap: 2,
          }}
        >
          <Card
            sx={{
              flex: 1,
              maxWidth: { sm: "33.33%" },
              height: "fit-content",
            }}
          >
            <CardHeader
              title="Ingredients"
              titleTypographyProps={{ align: "center", paddingBottom: 0 }}
            />
            <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <ul
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {singleRecipe.recipeIngredients?.map((ingredient, index) => (
                  <li key={index}>
                    <Typography variant="body2" color="text.secondary">
                      {ingredient}
                    </Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card
            sx={{
              flex: 2,
              maxWidth: { sm: "66.66%" },
              height: "fit-content",
            }}
          >
            <CardHeader
              title="Instructions"
              titleTypographyProps={{ align: "center", paddingBottom: 0 }}
            />
            <CardContent sx={{ paddingTop: 0, paddingBottom: 0 }}>
              <ol
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {singleRecipe.recipeInstructions?.map((instruction, index) => (
                  <li key={index}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      paragraph
                    >
                      {instruction.title}
                    </Typography>
                    {instruction.ingredients &&
                      instruction.ingredients.length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          {instruction.ingredients.map((ingredient, i) => (
                            <Chip
                              key={i}
                              label={ingredient}
                              variant="outlined"
                              size="small"
                              sx={{ textTransform: "capitalize", margin: 0.5 }}
                            />
                          ))}
                        </Box>
                      )}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default RecipePage;
