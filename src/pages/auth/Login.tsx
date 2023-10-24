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
import { LOGIN_API } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { loginSuccess, useAppController } from "../../contexts/app";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // @ts-ignore
  const [userController, userDispatch] = useAppController();

  const handleLogin = () => {
    if (isValid()) {
      fetchData();
    }
  };
  
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleLogin();
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
        localStorage.setItem("user", JSON.stringify({ currentUser: response.data }));
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container component="main" onKeyDown={(event: any) => handleKeyDown(event)}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} sx={{ margin: "auto" }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              px: 4,
              py: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#edeaea77",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
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
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleLogin()}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forget-password" variant="body2">
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
    </>
  );
};
export default Login;
