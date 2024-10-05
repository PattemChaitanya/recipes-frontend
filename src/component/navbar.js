import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import logo from "../assets/logo-white.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Link, useNavigate } from "react-router-dom";
import { handleSearchModal } from "../app/slices/recipesSlice";
import { useDispatch } from "react-redux";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const Navbar = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 500);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const listOptions = [
    { name: "All Recipes", location: "recipes" },
    { name: "Search", location: "search" },
  ];

  const toggleDrawer = (newOpen) => () => {
    setIsDrawerOpen(newOpen);
  };

  const handleNavigation = (location) => {
    if (location !== "search") {
      navigate(location);
    } else {
      dispatch(handleSearchModal());
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AppBar color="secondary">
      <Toolbar
        disableGutters
        sx={{
          height: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "16px",
        }}
      >
        <Link to="/" style={{ padding: 0, margin: "auto 0" }}>
          <img
            src={logo}
            alt="Chey's Diary"
            style={{
              width: !isMobileView ? "200px" : "130px",
              height: !isMobileView ? "60px" : "40px",
              marginTop: 10,
            }}
          />
        </Link>
        {!isMobileView ? (
          <Stack direction="row" gap="10px" alignItems="center">
            <Typography
              variant="body2"
              sx={{ cursor: "pointer" }}
              onClick={() => handleNavigation("recipes")}
            >
              All Recipes
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                border: "1px solid #cecece",
                paddingRight: "48px",
                borderRadius: "8px",
                fontSize: "16px !important",
                display: "inline-flex",
                alignItems: "center",
              }}
              onClick={() => handleNavigation("search")}
            >
              <IconButton sx={{ color: "#fff" }}>
                <SearchRoundedIcon />
              </IconButton>
              Search
            </Typography>
          </Stack>
        ) : (
          <IconButton
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            sx={{ color: "#fff", transition: "1s ease-in-ease-out" }}
          >
            {!isDrawerOpen ? <MenuRoundedIcon /> : <CloseRoundedIcon />}
          </IconButton>
        )}
        {isMobileView && (
          <Drawer
            anchor="top"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
              zIndex: 10,
              ".MuiBackdrop-root": {
                ".MuiModal-backdrop": {
                  backgroundColor: "rgba(0, 0, 0, 0)",
                },
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                marginTop: "60px",
              }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>
                {listOptions.map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => handleNavigation(text.location)}
                      sx={
                        index % 2 === 0
                          ? { paddingBottom: 0 }
                          : { paddingTop: 0 }
                      }
                    >
                      <ListItemText primary={text.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
