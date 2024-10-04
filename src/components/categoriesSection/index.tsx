import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { typeCategory } from "../../types/typeCategory";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CategoryCard from "../categoryCard";

const CategoriesSection = ({ categories }: { categories: typeCategory }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  console.log("category", categories);
  return (
    <Box sx={{ mb: 8 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
      >
        Shop by Category
      </Typography>
      <Slider {...settings}>
        {categories
          ? categories.map((category) => <CategoryCard key={category.title} category={category} />)
          : []}
      </Slider>
    </Box>
  );
};

export default CategoriesSection;
