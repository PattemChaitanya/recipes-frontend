import { AppBar, Toolbar } from "@mui/material";
import React from "react";

const Navbar = () => {
  return (
    <AppBar color="secondary">
      <Toolbar disableGutters>
        <h1>My App</h1>
        <a href="/">Home</a>
        <a href="/recipe">Recipe</a>
        <a href="/search">Search</a>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
