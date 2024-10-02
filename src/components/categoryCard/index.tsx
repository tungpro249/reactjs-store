import React from "react";
import { Card, CardContent, CardMedia } from "@mui/material";
import { typeCategory } from "../../types/typeCategory";
import Typography from "@mui/material/Typography";

const CategoryCard = ({ category }: { category: typeCategory }) => (
  <Card>
    <CardMedia component="img" height="250" image={category.image} alt={category.name} />
    <CardContent sx={{ textAlign: "center" }}>
      <Typography variant="h6">{category.name}</Typography>
    </CardContent>
  </Card>
);

export default CategoryCard;
