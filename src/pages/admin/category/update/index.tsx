import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { updateCategory } from "../../../../constants/api";
import { CATEGORY_NAME_IS_EMPTY } from "../../../../constants/message";

const UpdateCategory = ({
  handleClose,
  categoryId,
}: {
  handleClose: Function;
  categoryId: number | null;
}) => {
  const [name, setName] = useState<string>("");
  const [errorCategoryName, setErrorCategoryName] = useState("");

  const isValid = () => {
    let check = true;
    if (name.trim() === "") {
      check = false;
      setErrorCategoryName(CATEGORY_NAME_IS_EMPTY);
    } else {
      setErrorCategoryName("");
    }
    return check;
  };

  const handleUpdate = async () => {
    if (categoryId && isValid()) {
      try {
        const response = await axios.put(updateCategory(categoryId), { name });
        alert("Thêm thành công");
        window.location.reload();
      } catch (error) {
        console.log("Error deleting data:", error);
      }
    }
  };

  return (
    <Box
      style={{
        background: "white",
        margin: "30vh auto",
        textAlign: "center",
        padding: "50px",
        width: "400px",
        borderRadius: "10px",
      }}
    >
      <h3>Sửa</h3>
      <br />
      <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        <label>Tên danh muc</label>
        <TextField
          placeholder={"Tên danh mục"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText={errorCategoryName}
          error={!!errorCategoryName}
        />
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => handleUpdate()}
        >
          Xác nhận
        </Button>
        <Box sx={{ padding: "0 30px" }} />
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color={"error"}
          onClick={() => {
            handleClose();
          }}
        >
          Quay lại
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateCategory;
