import React, { useState } from "react";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Gửi dữ liệu thông tin mua hàng qua API để xử lý đơn hàng
    const orderData = {
      name: name,
      address: address,
      email: email,
      phone: phone,
    };

    // Gọi API để xử lý đơn hàng
    // ...
  };
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];
  return (
    <Grid container p={5}>
      <Grid item xs={5.5} md={5.5}>
        <Box height={700}>
          <h3>Thông tin thanh toán</h3>
          <p>
            Bạn đã có tài khoản? <Link to={"/account/login"}>Đăng nhập</Link>
          </p>
          <br />
          <Box>
            <TextField placeholder={"Họ và tên"} fullWidth />
          </Box>
          <br />
          <Box display={"flex"}>
            <TextField placeholder={"email"} fullWidth />
            <Box pr={1} />
            <TextField placeholder={"số điện thoại"} fullWidth />
          </Box>
          <br />
          <TextField placeholder={"Địa chỉ"} fullWidth />
          <Box>
            <br />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={top100Films}
              renderInput={(params) => <TextField {...params} label="Movie" />}
              fullWidth
            />
          </Box>
          <Box>
            <Button>Phương thức thanh toán</Button>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={1} md={1}>
        <Box sx={{ border: "1px solid #ddd", height: "100%", width: "0px", margin: "auto" }} />
      </Grid>
      <Grid item xs={5.5} md={5.5} style={{ background: "#ddd" }}>
        <Box>fuck</Box>
      </Grid>
    </Grid>
  );
};

export default CheckoutForm;