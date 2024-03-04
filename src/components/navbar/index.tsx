import React, { useEffect, useState } from "react";
import { useAppController } from "../../contexts/app";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
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

import { AccountCircle, ExitToApp, Person } from "@mui/icons-material";

const links = [
  { href: "/collections/san-pham-moi", label: "Sản phẩm mới" },
  { href: "/blog", label: "Blog" },
  { href: "/collections/sale", label: "Sale" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const [name, setName] = useState(null);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  // @ts-ignore
  const [userController] = useAppController();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      setName(parsedUser.currentUser.data);
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAvatarClick = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.reload();
  };

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
      <AppBar position="static" style={{ background: "#fff", padding: "0 20px" }}>
        <Toolbar disableGutters>
          <Link href="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Frenzy
            </IconButton>
          </Link>

          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 0.6 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {links.map((link) => (
                <MenuItem key={link.label} onClick={handleCloseNavMenu}>
                  <Link href={link.href} sx={{ color: "black", textDecoration: "none" }}>
                    <Typography textAlign="center">{link.label}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box>
            <Link href="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" } }} />
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Frenzy
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {links.map((link) => (
              <Link
                href={link.href}
                sx={{ mr: 2, display: "block", color: "black", textDecoration: "none" }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          <Box>
            {user !== null ? (
              <>
                <Box
                  style={{ display: "flex", alignItems: "center", marginRight: 0 }}
                  onClick={handleAvatarClick}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Box pr={1} />
                  <span style={{ color: "#000" }}>
                    {/*@ts-ignore*/}
                    {name?.last_name} {name?.first_name}
                  </span>
                </Box>

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
                  sx={{ top: "64px" }}
                >
                  <MenuList>
                    <MenuItem onClick={handleMenuClose}>
                      <Link
                        href={"/account/information"}
                        style={{ textDecoration: "none", display: "flex", color: "inherit" }}
                      >
                        <ListItemIcon>
                          <Person />
                        </ListItemIcon>
                        <ListItemText primary="Tài khoản của tôi" />
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <Link
                        href={"/account/my-order"}
                        style={{ textDecoration: "none", display: "flex", color: "inherit" }}
                      >
                        <ListItemIcon>
                          <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Đơn hàng" />
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <Link
                        href={"/account/change-password"}
                        style={{ textDecoration: "none", display: "flex", color: "inherit" }}
                      >
                        <ListItemIcon>
                          <AccountCircle />
                        </ListItemIcon>
                        <ListItemText primary="Thay đổi mật khẩu" />
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText primary="Đăng xuất" />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Link href="/account/login" sx={{ color: "black", textDecoration: "none" }}>
                Đăng nhập
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;