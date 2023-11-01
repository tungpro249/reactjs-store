import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ADD_CATEGORY_API,
  deleteCategory,
  GET_ALL_CATEGORIES,
  updateCategory,
} from "../../../constants/api";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TableForm from "../../../components/table";
import SidePath from "../../../components/sidePath";
import { ADD_TYPE, DELETE_TYPE, UPDATE_TYPE } from "../../../constants/app";
import AddCategory from "./add";
import UpdateCategory from "./update";
import { typeCategory } from "../../../types/typeCategory";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [category, setCategory] = useState<typeCategory | null>(null);

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
    setType(DELETE_TYPE);
    setOpen(true);
    setCategoryId(categoryId);
  };

  const handleEditCategory = (category: typeCategory) => {
    setType(UPDATE_TYPE);
    setOpen(true);
    setCategoryId(category.id);
    setCategory(category);
  };

  const handleAddCategory = () => {
    setType(ADD_TYPE);
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

  const formAdd = (closeForm: Function) => <AddCategory handleClose={closeForm} />;
  const formUpdate = (closeForm: Function) => (
    // @ts-ignore
    <UpdateCategory handleClose={closeForm} categoryId={categoryId} category={category} />
  );
  const formDelete = (closeForm: Function) => (
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
      <h3>Bạn có muốn xóa</h3>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button type="button" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleDelete}>
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

  const handleClose = () => {
    setOpen(false);
  };

  const [type, setType] = useState("");

  const showModalContent = () => {
    if (type === ADD_TYPE) return formAdd(handleClose);
    if (type === UPDATE_TYPE) return formUpdate(handleClose);
    if (type === DELETE_TYPE) return formDelete(handleClose);
    return <div />;
  };

  const columns = [{ header: "Tên sản phẩm", field: "name" }];

  return (
    <>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} pr={2}>
          <SidePath handdleAdd={handleAddCategory} showButton />
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