import { Autocomplete, Box, Button, Card, CardMedia, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { ADD_PRODUCT_API } from "../../../../constants/api";
import { typeCategory } from "../../../../types/typeCategory";
import CategoryAutocomplete from "../../category/components/CategoryAutocomplete";

const AddProduct = ({ handleClose }: { handleClose: Function }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState<typeCategory | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const validData = () => {
    let check = true;
    if (name.trim() === "") {
      setNameError("Tên không được để trống");
      check = false;
    }
    if (price.trim() === "") {
      setPriceError("Giá tiền không được để trống");
      check = false;
    }
    if (quantity.trim() === "") {
      setQuantityError("Số lượng không được để trống");
      check = false;
    }
    return check;
  };

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
    if (validData())
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        if (selectedImage) {
          formData.append("image", selectedImage);
        }
        if (category) {
          formData.append("category_id", category?.id.toString());
        }
        const response = await axios.post(ADD_PRODUCT_API, formData);
        if (response !== null) {
          handleClose();
          alert("Thêm sản phẩm thành công");
          window.location.reload();
        } else {
          console.log(response);
        }
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
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ marginRight: "10px" }}>Tên sản phẩm</label>
            <TextField
              placeholder="Tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "250px" }}
              error={!!nameError}
              helperText={nameError}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: "250px" }}
              error={!!priceError}
              helperText={priceError}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ marginRight: "10px" }}>Số lượng</label>
            <TextField
              placeholder="Số lượng"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "250px" }}
              error={!!quantityError}
              helperText={quantityError}
            />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ marginRight: "10px" }}>Mô tả</label>
            <TextField
              placeholder="Mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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