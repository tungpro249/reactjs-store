import React, { useState, useEffect } from "react";
import axios from "axios";
import { GET_ALL_CATEGORIES } from "../../constants/api";
import { Box, Grid, Modal, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TableForm from "../../components/table";

const Category = () => {
  const [categories, setCategories] = useState([]);

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
    setOpen(true);
    console.log(productId);
  };

  const editProduct = (productId: number) => {
    console.log(productId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const contentOpen = () => {
    return <div>vai lon</div>;
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
        {contentOpen()}
      </Modal>
    </>
  );
};

export default Category;