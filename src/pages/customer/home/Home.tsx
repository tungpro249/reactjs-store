import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardActions, Grid, Modal, Typography } from "@mui/material";
import ClothesCard from "../../../components/clothesCard";
import axios from "axios";
import { typeProduct } from "../../../types/typeProduct";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductSuccess, useProductController } from "../../../contexts/productContext";
import { addToCart, deleteProduct, GET_ALL_PRODUCT_API } from "../../../constants/api";
import SliderCarosel from "../../../components/sliderCarosel";
import { loginSuccess, useAppController } from "../../../contexts/app";

export default function Home() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  // @ts-ignore
  const [, productDispatch] = useProductController();

  // @ts-ignore
  const [userController, userDispatch] = useAppController();

  useEffect(() => {
    fetchData();
  }, [userController]);

  const [open, setOpen] = useState(false);

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

  const [productId, setProductId] = useState<number | null>(null);

  const handleProductClick = (product: typeProduct) => {
    navigate(`/product/${product.id}`);
  };

  const handleBuy = () => {
    const isLoggedIn = false;

    if (isLoggedIn) {
      alert("Mua hàng");
    } else {
      navigate("/checkout-form");
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(addToCart(2), {
        productId: productId,
        quantity: 1,
      });
      if (response.status === 200) {
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi thêm vào giỏ hàng!");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <SliderCarosel />
      <Box pt={4} />
      <h1 style={{ textAlign: "center" }}>
        <Link to={"/collections/san-pham-moi"} style={{ textDecoration: "none", color: "inherit" }}>
          Sản phẩm mới
        </Link>
      </h1>
      <Grid container padding={"0 25px 25px"}>
        {products.map((item: typeProduct, index) => (
          <Grid xs={3} md={3} lg={3} key={index}>
            <Card style={{ padding: "25px", margin: "10px" }}>
              <Box onClick={() => handleProductClick(item)}>
                <ClothesCard item={item} />
              </Box>
              <CardActions>
                <Button size="small" color="primary" onClick={handleBuy}>
                  Mua
                </Button>
                <Button size="small" color="secondary" onClick={handleAddToCart}>
                  Thêm vào giỏ hàng
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box pt={4} />
      <h1 style={{ textAlign: "center" }}>
        <Link to={"/collections/san-pham-moi"} style={{ textDecoration: "none", color: "inherit" }}>
          Sale
        </Link>
      </h1>
      <Box pt={4} />
      <h1 style={{ textAlign: "center" }}>
        <Link to={"/blog"} style={{ textDecoration: "none", color: "inherit" }}>
          Blog
        </Link>
      </h1>
      <Box pb={4} />
    </div>
  );
}