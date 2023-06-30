import React from "react";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "@mui/material/Link";

const Navbar = () => {
  const links = [
    { href: "/collections/san-pham-moi", label: "Sản phẩm mới" },
    { href: "/blog", label: "Blog" },
    { href: "/collections/sale", label: "Sale" },
  ];

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
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          {links.map((link) => (
            <Typography key={link.href} variant="h6" component="div" pr={2}>
              <Link href={link.href} sx={{ color: "black", textDecoration: "none" }}>
                {link.label}
              </Link>
            </Typography>
          ))}
        </Box>
        <Link href="/account/login" sx={{ color: "black", textDecoration: "none" }}>
          Đăng nhập
        </Link>
        <Box sx={{ padding: "0 20px" }} />
        <Link href="/card" sx={{ color: "black", textDecoration: "none" }}>
          Giỏ hàng
        </Link>
      </Toolbar>
    </>
  );
};

export default Navbar;