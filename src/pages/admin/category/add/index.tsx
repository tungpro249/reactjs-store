import { ADD_CATEGORY_API } from "../../../../common/constants/api";
import Box from "@mui/material/Box";
import { CATEGORY_NAME_IS_EMPTY } from "../../../../common/constants/message";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import ActionForm from "components/form/actionForm";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia/CardMedia";

const AddCategory = ({ handleClose }: { handleClose: Function }) => {
  const [name, setName] = useState<string>("");
  const [errorCategoryName, setErrorCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const isValid = () => {
    let check = true;
    if (name.trim() === "") {
      check = false;
      setErrorCategoryName(CATEGORY_NAME_IS_EMPTY);
    } else {
      setErrorCategoryName("");
    }
    return check;
  };

  const handleAdd = async () => {
    if (isValid()) {
      try {
        const formData = new FormData();
        if (selectedImage) {
          formData.append("image", selectedImage);
        }
        formData.append("name", name);
        const response = await axios.post(ADD_CATEGORY_API, formData);
        alert("Thêm thành công");
        window.location.reload();
      } catch (error) {
        console.log("Error deleting data:", error);
      }
    }
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

  return (
    <Box
      style={{
        background: "white",
        margin: "30vh auto",
        textAlign: "center",
        padding: "50px",
        width: "400px",
        borderRadius: "10px",
      }}
    >
      <h3>Thêm mới</h3>
      <br />
      <Box >
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
        <label>Tên danh muc</label>
        <TextField
          placeholder={"Tên danh mục"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText={errorCategoryName}
          error={!!errorCategoryName}
        />
      </Box>
      <ActionForm onConfirm={handleAdd} onCancel={handleClose} />
    </Box>
  );
};

export default AddCategory;
