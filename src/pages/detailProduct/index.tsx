import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getProductDetail } from "../../constants/api";
import { typeProduct } from "../../types/typeProduct";

const DetailProduct = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<typeProduct>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAllProduct = await axios.get(getProductDetail(Number(id)));
        if (getAllProduct.data) {
          setProductDetail(getAllProduct.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid container>
      {productDetail && (
        <Card>
          <CardMedia
            image={productDetail.image}
            title={productDetail.name}
            component="img"
            alt={""}
            height="500"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {productDetail.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {productDetail.description}
            </Typography>
            <Typography variant="h6" color="secondary" component="p">
              {productDetail.price}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
};

export default DetailProduct;
