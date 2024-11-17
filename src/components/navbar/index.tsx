import React, { useEffect, useState } from "react";
import { useAppController } from "../../contexts/app";
// @ts-ignore
import Logo from "assets/image/logo.jpg";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
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
} from "@mui/material";

import { AccountCircle, ExitToApp, Person } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MDAvatar from "../ui/MDAvatar";

const links = [
  { href: "/collections/san-pham-moi", label: "Sản phẩm mới" },
  { href: "/blog", label: "Blog" },
  { href: "/collections/sale", label: "Sale" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  // @ts-ignore
  const [userController] = useAppController();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);
      setName(parsedUser.currentUser.data);
      setAvatar(parsedUser.currentUser.data);
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {links.map((link, index) => (
          <ListItem key={link.label} disablePadding>
            <Link
              href={link.href}
              sx={{
                color: "black",
                textDecoration: "none",
                width: "100%",
                padding: "0 10px",
              }}
            >
              <ListItemText primary={link.label} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

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
            <MDAvatar alt="logo" src={Logo} size={"100px"} />
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
          </Box>
          <Box>
            <Link
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              {/*<AdbIcon sx={{ display: { xs: "flex", md: "none" } }} />*/}
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
                <Avatar alt="logo" src={Logo} />
              </IconButton>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {links.map((link) => (
              <Link
                href={link.href}
                sx={{
                  mr: 2,
                  display: "block",
                  color: "black",
                  textDecoration: "none",
                }}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          <Box>
            {user !== null ? (
              <>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 0,
                  }}
                  onClick={handleAvatarClick}
                >
                  <Avatar
                    // @ts-ignore
                    alt={`${name?.last_name} ${name?.first_name}`}
                    // @ts-ignore
                    src={`http://localhost:1000/${avatar?.avatar}`}
                    sx={{ width: 50, height: 50 }}
                  />
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
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          color: "inherit",
                        }}
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
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          color: "inherit",
                        }}
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
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          color: "inherit",
                        }}
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
