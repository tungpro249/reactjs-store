import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteCategory, GET_ALL_CATEGORIES } from "../../constants/api";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TableForm from "../../components/table";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ALL_CATEGORIES);
        if (response.data) {
          setCategories(response.data);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);
  const deleteProduct = (productId: number) => {
    setType("DELETE");
    setOpen(true);
    setCategoryId(productId);
  };

  const editProduct = (productId: number) => {
    setType("UPDATE");
    setOpen(true);
    setCategoryId(productId);
  };
  const handleDelete = async () => {
    if (categoryId) {
      try {
        const response = await axios.delete(deleteCategory(categoryId));
        alert("Xóa thành công");
        console.log(response.data);
      } catch (error) {
        console.log("Error deleting data:", error);
      }
    }
  };

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
    if (type === "UPDATE") return formUpdate(handleClose);
    if (type === "DELETE") return formDelete(handleClose);
    return <div />;
  };

  const columns = [{ header: "Tên sản phẩm", field: "name" }];

  return (
    <>
      <Toolbar />
      <Grid container spacing={2} pt={5}>
        <Grid item xs={12} pr={2}>
          <TableForm
            columns={columns}
            data={categories}
            handleDelete={deleteProduct}
            handleEdit={editProduct}
          />
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