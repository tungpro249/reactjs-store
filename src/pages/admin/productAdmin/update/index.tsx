import React, { useState } from "react";
import { Box, Button, Card, CardMedia, Grid, TextField } from "@mui/material";
import axios from "axios";
import { ADD_CATEGORY_API } from "../../../../constants/api";

const UpdateProduct = ({ handleClose }: { handleClose: Function }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
      //@ts-ignore
      const file = event.target?.files[0];
      //@ts-ignore
      setSelectedImage(URL.createObjectURL(file));
    });
    input.click();
  };

  const handleAddProductApi = async () => {
    try {
      const productData = {
        productName,
        productDescription,
        productPrice,
        productQuantity,
        // Add other product data as needed
      };

      const addResponseApi = await axios.post(ADD_CATEGORY_API, productData);
      alert("Thêm thành công");
      // Update the product list or perform any other necessary actions
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };

  return (
    <Box
      style={{
        background: "white",
        margin: "15vh auto",
        width: "800px",
        textAlign: "center",
        padding: "50px",
        borderRadius: "10px",
      }}
    >
      <Grid container p={3}>
        <Grid item xs={6}>
          <Card sx={{ maxWidth: 345 }} onClick={handleImageClick} style={{ cursor: "pointer" }}>
            {selectedImage ? (
              <CardMedia component="img" height="450" image={selectedImage} alt="Selected Image" />
            ) : (
              <CardMedia
                component="img"
                height="450"
                image="https://png.pngtree.com/element_our/20190531/ourlarge/pngtree-gray-plus-sign-free-map-image_1280904.jpg" // Đường dẫn ảnh mặc định hoặc placeholder
                alt="Choose Image"
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Tên sản phẩm</label>
            <TextField
              placeholder={"Tên danh muc"}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Mô tả</label>
            <TextField
              placeholder={"Mô tả"}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Giá tiền</label>
            <TextField
              placeholder={"Giá tiền"}
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Số lượng</label>
            <TextField
              placeholder={"Số lượng"}
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleAddProductApi}
        >
          Thêm
        </Button>
        <Box sx={{ padding: "0 30px" }} />
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          color={"error"}
          onClick={() => {
            handleClose();
          }}
        >
          Quay lại
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateProduct;