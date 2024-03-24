import { Box, Button, TextField, Grid, CssBaseline, Avatar, Typography, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { forgotPassword } from "../../../constants/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(forgotPassword(), {
        email: email,
      });
      if (response.data !== null) {
        alert("Vui lòng truy cập vào đường link trong mail của bạn.");
        localStorage.setItem("user", JSON.stringify({ currentUser: response.data }));
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isValid = () => {
    let check = true;
    if (email.trim() === "") {
      setErrorEmail("Vui lòng nhập email");
      check = false;
    }
    return check;
  };

  const handleForgetPassword = () => {
    if (isValid()) {
      fetchData();
    }
  };

  return (
    <>
      <Grid container component="main">
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
              backgroundColor: "#edeaea77",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Quên mật khẩu
            </Typography>
            <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
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
              <Box style={{ display: "flex" }}>
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleForgetPassword}
                >
                  Gửi email
                </Button>
                <Box sx={{ padding: "0 30px" }} />
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Quay lại
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgetPassword;