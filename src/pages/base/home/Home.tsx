import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import ClothesCard from "../../../components/clothesCard";
import axios from "axios";
import { typeProduct } from "../../../types/typeProduct";
import { Link, useNavigate } from "react-router-dom";
import { getAllProductSuccess, useProductController } from "../../../contexts/productContext";
import { addToCart, GET_ALL_PRODUCT_API } from "../../../constants/api";
import SliderCarosel from "../../../components/slider/sliderCarosel";
import { useAppController } from "../../../contexts/app";
import FormCardComponent from "../../../components/form/productActionCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  // @ts-ignore
  const [, productDispatch] = useProductController();

  // @ts-ignore
  const [userController] = useAppController();

  useEffect(() => {
    fetchData();
  }, [userController]);

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

  const handleProductClick = (product: typeProduct) => {
    navigate(`/product/${product.id}`);
  };

  const handleBuy = async (item: typeProduct) => {
    if (item.quantity > 0) {
      const isLoggedIn = userController.isLogin;

      if (isLoggedIn) {
        const userId = userController?.user?.currentUser?.data.id;
        if (userId) {
          try {
            await axios.post(addToCart(userId), {
              productId: item.id,
              quantity: 1,
            });
          } catch (error) {
            console.error(error);
            alert("Đã xảy ra lỗi khi thêm vào giỏ hàng!");
          }
        }
        navigate("/cart");
      } else {
        localStorage.setItem("cart", JSON.stringify({ cart: item }));
        navigate("/checkout-form");
      }
    } else {
      alert("Sản phẩm đang hết hàng");
    }
  };

  const handleAddToCart = async (item: typeProduct) => {
    if (item.quantity > 0) {
      const isLoggedIn = userController.isLogin;

      if (isLoggedIn) {
        const userId = userController?.user?.currentUser?.data.id;
        if (userId) {
          try {
            const response = await axios.post(addToCart(userId), {
              productId: item.id,
              quantity: 1,
            });
            if (response.status === 200) {
              alert("Sản phẩm đã được thêm vào giỏ hàng!");
            }
          } catch (error) {
            console.error(error);
            alert("Đã xảy ra lỗi khi thêm vào giỏ hàng!");
          }
        }
      } else {
        localStorage.setItem("cart", JSON.stringify({ cart: item }));
      }
    } else {
      alert("Sản phẩm đang hết hàng");
    }
  };

  const images = [
    "https://theme.hstatic.net/200000690725/1001078549/14/slide_1_img.jpg?v=202",
    "https://360.com.vn/wp-content/uploads/2023/11/BANNER-WEB-1350X490.jpg",
    "https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img4.jpg?v=840",
  ];

  return (
    <div>
      <SliderCarosel images={images} />
      <Box pt={4} />
      <h1 style={{ textAlign: "center" }}>
        <Link to={"/collections/san-pham-moi"} style={{ textDecoration: "none", color: "inherit" }}>
          Sản phẩm mới
        </Link>
      </h1>
      <Grid container padding={"0 25px 25px"}>
        {products.map((item: typeProduct, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <FormCardComponent
              handleClickBuyItem={() => handleBuy(item)}
              handleAddToCard={() => handleAddToCart(item)}
            >
              <Box onClick={() => handleProductClick(item)}>
                <ClothesCard item={item} />
              </Box>
            </FormCardComponent>
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
