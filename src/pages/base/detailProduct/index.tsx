import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addToCart, GET_ALL_PRODUCT_API, getProductDetail } from "../../../common/constants/api";
import { typeProduct } from "../../../types/typeProduct";
import Box from "@mui/material/Box";
import ReactImageMagnify from "react-image-magnify";
import { useAppController } from "../../../contexts/app";
import SimilarProducts from "../SimilarProduct";

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

              {/* Buttons for Add to Cart and Buy */}
              <CardActions style={{ justifyContent: "space-around" }}>
                <Button
                  style={{
                    background: "#e11467de",
                    padding: "9px",
                    fontWeight: "bold",
                    color: "aliceblue",
                  }}
                  onClick={() => handleBuy(productDetail)}
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

      <h1 style={{ paddingLeft: "50px" }}>Sản phẩm tương tự</h1>
      <SimilarProducts
        products={products}
        productDetail={productDetail}
        handleProductClick={handleProductClick}
        handleBuy={handleBuy}
        handleAddToCart={handleAddToCart}
      />
    </>
  );
};

export default DetailProduct;
