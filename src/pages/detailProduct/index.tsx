import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { typeProduct } from "../../types/typeProduct";

const DetailProduct = ({ name, image, description, price }: typeProduct) => {
  return (
    <Grid container>
      <Card>
        <CardMedia image={image} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="h6" color="secondary" component="p">
            {price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DetailProduct;
