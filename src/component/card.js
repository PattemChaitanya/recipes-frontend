import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const RecipeCard = ({
  id,
  title,
  description,
  prepTime,
  cookTime,
  totalTime,
  servings,
  recipeImage,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="200"
          image={recipeImage}
          alt={title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "4rem",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              minHeight: "4.5rem",
              mb: 2,
            }}
          >
            {description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {totalTime || prepTime + cookTime} min
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <RestaurantIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {servings} servings
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
