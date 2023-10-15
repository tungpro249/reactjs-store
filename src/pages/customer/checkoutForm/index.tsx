import React, { useState } from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
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
      <Grid item xs={6} md={6}>
        <h3>Thông tin thanh toán</h3>
        <TextField placeholder={"Họ và tên"} />
        <TextField placeholder={"email"} />
        <TextField placeholder={"số điện thoại"} />
        <TextField placeholder={"số điện thoại"} />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <p>
          Bạn đã có tài khoản? <Link to={"/account/login"}>Đăng nhập</Link>
        </p>
      </Grid>
      <Grid item xs={6} md={6}></Grid>
    </Grid>
  );
};

export default CheckoutForm;