import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardActions, Grid, Modal, Typography } from "@mui/material";
import ClothesCard from "../../components/clothesCard";
import axios from "axios";
import { typeProduct } from "../../types/typeProduct";
import { useNavigate } from "react-router-dom";
import { getAllProductSuccess, useProductController } from "../../contexts/productContext";
import { deleteProduct, GET_ALL_PRODUCT_API } from "../../constants/api";
import SliderCarosel from "../../components/sliderCarosel";

export default function Home() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  // @ts-ignore
  const [, productDispatch] = useProductController();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllProduct = await axios.get(GET_ALL_PRODUCT_API);
        if (getAllProduct.data) {
          setProducts(getAllProduct.data);
          getAllProductSuccess(productDispatch, getAllProduct.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const [productId, setProductId] = useState<number | null>(null);
  const handleDeleteConfirm = async () => {
    try {
      if (productId) {
        await axios.delete(deleteProduct(productId));

        // Cập nhật danh sách sản phẩm sau khi xóa thành công
        const updatedProducts = products.filter((item: any) => item.id !== productId);
        setProducts(updatedProducts);

        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductClick = (product: typeProduct) => {
    navigate(`/product/${product.id}`);
  };

  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = storedUser && storedUser.currentUser?.data?.isAdmin;
  const checkRole = isAdmin || "";

  const handleBuy = () => {
    alert("mua hang");
  };

  const handleAddToCart = () => {
    alert("them gio hang");
  };

  const handleDeleteProduct = (id: number) => {
    setOpen(true);
    setProductId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SliderCarosel />
      <Box pt={2} />
      <h2 style={{ textAlign: "center" }}>Sản phẩm mới</h2>
      <Grid container padding={"0 25px 25px"}>
        {products.map((item: typeProduct, index) => (
          <Grid xs={3} md={3} lg={3}>
            <Card style={{ padding: "25px", margin: "10px" }}>
              <Box onClick={() => handleProductClick(item)}>
                <ClothesCard item={item} />
              </Box>
              {!checkRole ? (
                <CardActions>
                  <Button size="small" color="primary" onClick={handleBuy}>
                    Mua
                  </Button>
                  <Button size="small" color="secondary">
                    Thêm vào giỏ hàng
                  </Button>
                </CardActions>
              ) : (
                <CardActions>
                  <Button size="small" color="primary">
                    Sửa
                  </Button>
                  {/*@ts-ignore*/}
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    Xóa
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{ background: "white", width: "400px", margin: "auto", textAlign: "center" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Bạn có chắc chắn muốn xóa
          </Typography>
          <Button onClick={handleDeleteConfirm}>ok</Button>
          <Button>cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}