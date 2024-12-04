import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Link } from "react-router-dom";

interface MenuItem {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface MenuItemsListProps {
  menuItems: MenuItem[];
  menuOpen: boolean;
  handleMenuClose: () => void;
}

const MenuItemsList: React.FC<MenuItemsListProps> = ({ menuItems, menuOpen, handleMenuClose }) => {
  return (
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
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick?.();
              handleMenuClose();
            }}
          >
            {item.href ? (
              <Link
                to={item.href}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  color: "inherit",
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </Link>
            ) : (
              <>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default MenuItemsList;
