import React, { useState, useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchModal } from "../app/slices/recipesSlice";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  maxWidth: "80%",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  overflow: "auto",
};

// Custom component for highlighted text
const HighlightedText = ({ text, searchTerm }) => {
  if (!text || !searchTerm || searchTerm.length < 1) {
    return <span style={{ textTransform: "capitalize" }}>{text}</span>;
  }

  const lowerText = text.toLowerCase();
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  // Find only the first consecutive match
  let firstMatch = null;
  
  for (let i = 0; i < lowerText.length; i++) {
    // Try to find a match starting at position i
    let matchFound = true;
    for (let j = 0; j < lowerSearchTerm.length; j++) {
      if (i + j >= lowerText.length || lowerText[i + j] !== lowerSearchTerm[j]) {
        matchFound = false;
        break;
      }
    }
    
    if (matchFound) {
      firstMatch = {
        start: i,
        end: i + lowerSearchTerm.length - 1
      };
      break; // Stop after finding the first match
    }
  }
  
  // If no exact consecutive match found
  if (!firstMatch) {
    return <span style={{ textTransform: "capitalize" }}>{text}</span>;
  }
  
  // Create the highlighted text with only the first match
  const result = [];
  
  // Add the text before the match
  if (firstMatch.start > 0) {
    result.push(
      <span key="pre">
        {text.substring(0, firstMatch.start)}
      </span>
    );
  }
  
  // Add the highlighted match
  result.push(
    <span key="highlight" style={{ color: '#1976d2', fontWeight: 'bold' }}>
      {text.substring(firstMatch.start, firstMatch.end + 1)}
    </span>
  );
  
  // Add any remaining text
  if (firstMatch.end + 1 < text.length) {
    result.push(
      <span key="post">
        {text.substring(firstMatch.end + 1)}
      </span>
    );
  }
  
  return <span style={{ textTransform: "capitalize" }}>{result}</span>;
};

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, error } = useSelector((state) => state.allRecipes);
  const open = useSelector((state) => state.recipes.open);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Safely extract recipe titles, handling undefined/null data
  const allRecipeData = data && Array.isArray(data) 
    ? data.filter(item => item?.title)
    : [];
    
  // Update search results when data or searchText changes
  useEffect(() => {
    if (!searchText || searchText.length < 2) {
      setSearchResults([]);
      return;
    }
    
    const lowerSearchText = searchText.toLowerCase();
    
    const filtered = allRecipeData.filter(recipe => {
      const title = recipe.title.toLowerCase();
      
      // Check for consecutive letters matching
      for (let i = 0; i <= title.length - lowerSearchText.length; i++) {
        let matches = true;
        for (let j = 0; j < lowerSearchText.length; j++) {
          if (title[i + j] !== lowerSearchText[j]) {
            matches = false;
            break;
          }
        }
        if (matches) return true;
      }
      
      return false;
    });
    
    setSearchResults(filtered);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const handleClose = () => {
    setSearchText("");
    setSearchResults([]);
    dispatch(handleSearchModal());
  };

  const handleNavigation = (recipeId) => {
    if (recipeId) {
      handleClose();
      navigate(`/recipe/${recipeId}`);
    }
  };

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
          sx={{
            position: "sticky",
            top: "-0.5px",
            zIndex: 10,
            background: "#fff",
            p: "20px 24px",
            m: 0,
            boxShadow: 2,
          }}
        />
        <List sx={{ p: 0 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <CircularProgress color="secondary" />
            </Box>
          ) : error ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <Typography color="error">Error loading recipes</Typography>
            </Box>
          ) : searchText.length > 1 && searchResults.length === 0 ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
              <Typography>No recipes found</Typography>
            </Box>
          ) : (
            searchResults.map((recipe, index) => (
              <ListItem
                key={index}
                onClick={() => handleNavigation(recipe.id)}
                sx={{ 
                  borderBottom: "1px solid #cecece",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)"
                  }
                }}
              >
                <ListItemText
                  primary={
                    <HighlightedText 
                      text={recipe.title} 
                      searchTerm={searchText}
                    />
                  }
                />
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Modal>
  );
};

export default SearchPage;
