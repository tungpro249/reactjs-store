import React from "react";
import { Card, CardContent, CardMedia } from "@mui/material";
import { typeCategory } from "../../types/typeCategory";
import Typography from "@mui/material/Typography";

const CategoryCard = ({
  category,
  height,
  ...props
}: {
  category: typeCategory;
  height: number | string;
  props?: any;
}) => (
  <Card style={{ margin: "10px", outline: "none" }}>
    <CardMedia
      component="img"
      height={height}
      width={200}
      image={`http://localhost:1000/${category.image}`}
      alt={category.name}
      style={{ marginRight: "10px" }}
    />
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h6">{category.name}</Typography>
    </CardContent>
  </Card>
);

export default CategoryCard;
