import React from "react";
import Foodter from "../../components/foodter";
import Navbar from "../../components/navbar";
import { Grid } from "@mui/material";
import ClothesCard from "../../components/clothesCard";
import SliderCarosel from "../../components/sliderCarosel";

export default function Home() {
  return (
    <div>
      <Navbar />
      <SliderCarosel />
      <Grid container padding={"0 25px 25px"}>
        <Grid item xs={3} md={3} lg={3}>
          <ClothesCard />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <ClothesCard />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <ClothesCard />
        </Grid>
        <Grid item xs={3} md={3} lg={3}>
          <ClothesCard />
        </Grid>
      </Grid>
      <Foodter />
    </div>
  );
}
