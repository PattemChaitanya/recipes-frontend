import React from "react";
import "./card.css";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

const RecipeCard = ({ id, title, description, image, cookTime, prepTime }) => {
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_SITE_APP}/recipe/${id}`
    );
    alert("Link Copied");
  };

  return (
    <Card sx={{ width: "32%", minWidth: 345 }}>
      <CardMedia component="img" height="194" image={image} alt={title} />
      <CardContent sx={{ pb: 1 }}>
        <Link
          to={`/recipe/${id}`}
          style={{
            display: "flex",
            padding: 0,
            height: "fit-content",
            margin: 0,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            {title}
          </Typography>
        </Link>
        {description.length > 50 ? (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description.slice(0, 40)}{" "}
            <Typography component="span" variant="caption" color={red[500]}>
              {" "}
              Read more
            </Typography>
          </Typography>
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        )}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Box>
          <Chip
            label={`Prep: ${prepTime} Mins`}
            variant="outlined"
            sx={{ textTransform: "capitalize", margin: 0.5 }}
          />
          <Chip
            label={`Cook: ${cookTime} Mins`}
            variant="outlined"
            sx={{ textTransform: "capitalize", margin: 0.5 }}
          />
        </Box>
        <Box className="tooltip">
          <IconButton aria-label="link" onClick={() => handleLinkCopy()}>
            <LinkRoundedIcon />
          </IconButton>
          <span class="tooltiptext">Copy link of {title} recipe</span>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
