import React, { useState, useEffect } from "react";
import axios from "axios";
import { ADD_CATEGORY_API, deleteCategory, GET_ALL_CATEGORIES } from "../../../constants/api";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TableForm from "../../../components/table";
import SidePath from "../../../components/sidePath";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ALL_CATEGORIES);
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  const handleDeleteCategory = (categoryId: number) => {
    setType("DELETE");
    setOpen(true);
    setCategoryId(categoryId);
  };

  const handleEditCategory = (categoryId: number) => {
    setType("UPDATE");
    setOpen(true);
    setCategoryId(categoryId);
  };

  const handleAddCategory = () => {
    setType("ADD");
    setOpen(true);
  };

  const handleDelete = async () => {
    if (categoryId) {
      try {
        const response = await axios.delete(deleteCategory(categoryId));
        alert("Xóa thành công");
        window.location.reload();
      } catch (error) {
        console.log("Error deleting data:", error);
      }
    }
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(ADD_CATEGORY_API, { name });
      alert("Thêm thành công");
      window.location.reload();
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const formAdd = (closeForm: Function) => (
    <Box
      style={{
        background: "white",
        margin: "auto",
        width: "400px",
        height: "300px",
        textAlign: "center",
      }}
    >
      <h3>Thêm mới</h3>
      <TextField
        placeholder={"Tên danh muc"}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box>
        <Button onClick={handleAdd}>Thêm</Button>
        <Button onClick={() => handleClose()}>Hủy</Button>
      </Box>
    </Box>
  );
  const formUpdate = (closeForm: Function) => <Box>San pham co id la</Box>;
  const formDelete = (closeForm: Function) => (
    <Box
      style={{
        background: "white",
        margin: "auto",
        width: "400px",
        height: "300px",
        textAlign: "center",
      }}
    >
      <h3>Bạn có muốn xóa</h3>
      <Box>
        <Button onClick={handleDelete}>Xóa</Button>
        <Button onClick={() => handleClose()}>Hủy</Button>
      </Box>
    </Box>
  );

  const handleClose = () => {
    setOpen(false);
  };

  const [type, setType] = useState("");

  const showModalContent = () => {
    if (type === "ADD") return formAdd(handleClose);
    if (type === "UPDATE") return formUpdate(handleClose);
    if (type === "DELETE") return formDelete(handleClose);
    return <div />;
  };

  const columns = [{ header: "Tên sản phẩm", field: "name" }];

  return (
    <>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} pr={2}>
          <SidePath handdleAdd={handleAddCategory} />
          <Box pt={5}>
            <TableForm
              columns={columns}
              data={categories}
              handleDelete={handleDeleteCategory}
              handleEdit={handleEditCategory}
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {showModalContent()}
      </Modal>
    </>
  );
};

export default Category;