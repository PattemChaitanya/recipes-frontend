import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({ isLoading }) => {
  return (
    <Backdrop
      sx={(theme) => ({
        color: "#fff",
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "transparent",
        height: "50vh",
      })}
      open={isLoading}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
};

export default Loader;
