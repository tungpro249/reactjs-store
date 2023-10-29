import { Box, Button, Card, CardActions, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { addToCart, GET_ALL_CATEGORIES, GET_ALL_PRODUCT_API } from "../../../constants/api";
import { typeCategory } from "../../../types/typeCategory";
import { useLocation, useNavigate } from "react-router-dom";
import { typeProduct } from "../../../types/typeProduct";
import ClothesCard from "../../../components/clothesCard";
import { getAllProductSuccess, useProductController } from "../../../contexts/productContext";
import { useAppController } from "../../../contexts/app";

const Collections = () => {
  const [categories, setCategories] = useState<Array<typeCategory>>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  //@ts-ignore
  const [, productDispatch] = useProductController();

  // @ts-ignore
  const [userController, userDispatch] = useAppController();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = GET_ALL_PRODUCT_API;
        if (categoryId) {
          url += `?category=${categoryId}`;
        }
        const getAllProduct = await axios.get(url);
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

  const location = useLocation();
  const renderName = () => {
    const selectedCategory = categories.find((category) => category.id === categoryId);
    if (selectedCategory) {
      return selectedCategory.name.toUpperCase();
    }
    switch (location.pathname) {
      case "/collections/san-pham-moi": {
        return "Sản phẩm mới";
      }
      case "/collections/sale": {
        return "Sale";
      }
      default:
        return null;
    }
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleProductClick = (product: typeProduct) => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (id: number) => {
    const userId = userController?.user?.currentUser?.data.id;
    if (userId) {
      try {
        const response = await axios.post(addToCart(userId), {
          productId: id,
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
  };

  const handleBuy = async (item: typeProduct) => {
    const isLoggedIn = userController.isLogin;

    if (isLoggedIn) {
      const userId = userController?.user?.currentUser?.data.id;
      if (userId) {
        try {
          const response = await axios.post(addToCart(userId), {
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
  };

  const handleCategoryClick = (categoryId: number) => {
    setCategoryId(categoryId);
  };

  const filteredProducts = categoryId
    ? products.filter((product: typeProduct) => product.category.id === categoryId)
    : products;

  return (
    <>
      <Grid container p={5}>
        <Grid item xs={3} md={2}>
          {/*@ts-ignore*/}
          <h3 onClick={() => handleCategoryClick()}>Danh mục</h3>
          {categories.map((item) => (
            <Box
              key={item.id}
              onClick={() => handleCategoryClick(item.id)}
              className={categoryId === item.id ? "selected-category" : ""}
              style={{ padding: "5px", width: "70%" }}
            >
              {item.name}
            </Box>
          ))}
        </Grid>
        <Grid item xs={9} md={10}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{renderName()}</h3>
            <Box sx={{ display: "flex" }}>
              <p>Kích cỡ</p>
              <Box sx={{ padding: "0 10px" }} />
              <p>Giá cả</p>
            </Box>
          </Box>
          <Grid container pt={3}>
            {filteredProducts.map((item: typeProduct, index) => (
              <Grid xs={3} md={3} lg={3} key={index}>
                <Card style={{ padding: "25px", margin: "10px" }}>
                  <Box onClick={() => handleProductClick(item)}>
                    <ClothesCard item={item} />
                  </Box>
                  <CardActions>
                    <Button
                      style={{
                        background: "#e11467de",
                        padding: "9px",
                        fontWeight: "bold",
                        color: "aliceblue",
                      }}
                      onClick={() => handleBuy(item)}
                    >
                      Mua
                    </Button>
                    <Button
                      style={{
                        background: "rgb(45 155 236)",
                        padding: "9px",
                        fontWeight: "bold",
                        color: "aliceblue",
                      }}
                      onClick={() => {
                        handleAddToCart(item?.id);
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Collections;
