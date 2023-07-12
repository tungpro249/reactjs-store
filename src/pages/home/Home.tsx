import React, { useEffect, useState } from "react";
import Foodter from "../../components/foodter";
import Navbar from "../../components/navbar";
import { Grid } from "@mui/material";
import ClothesCard from "../../components/clothesCard";
import SliderCarosel from "../../components/sliderCarosel";
import axios from "axios";
import DetailProduct from "../detailProduct";
import { typeProduct } from "../../types/typeProduct";

export default function Home() {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState<typeProduct | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllProduct = await axios.get("http://localhost:8000/api/products/get-products");
        setData(getAllProduct.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleProductClick = (product: typeProduct) => {
    console.log("huhu", product);
    setSelectedProduct(product);
    setShowDetail(true);
  };

  return (
    <div>
      <Navbar />
      {/*<SliderCarosel />*/}
      <Grid container padding={"0 25px 25px"}>
        {data.map((item, index) => (
          <Grid xs={3} md={3} lg={3} onClick={() => handleProductClick(item)}>
            <ClothesCard item={item} />
          </Grid>
        ))}
      </Grid>
      {showDetail && selectedProduct && (
        <DetailProduct
          name={selectedProduct.name}
          description={selectedProduct.description}
          image={selectedProduct.image}
          price={selectedProduct.price}
        />
      )}
      <Foodter />
    </div>
  );
}