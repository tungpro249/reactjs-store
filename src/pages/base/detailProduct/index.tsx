import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addToCart, GET_ALL_PRODUCT_API, getProductDetail } from "../../../constants/api";
import { typeProduct } from "../../../types/typeProduct";
import Box from "@mui/material/Box";
import ReactImageMagnify from "react-image-magnify";
import ClothesCard from "../../../components/clothesCard";
import { useAppController } from "../../../contexts/app";
import { Carousel } from "react-responsive-carousel";
import { Comment } from "../../../components/comment";

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
      src: `http://localhost:1000/${productDetail?.image.replace(/\\/g, "/")}`,
    },
    largeImage: {
      src: `http://localhost:1000/${productDetail?.image.replace(/\\/g, "/")}`,
      width: 1200,
      height: 1800,
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

  const handleBuy = async (item: typeProduct) => {
    if (item.quantity > 0) {
      const isLoggedIn = userController.isLogin;

      if (isLoggedIn) {
        const userId = userController?.user?.currentUser?.data.id;
        if (userId) {
          try {
            const response = await axios.post(addToCart(userId), {
              productId: item.id,
              quantity: 1,
            });
          } catch (error) {
            console.error(error);
            alert("Đã xảy ra lỗi khi thêm vào giỏ hàng!");
          }
        }
        navigate("/cart");
      } else {
        localStorage.setItem("cart", JSON.stringify({ cart: item }));
        navigate("/checkout-form");
      }
    } else {
      alert("Sản phẩm đang hết hàng");
    }
  };

  return (
    <>
      <Grid container>
        {productDetail && (
          <Box style={{ display: "flex" }} p={5}>
            <Grid item xs={12} md={6} px={2}>
              <Box width={"100%"}>
                <ReactImageMagnify {...imageProps} isActivatedOnTouch />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {productDetail?.name.toUpperCase()}
                </Typography>
                <Typography variant="h6" color="secondary" component="p">
                  Giá tiền: {productDetail.price}đ
                </Typography>
                <Typography variant="h6" color="black" component="p">
                  Màu sắc: đen vàng đỏ
                </Typography>
                <Typography variant="h6" color="black" component="p">
                  Kích cỡ: X XL XXL
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  Sô lượng trong kho: {productDetail.quantity}
                </Typography>
                {productDetail.description !== "" && (
                  <Typography variant="body1" color="textSecondary" component="p">
                    Mô tả: {productDetail.description}
                  </Typography>
                )}
              </CardContent>

              <CardActions style={{ justifyContent: "space-around" }}>
                <Button
                  style={{
                    background: "#e11467de",
                    padding: "9px",
                    fontWeight: "bold",
                    color: "aliceblue",
                  }}
                  onClick={() => {
                    handleBuy(productDetail);
                  }}
                >
                  Mua
                </Button>
                <Button
                  style={{
                    background: "rgb(45 155 236)",
                    padding: "9px",
                    fontWeight: "bold",
                    color: "aliceblue",
                  }}
                  onClick={() => {
                    if (productDetail?.quantity > 0) {
                      handleAddToCart(productDetail?.id);
                    } else {
                      alert("Sản phẩm đang hết hàng.");
                    }
                  }}
                >
                  Thêm vào giỏ hàng
                </Button>
              </CardActions>
            </Grid>
          </Box>
        )}
      </Grid>
      <Grid
        container
        spacing={1}
        style={{ display: "grid", gridTemplateRows: "auto 12fr", paddingLeft: "50px" }}
      >
        <Grid item xs={12}>
          <Comment message={""} avatar={""} userName={"Thanh Tung"} createTime={"12-10-2023"} />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            placeholder="Bình luận của bạn"
            minRows={8}
            style={{ width: "95%", resize: "none" }}
          />
        </Grid>
      </Grid>
      <h1 style={{ paddingLeft: "50px" }}>Sản phẩm tương tự</h1>
      <Grid container padding={"50px"}>
        {show &&
          products
            .filter((item) => item.category?.id === productDetail?.category?.id)
            .map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card style={{ padding: "25px", margin: "10px" }}>
                  <Box onClick={() => handleProductClick(item)}>
                    <ClothesCard item={item} />
                  </Box>
                  <CardActions style={{ justifyContent: "space-around" }}>
                    <Button
                      style={{
                        background: "#e11467de",
                        padding: "9px",
                        fontWeight: "bold",
                        color: "aliceblue",
                      }}
                      onClick={() => handleBuy(item)}
                    >
                      Mua
                    </Button>
                    <Button
                      style={{
                        background: "rgb(45 155 236)",
                        padding: "9px",
                        fontWeight: "bold",
                        color: "aliceblue",
                      }}
                      onClick={() => {
                        if (item.quantity > 0) {
                          handleAddToCart(item?.id);
                        } else {
                          alert("Sản phẩm đang hết hàng.");
                        }
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