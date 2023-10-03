import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { GET_ALL_PRODUCT_API } from "../../constants/api";
import { Box, Grid } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { typeProduct } from "../../types/typeProduct";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ALL_PRODUCT_API);
        if (response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const deleteProduct = (productId: number) => {
    console.log(productId);
  };

  const editProduct = (productId: number) => {
    console.log(productId);
  };

  return (
    <>
      <Toolbar />
      <Grid container spacing={2} pt={5}>
        <Grid item xs={12}>
          <TableContainer>
            <Table style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                    Tên sản phẩm
                  </TableCell>
                  <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>Mô tả</TableCell>
                  <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>Danh mục</TableCell>
                  <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>Số lượng</TableCell>
                  <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>Hình ảnh</TableCell>
                  <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>Giá tiền</TableCell>
                  <TableCell align="left" style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.length > 0 ? (
                  products.map((product: typeProduct, key) => (
                    <TableRow key={key}>
                      <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                        {product.name}
                      </TableCell>
                      <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                        {product.description}
                      </TableCell>
                      <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                        {product.category?.name}
                      </TableCell>
                      <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                        {product.quantity}
                      </TableCell>
                      <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: "100px", height: "auto" }}
                        />
                      </TableCell>
                      <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                        {product.price}
                      </TableCell>
                      <TableCell align="left" style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                        <IconButton
                          onClick={() => deleteProduct(product.id)}
                          aria-label="delete"
                          color="error"
                        >
                          Here's the continuation of the code: ```jsx
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => editProduct(product.id)}
                          aria-label="edit"
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} style={{ textAlign: "center" }}>
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}