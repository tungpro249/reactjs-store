import React, { useState, useEffect } from "react";
import axios from "axios";
import { ADD_CATEGORY_API, deleteProduct, GET_ALL_PRODUCT_API } from "../../../constants/api";
import { Box, Button, Card, CardMedia, Grid, Modal, TextField } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import TableForm from "../../../components/table";
import SidePath from "../../../components/sidePath";
import { ADD_TYPE, DELETE_TYPE, UPDATE_TYPE } from "../../../constants/app";

export default function ProductAdmin() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ALL_PRODUCT_API);
        if (response.data) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const [open, setOpen] = useState(false);

  const [productId, setProductId] = useState<number | null>(null);

  const handleAddProduct = () => {
    setType(ADD_TYPE);
    setOpen(true);
  };

  const handleDeleteProduct = (productId: number) => {
    setType(DELETE_TYPE);
    setOpen(true);
    setProductId(productId);
  };

  const editProduct = (productId: number) => {
    setType(UPDATE_TYPE);
    setOpen(true);
    setProductId(productId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProductApi = async () => {
    try {
      if (productId) {
        await axios.delete(deleteProduct(productId));

        // Cập nhật danh sách sản phẩm sau khi xóa thành công
        const updatedProducts = products.filter((item: any) => item.id !== productId);
        setProducts(updatedProducts);

        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddProductApi = async () => {
    try {
      const addResponseApi = await axios.post(ADD_CATEGORY_API);
      alert("Thêm thành công");
      window.location.reload();
    } catch (error) {
      console.log("Error deleting data:", error);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

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

  const formAdd = () => (
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
            <TextField placeholder={"Tên danh muc"} value={""} onChange={(e) => {}} />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Mô tả</label>
            <TextField placeholder={"Mô tả"} value={""} onChange={(e) => {}} />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Giá tiền</label>
            <TextField placeholder={"Giá tiền"} value={""} onChange={(e) => {}} />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Số lượng</label>
            <TextField placeholder={"Giá tiền"} value={""} onChange={(e) => {}} />
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
  const formUpdate = () => (
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
            <TextField placeholder={"Tên danh muc"} value={""} onChange={(e) => {}} />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Mô tả</label>
            <TextField placeholder={"Mô tả"} value={""} onChange={(e) => {}} />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Giá tiền</label>
            <TextField placeholder={"Giá tiền"} value={""} onChange={(e) => {}} />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <label>Số lượng</label>
            <TextField placeholder={"Giá tiền"} value={""} onChange={(e) => {}} />
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
  const formDelete = () => (
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
      <h3>Bạn có muốn xóa</h3>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleDeleteProductApi}
        >
          Xác nhận
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
  const [type, setType] = useState("");

  const showModalContent = () => {
    if (type === ADD_TYPE) return formAdd();
    if (type === UPDATE_TYPE) return formUpdate();
    if (type === DELETE_TYPE) return formDelete();
    return <div />;
  };
  const columns = [
    { header: "Tên sản phẩm", field: "name" },
    { header: "Mô tả", field: "description" },
    { header: "Danh mục", field: "category" },
    { header: "Số lượng", field: "quantity" },
    { header: "Hình ảnh", field: "image" },
    { header: "Giá tiền", field: "price" },
  ];

  return (
    <>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} pr={2}>
          <SidePath
            handdleAdd={() => {
              handleAddProduct();
            }}
            showButton
          />
          <Box pt={5}>
            <TableForm
              columns={columns}
              data={products}
              handleDelete={handleDeleteProduct}
              handleEdit={editProduct}
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {showModalContent()}
      </Modal>
    </>
  );
}