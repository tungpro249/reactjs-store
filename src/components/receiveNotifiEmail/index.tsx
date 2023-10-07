import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";

const ReceiveNotifyEmail = () => {
  return (
    <Box style={{ textAlign: "center", background: "#f5f5f5", lineHeight: "1.5" }} pt={8} pb={8}>
      <h1>ĐĂNG KÝ BẢN TIN</h1>
      <h3>Đăng ký nhận bản tin NEM để được cập nhật những mẫu thiết kế mới nhất</h3>
      <br />
      <TextField
        id="outlined-basic"
        label=""
        placeholder={"your email"}
        variant="outlined"
        sx={{ width: "20%" }}
      />
      <Button
        variant="outlined"
        style={{
          height: "56px",
          background: "black",
          color: "white",
          fontWeight: "700",
        }}
      >
        Đăng ký
      </Button>
    </Box>
  );
};
export default ReceiveNotifyEmail;