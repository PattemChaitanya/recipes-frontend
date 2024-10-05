import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchModal } from "../app/slices/recipesSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  minHeight: 300,
  maxWidth: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.allRecipes);
  const allRecipeNames = data && data.map((item) => item.title.toLowerCase());
  const open = useSelector((state) => state.recipes.open);
  const [searchText, setSearchText] = useState("");

  const handleClose = () => {
    setSearchText("");
    dispatch(handleSearchModal());
  };

  const handleNavigation = (recipeSelected) => {
    const selectedRecipe = data.find(
      (item) => item.title.toLowerCase() === recipeSelected.toLowerCase()
    );
    handleClose();
    navigate(`/recipe/${selectedRecipe.id}`);
  };

  const filteredItems = allRecipeNames?.filter((item) => {
    const lowerCaseItem = item.toLowerCase();
    const lowerCaseSearch = searchText.toLowerCase();

    let lastMatchIndex = -1;
    for (let i = 0; i < lowerCaseSearch.length; i++) {
      const char = lowerCaseSearch[i];
      lastMatchIndex = lowerCaseItem.indexOf(char, lastMatchIndex + 1);
      if (lastMatchIndex === -1) return false;
    }

    return true;
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          placeholder="Search Recipes"
          size="small"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
          margin="normal"
        />
        <List>
          {searchText.length > 2 &&
            filteredItems.map((item, index) => (
              <ListItem key={index} onClick={() => handleNavigation(item)}>
                <ListItemText
                  primary={item}
                  sx={{ textTransform: "capitalize" }}
                />
              </ListItem>
            ))}
        </List>
      </Box>
    </Modal>
  );
};

export default SearchPage;
