import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import ClothesCard from "../../components/clothesCard";
import axios from "axios";
import { typeProduct } from "../../types/typeProduct";
import { useNavigate } from "react-router-dom";
import { getAllProductSuccess, useProductController } from "../../contexts/productContext";
import { GET_ALL_PRODUCT_API } from "../../constants/api";

export default function Home() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  // @ts-ignore
  const [, productDispatch] = useProductController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllProduct = await axios.get(GET_ALL_PRODUCT_API);
        if (getAllProduct.data) {
          setData(getAllProduct.data);
          getAllProductSuccess(productDispatch, getAllProduct.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleProductClick = (product: typeProduct) => {
    navigate(`/product/${product.name}`);
  };

  return (
    <div>
      {/*<SliderCarosel />*/}
      <Grid container padding={"0 25px 25px"}>
        {data.map((item, index) => (
          <Grid xs={3} md={3} lg={3} onClick={() => handleProductClick(item)}>
            <ClothesCard item={item} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}