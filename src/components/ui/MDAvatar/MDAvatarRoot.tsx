import React from "react";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";

const MDAvatar = styled(Avatar)(({ theme }) => {
  return {
    width: 72,
    height: 72,
    backgroundColor: theme.palette.primary,
    color: theme.palette.mode,
    fontSize: "1.5rem",
  };
});

export default MDAvatar;