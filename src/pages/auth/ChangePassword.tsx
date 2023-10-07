import { Box, Button, TextField, Grid, CssBaseline, Avatar, Typography, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const navigate = useNavigate();

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
              Thay đổi mật khẩu
            </Typography>
            <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="oldPass"
                label="Mật khẩu cũ"
                name="oldPass"
                onChange={(e) => setOldPass(e.target.value)}
                error={!!errorEmail}
                helperText={errorEmail ? errorEmail : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="newPass"
                label="Mật khẩu mới"
                name="newPass"
                onChange={(e) => setNewPass(e.target.value)}
                error={!!errorEmail}
                helperText={errorEmail ? errorEmail : ""}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmPass"
                label="Nhập lại mật khẩu"
                name="confirmPass"
                onChange={(e) => setNewPass(e.target.value)}
                error={!!errorEmail}
                helperText={errorEmail ? errorEmail : ""}
              />
              <Box style={{ display: "flex", justifyContent: "center" }}>
                <Button type="button" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => {}}>
                  Xác nhận
                </Button>
                <Box sx={{ padding: "0 30px" }} />
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  color={"error"}
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

export default ChangePassword;