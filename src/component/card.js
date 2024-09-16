import Box from "@mui/material/Box";
import "./card.css";
import {
  Button,
  Container,
  Rating,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const RecipeCard = ({ id, title, description, image, cookTime, prepTime }) => {
  return (
    <Container sx={{ width: { sm: "100%", md: "40%" }, padding: 0 }}>
      <Stack component={"article"} className="recipe">
        <Box component={"div"} className="pizza-box">
          <img src={image} width="1500" height="1368" alt="" />
        </Box>
        <Box component={"div"} className="recipe-content">
          <Link to={`/recipe/${id}`}>
            <Typography
              sx={{ fontSize: "26px !important" }}
              className="recipe-title"
              color="primary"
            >
              {title}
            </Typography>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Rating name="read-only" value={4} readOnly />
            <Typography component="span" sx={{ ml: 1 }}>
              (12 votes)
            </Typography>
          </Box>

          <Typography sx={{ fontSize: "20px !important" }}>
            {description}
          </Typography>
          <Typography
            sx={{ fontSize: "16px !important" }}
            color="text.secondary"
          >
            Prep Time: {prepTime} mins | Cook Time: {cookTime} mins
          </Typography>

          <Button
            startIcon={
              <SvgIcon>
                <path
                  d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"
                  fill="currentColor"
                />
              </SvgIcon>
            }
            // variant="outlined"
            color="primary"
            p={0}
            size="small"
          >
            Save
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default RecipeCard;
