import { Box, Button } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const SidePath = ({ handdleAdd }: { handdleAdd: Function }) => {
  const location = useLocation();
  const renderName = () => {
    switch (location.pathname) {
      case "/product": {
        return "Quản lý sản phẩm";
      }
      case "/order": {
        return "Quản lý đơn hàng";
      }
      case "/category": {
        return "Quản lý danh mục";
      }
      default:
        return null;
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 10px",
        background: "darkgray",
        borderRadius: "10px",
        marginTop: "5px",
      }}
    >
      <p>{renderName()}</p>
      <Button onClick={() => handdleAdd()}>Thêm mới</Button>
    </Box>
  );
};

export default SidePath;
