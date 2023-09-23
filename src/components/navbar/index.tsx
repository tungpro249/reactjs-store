import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import Link from "@mui/material/Link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AccountCircle, ExitToApp, Person } from "@mui/icons-material";
import { useAppController } from "../../contexts/app";

const Navbar = () => {
  const links = [
    { href: "/collections/san-pham-moi", label: "Sản phẩm mới" },
    { href: "/blog", label: "Blog" },
    { href: "/collections/sale", label: "Sale" },
  ];

  const [user, setUser] = useState(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAvatarClick = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  const [name, setName] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      setName(parsedUser.currentUser.data);
    }
  }, []);

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
        <p style={{ display: "flex", alignItems: "center" }}>
          <HomeIcon style={{ fontStyle: "21px", marginRight: "2px" }} />
          <span>Hệ thống showroom</span>
        </p>
        <p style={{ display: "flex", alignItems: "center" }}>
          <PhoneIcon style={{ fontStyle: "21px", marginRight: "2px" }} />
          <span>Mua hàng onlline</span>
        </p>
      </Box>
      <Toolbar>
        <Link href="/">
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            Frenzy
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
        {user !== null ? (
          <>
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              onClick={handleAvatarClick}
            />
            <span>
              {/*@ts-ignore*/}
              {name?.last_name} {name?.first_name}
            </span>
            <Menu
              open={menuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuList>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="My Account" />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Link href="/account/login" sx={{ color: "black", textDecoration: "none" }}>
            Đăng nhập
          </Link>
        )}
        <Box sx={{ padding: "0 20px" }} />
        <Link href="/cart" sx={{ color: "black", textDecoration: "none" }}>
          <ShoppingCartIcon sx={{ margin: "-2px 10px" }} />
          <span>Giỏ hàng</span>
        </Link>
      </Toolbar>
    </>
  );
};

export default Navbar;