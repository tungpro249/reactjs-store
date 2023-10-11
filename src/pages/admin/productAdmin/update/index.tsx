import React, { useState } from "react";
import { Box, Button, Card, CardMedia, Grid, TextField } from "@mui/material";
import axios from "axios";
import { updateProduct } from "../../../../constants/api";
import CategoryAutocomplete from "../../category/components/CategoryAutocomplete";
import { typeCategory } from "../../../../types/typeCategory";

const UpdateProduct = ({
  handleClose,
  productId,
}: {
  handleClose: Function;
  productId: number | null;
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [category, setCategory] = useState<typeCategory | null>(null);

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
      //@ts-ignore
      const file = event.target?.files[0];
      setSelectedImage(file);
    });
    input.click();
  };

  const handleUpdateProductApi = async () => {
    if (productId) {
      try {
        const formData = new FormData();
        formData.append("name", productName);
        formData.append("description", productDescription);
        formData.append("price", productPrice);
        formData.append("quantity", productQuantity);
        if (selectedImage) {
          formData.append("image", selectedImage);
        }
        if (category) {
          formData.append("category_id", category?.id.toString());
        }

        const updateResponseApi = await axios.put(updateProduct(productId), formData);
        alert("Cập nhật thành công");
      } catch (error) {
        console.log("Error adding product:", error);
      }
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
              <CardMedia
                component="img"
                height="450"
                image={URL.createObjectURL(selectedImage)}
                alt="Selected Image"
              />
            ) : (
              <CardMedia
                component="img"
                height="450"
                image="https://png.pngtree.com/element_our/20190531/ourlarge/pngtree-gray-plus-sign-free-map-image_1280904.jpg"
                alt="Choose Image"
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ marginRight: "10px" }}>Tên sản phẩm</label>
            <TextField
              placeholder="Tên sản phẩm"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={{ width: "250px" }}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ marginRight: "10px" }}>Danh mục</label>
            <CategoryAutocomplete handleChoose={setCategory} />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ marginRight: "10px" }}>Giá tiền</label>
            <TextField
              placeholder="Giá tiền"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              style={{ width: "250px" }}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ marginRight: "10px" }}>Số lượng</label>
            <TextField
              placeholder="Số lượng"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              style={{ width: "250px" }}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ marginRight: "10px" }}>Mô tả</label>
            <TextField
              placeholder="Mô tả"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              style={{ width: "250px" }}
            />
          </Box>
        </Grid>
      </Grid>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleUpdateProductApi}
        >
          Sửa
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