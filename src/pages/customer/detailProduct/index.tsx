import React, { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getProductDetail } from "../../../constants/api";
import { typeProduct } from "../../../types/typeProduct";
import Box from "@mui/material/Box";
import ReactImageMagnify from "react-image-magnify";

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

  const imageProps = {
    smallImage: {
      alt: productDetail?.name,
      isFluidWidth: true,
      src: productDetail?.image,
    },
    largeImage: {
      src: productDetail?.image,
      width: 550,
      height: 800,
    },
    enlargedImageContainerStyle: { background: "#fff", zIndex: 9 },
  };

  return (
    <Grid container>
      {productDetail && (
        <Box style={{ display: "flex" }}>
          <Grid item xs={6} md={6} px={2}>
            <ReactImageMagnify {...imageProps} isActivatedOnTouch />
          </Grid>
          <Grid item xs={6} md={6}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {productDetail.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {productDetail.description}
              </Typography>
              <Typography variant="h6" color="secondary" component="p">
                {productDetail.price}đ
              </Typography>
            </CardContent>

            <CardActions>
              <Button size="small" color="primary">
                Mua
              </Button>
              <Button size="small" color="secondary">
                Thêm vào giỏ hàng
              </Button>
            </CardActions>
          </Grid>
        </Box>
      )}
    </Grid>
  );
};

export default DetailProduct;
