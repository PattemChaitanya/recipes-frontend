import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
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

  if (singleStatus) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ marginTop: "200px", textAlign: "center" }}
      >
        Error: {singleError}
      </Typography>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chey's Diary - {singleRecipe?.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content={singleRecipe?.description} />
      </Helmet>
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Card
          sx={{
            display: "flex",
            maxWidth: 1000,
            m: "auto",
            mb: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <CardHeader
              title={singleRecipe?.title}
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
                {singleRecipe?.description}
              </Typography>
              <Typography mt={3} variant="body1" color="text.secondary">
                Prep Time:{" "}
                <Typography
                  component="span"
                  variant="subtitle1"
                  sx={{ fontWeight: 600 }}
                >
                  {singleRecipe?.prepTime}
                </Typography>{" "}
                mins | Cook Time:{" "}
                <Typography
                  component="span"
                  variant="subtitle1"
                  sx={{ fontWeight: 600 }}
                >
                  {singleRecipe?.cookTime}
                </Typography>{" "}
                mins
              </Typography>
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              my: "10px",
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
              image={singleRecipe?.recipeImage}
              alt={singleRecipe?.title}
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
                {singleRecipe?.recipeIngredients?.map((ingredient, index) => (
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
              <ul
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  marginTop: 0,
                  marginBottom: 0,
                }}
              >
                {singleRecipe?.recipeInstructions.map((item, index) => (
                  <li key={index}>
                    <Typography variant="body2" color="text.secondary">
                      {item.title}
                    </Typography>
                    {item.ingredients &&
                      item.ingredients.map((ingredient, i) => (
                        <Chip
                          key={i}
                          label={ingredient}
                          variant="outlined"
                          sx={{ textTransform: "capitalize", margin: 0.5 }}
                        />
                      ))}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

export default RecipePage;
