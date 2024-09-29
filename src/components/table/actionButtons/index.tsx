import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// ActionButtons component
const ActionButtons = ({ item, handleEdit, handleDelete }: any) => {
  return (
    <>
      <IconButton onClick={() => handleEdit(item)} aria-label="edit" color="primary">
        <EditIcon />
        <p style={{ fontSize: "13px", paddingLeft: "5px" }}>Sửa</p>
      </IconButton>
      <IconButton
        onClick={() => handleDelete(item.id)}
        aria-label="delete"
        color="error"
        style={{ display: window.location.pathname === "/order" ? "none" : "" }}
      >
        <DeleteIcon />
        <p style={{ fontSize: "13px", paddingLeft: "5px" }}>Xóa</p>
      </IconButton>
    </>
  );
};

export default ActionButtons;
