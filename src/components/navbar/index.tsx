import React from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "@mui/material/Link";

const Navbar = () => {
  return (
    <>
      <Box
        sx={{
          background: "#000",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>
          <HomeIcon />
          Hệ thống showroom
        </p>
        <p>
          <PhoneIcon />
          Mua hàng onlline
        </p>
      </Box>
      <Toolbar>
        <Link href="/">
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            TinTin
          </IconButton>
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Link href="/account/login">Login</Link>
      </Toolbar>
    </>
  );
};
export default Navbar;