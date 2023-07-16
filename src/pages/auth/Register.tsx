import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import Copyright from "../../components/copyRight";
import { REGISTER_API } from "../../constants/api";
import Navbar from "../../components/navbar";
import Foodter from "../../components/foodter";

const Register = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errorLastName, setErrorLastName] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorUserName, setErrorUserName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");

  const handleSubmit = () => {
    if (!isValid()) {
      fetchData();
    }
  };

  const resetError = () => {
    setErrorLastName("");
    setErrorFirstName("");
    setErrorUserName("");
    setErrorPassword("");
    setErrorEmail("");
    setErrorPhone("");
    setErrorRePassword("");
  };

  const isValid = () => {
    resetError();
    if (lastName.trim() === "") {
      setErrorLastName("Họ không được để trống");
    }
    if (firstName.trim() === "") {
      setErrorFirstName("Tên không được để trống");
    }
    if (userName.trim() === "") {
      setErrorUserName("Tên tài khoản không được để trống");
    }
    if (password.trim() === "") {
      setErrorPassword("Mật khẩu không được để trống");
    }
    if (rePassword.trim() === "") {
      setErrorRePassword("Nhập lại mật khẩu không được để trống");
    } else if (password !== rePassword) {
      setErrorRePassword("Mật khẩu nhập lại không khớp với mật khẩu đã nhập");
    }
    if (email.trim() === "") {
      setErrorEmail("Email không được để trống");
    }
    // } else if (!isValidEmail(email)) {
    //     setErrorEmail("Email không đúng định dạng");
    // }
    // if (phone.trim() === "") {
    //     setErrorPhone("Số điện thoại không được để trống");
    // } else if (!isValidPhone(phone)) {
    //     setErrorPhone("Số điện thoại không đúng định dạng");
    // }
    return null;
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(REGISTER_API, {
        user_name: userName,
        // last_name: lastName,
        // first_name: firstName,
        // pass_word: password,
        email,
        phone,
      });
      if (response.data !== null) {
        alert("Tạo tài khoản thành công");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching data.");
    }
    setIsLoading(false);
  };

  return (
    <>
      <Grid container component="main">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8d2FsbHBhcGVyc3x8fHx8fDE2ODQ5NDM2NDA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng ký
            </Typography>
            <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
              <Box style={{ display: "flex" }}>
                <TextField
                  margin="normal"
                  required
                  id="lastName"
                  label="Họ"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="lastName"
                  error={!!errorLastName}
                  helperText={errorLastName ? errorLastName : ""}
                  fullWidth
                />
                <Box sx={{ width: "30px" }} />
                <TextField
                  margin="normal"
                  required
                  id="firstName"
                  label="Tên"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="firstName"
                  error={!!errorFirstName}
                  helperText={errorFirstName ? errorFirstName : ""}
                  fullWidth
                />
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setUserName(e.target.value)}
                id="userName"
                label="Tên tài khoản"
                name="userName"
                autoComplete="userName"
                error={!!errorUserName}
                helperText={errorUserName ? errorUserName : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Mật khẩu"
                type="password"
                id="password"
                error={!!errorPassword}
                helperText={errorPassword ? errorPassword : ""}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="rePassword"
                label="Nhập lại mật khẩu"
                onChange={(e) => setRePassword(e.target.value)}
                error={!!errorRePassword}
                helperText={errorRePassword ? errorRePassword : ""}
                type="password"
                id="rePassword"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Số điện thoại"
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
                autoComplete="phone"
                error={!!errorPhone}
                helperText={errorPhone ? errorPhone : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                error={!!errorEmail}
                helperText={errorEmail ? errorEmail : ""}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit()}
              >
                Đăng ký
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/account/login" variant="body2">
                    {"Bạn đã có tài khoản? Đăng nhập"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
