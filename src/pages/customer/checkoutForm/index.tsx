import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { typeProduct } from "../../../types/typeProduct";
import VietnamLocalSelect from "../../../components/vietnamLocalSelect";
import axios from "axios";
import { payment, paymentWithoutAccount } from "../../../constants/api";

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");

  const [open, setOpen] = useState(false);

  const [productInCart, setProductInCart] = useState<typeProduct | null>(null);

  useEffect(() => {
    // @ts-ignore
    setProductInCart(JSON.parse(localStorage.getItem("cart")).cart);
  }, [localStorage.getItem("cart")]);

  const handleSubmit = () => {
    const orderData = {
      userData: {
        email: email,
        first_name: name.split(" ")[0],
        last_name: name.split(" ")[1],
      },
      items: [
        {
          product_id: productInCart?.id,
          quantity: 1,
          price: productInCart?.price,
        },
      ],
    };

    axios
      .post(paymentWithoutAccount, orderData)
      .then((response) => {
        // Xử lý kết quả thành công
        console.log(response.data);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error(error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container p={5}>
        <Grid item xs={5.5} md={5.5}>
          <Box height={700}>
            <h3>Thông tin thanh toán</h3>
            <p>
              Bạn đã có tài khoản? <Link to={"/account/login"}>Đăng nhập</Link>
            </p>
            <br />
            <Box>
              <TextField
                placeholder={"Họ và tên"}
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <br />
            <Box display={"flex"}>
              <TextField
                placeholder={"email"}
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Box pr={1} />
              <TextField
                placeholder={"số điện thoại"}
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Box>
            <Box>
              <br />
              <VietnamLocalSelect
                handleChooseCity={setCity}
                handleChooseDistrict={setDistrict}
                handleChooseWard={setWard}
              />
            </Box>
            <br />
            <TextField placeholder={"Địa chỉ"} fullWidth />
            <Box>
              <Button
                style={{ background: "#3e80c1", float: "right", color: "white", marginTop: "15px" }}
                onClick={() => {
                  setOpen(true);
                }}
              >
                Phương thức thanh toán
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={1} md={1}>
          <Box sx={{ border: "1px solid #ddd", height: "100%", width: "0px", margin: "auto" }} />
        </Grid>
        <Grid item xs={5.5} md={5.5} style={{ background: "#ddd" }}>
          {productInCart && (
            <Box p={5} display={"flex"}>
              <img src={"http://localhost:1000/" + productInCart.image} width={200} height={200} />
              <Box ml={3} lineHeight={2}>
                <Box>
                  <strong>Tên sản phẩm:</strong>
                  {productInCart.name.toUpperCase()}
                </Box>
                <Box>
                  <strong>Số lượng:</strong>1
                </Box>
                <Box>
                  <strong>Giá tiền:</strong> {productInCart.price} Vnđ
                </Box>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Kiểu thanh toán</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel value="money" control={<Radio />} label="Thanh toán tiền mặt" />
              <FormControlLabel
                value="banking"
                control={<Radio />}
                label="Thanh toán chuyển khoản"
              />
            </RadioGroup>
          </FormControl>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Đặt hàng
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
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CheckoutForm;