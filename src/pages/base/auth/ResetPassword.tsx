import { Avatar, Box, Button, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import axios from "axios";
import { resetPassword } from "../../../constants/api";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const location = useLocation();

  function parseQueryString(url: string) {
    const queryString = url.split("?")[1]; // Lấy phần query string sau dấu "?"
    const params = queryString.split("&"); // Tách các tham số thành mảng

    const result: any = {};
    params.forEach((param) => {
      const [key, value] = param.split("="); // Tách key và value của từng tham số
      result[key] = value; // Lưu giá trị vào object result
    });
    return result;
  }

  const handleUpdatePassword = async () => {
    const updatePasswordResponse = await axios.post(resetPassword(), {
      newPassword: password,
      ...parseQueryString(location.search),
    });
    console.log("update", updatePasswordResponse);
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
              Reset Mật khẩu
            </Typography>
            <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Mật khẩu mới"
                name="newPassword"
                onChange={(e) => setPassword(e.target.value)}
                error={!!errorPassword}
                helperText={errorPassword ? errorPassword : ""}
              />
              <Box style={{ display: "flex" }}>
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={() => {
                    handleUpdatePassword();
                  }}
                >
                  Cập nhật
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
