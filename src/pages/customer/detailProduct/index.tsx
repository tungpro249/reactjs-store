import React, { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addToCart, GET_ALL_PRODUCT_API, getProductDetail } from "../../../constants/api";
import { typeProduct } from "../../../types/typeProduct";
import Box from "@mui/material/Box";
import ReactImageMagnify from "react-image-magnify";
import ClothesCard from "../../../components/clothesCard";
import { useAppController } from "../../../contexts/app";

const DetailProduct = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<typeProduct>();
  const [products, setProducts] = useState<Array<typeProduct>>([]);
  const navigate = useNavigate();

  // @ts-ignore
  const [userController, userDispatch] = useAppController();

  const fetchData = async () => {
    try {
      const [productDetailResponse, productListResponse] = await Promise.all([
        axios.get(getProductDetail(Number(id))),
        axios.get(GET_ALL_PRODUCT_API),
      ]);
      if (productDetailResponse.data) {
        console.log(productDetailResponse.data);
        setProductDetail(productDetailResponse.data);
      }
      if (productListResponse.data) {
        setProducts(productListResponse.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleAddToCart = async (id: number) => {
    const userId = userController?.user?.currentUser?.data.id;
    if (userId) {
      try {
        const response = await axios.post(addToCart(userId), {
          productId: id,
          quantity: 1,
        });
        if (response.status === 200) {
          alert("Sản phẩm đã được thêm vào giỏ hàng!");
        }
      } catch (error) {
        console.error(error);
        alert("Đã xảy ra lỗi khi thêm vào giỏ hàng!");
      }
    }
  };

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
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, [products]);

  const handleProductClick = async (product: typeProduct) => {
    await navigate(`/product/${product.id}`);
  };

  return (
    <>
      <Grid container>
        {productDetail && (
          <Box style={{ display: "flex" }} p={5}>
            <Grid item xs={6} md={6} px={2}>
              <Box width={"50%"}>
                <ReactImageMagnify {...imageProps} isActivatedOnTouch />
              </Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {productDetail?.name}
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
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleAddToCart(productDetail?.id)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </CardActions>
            </Grid>
          </Box>
        )}
      </Grid>
      <h1>Sản phẩm tương tự</h1>
      <Grid container>
        {show &&
          products
            .filter((item) => item.category?.id === productDetail?.category?.id)
            .map((item) => (
              <Grid item xs={3} md={3} lg={3}>
                <Card style={{ padding: "25px", margin: "10px" }}>
                  <Box onClick={() => handleProductClick(item)}>
                    <ClothesCard item={item} />
                  </Box>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => {}}>
                      Mua
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => {
                        handleAddToCart(item?.id);
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default DetailProduct;