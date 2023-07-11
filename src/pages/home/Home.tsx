import React, { useEffect, useState } from "react";
import Foodter from "../../components/foodter";
import Navbar from "../../components/navbar";
import { Grid } from "@mui/material";
import ClothesCard from "../../components/clothesCard";
import SliderCarosel from "../../components/sliderCarosel";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
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

  return (
    <div>
      <Navbar />
      {/*<SliderCarosel />*/}
      <Grid container padding={"0 25px 25px"}>
        {data.map((item, index) => (
          <Grid item xs={3} md={3} lg={3} onClick={() => console.log("dcm vl", item)}>
            <ClothesCard
              item={item}
              key={index}
              handleViewDetail={() => {
                console.log("vcl", item);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Foodter />
    </div>
  );
}
