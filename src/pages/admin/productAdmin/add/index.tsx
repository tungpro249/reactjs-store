import { Autocomplete, Box, Button, Card, CardMedia, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { ADD_PRODUCT_API } from "../../../../constants/api";
import { typeCategory } from "../../../../types/typeCategory";

const AddProduct = ({ handleClose }: { handleClose: Function }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<typeCategory | null>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  const handleAddProductApi = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("quantity", quantity);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("category_id", "9");

      const response = await axios.post(ADD_PRODUCT_API, formData);
      console.log(response);
      handleClose();
    } catch (error) {
      console.error(error);
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
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Tên sản phẩm</label>
            <TextField
              placeholder={"Tên sản phẩm"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Danh mục</label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[1, 2, 3, 4]}
              sx={{ width: 100 }}
              renderInput={(params) => <TextField {...params} label="Movie" />}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Giá tiền</label>
            <TextField
              placeholder={"Giá tiền"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Số lượng</label>
            <TextField
              placeholder={"Số lượng"}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Mô tả</label>
            <TextField
              placeholder={"Mô tả"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => handleAddProductApi()}
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

export default AddProduct;