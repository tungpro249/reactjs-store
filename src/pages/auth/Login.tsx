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
import {useEffect, useState} from "react";
import Foodter from "../../components/foodter";
import Navbar from "../../components/navbar";
import {LOGIN_API} from "../../constants/api";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (isValid()) {
      fetchData();
    }
  };

  const resetError = () => {
    setEmailError("");
    setPasswordError("");
  };

  const isValid = () => {
    resetError();
    let check = true;
    if (email.trim() === "") {
      setEmailError("Bạn chưa nhập email");
      check = false;
    }
    if (password.trim() === "") {
      setPasswordError("Bạn chưa nhâp mật khẩu");
      check = false;
    }
    return check;
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(LOGIN_API, {
        email: email,
        pass_word: password,
      });
      if (response.data !== null) {
        alert("Đăng nhập thành công.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar/>
      <Grid container component="main" sx={{height: "100vh"}}>
        <CssBaseline/>
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
            <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" noValidate onSubmit={() => {
            }} sx={{mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!emailError}
                helperText={emailError !== "" ? emailError : ""}
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
                autoComplete="current-password"
                error={!!passwordError}
                helperText={passwordError !== "" ? passwordError : ""}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={() => handleSubmit()}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu ?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/account/register" variant="body2">
                    {"Bạn chưa có tài khoản? Đăng ký"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Foodter/>
    </>
  );
};
export default Login;
