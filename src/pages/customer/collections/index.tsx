import { Box, Button, Card, CardActions, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_CATEGORIES, GET_ALL_PRODUCT_API } from "../../../constants/api";
import { typeCategory } from "../../../types/typeCategory";
import { useLocation } from "react-router-dom";
import { typeProduct } from "../../../types/typeProduct";
import ClothesCard from "../../../components/clothesCard";
import { getAllProductSuccess, useProductController } from "../../../contexts/productContext";

const Collections = () => {
  const [categories, setCategories] = useState<Array<typeCategory>>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  //@ts-ignore
  const [productController, productDispatch] = useProductController();
  const [products, setProducts] = useState([]);

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

  const location = useLocation();
  const renderName = () => {
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

  return (
    <>
      <Grid container p={5}>
        <Grid item xs={3} md={2}>
          <h3>Danh mục</h3>
          {categories.map((item) => (
            <p>{item.name}</p>
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
            {products.map((item: typeProduct, index) => (
              <Grid xs={3} md={3} lg={3} key={index}>
                <Card style={{ padding: "25px", margin: "10px" }}>
                  <Box onClick={() => {}}>
                    <ClothesCard item={item} />
                  </Box>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => {}}>
                      Mua
                    </Button>
                    <Button size="small" color="secondary">
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
