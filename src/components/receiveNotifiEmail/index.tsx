import TextField from "@mui/material/TextField";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { REGISTER_LOYAL_CUSTOMER } from "../../constants/api";
import { useState } from "react";

const ReceiveNotifyEmail = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const isValid = () => {
    let check = true;
    if (email.trim() === "") {
      setErrorEmail("Bạn chưa nhập email");
      check = false;
    }
    return check;
  }

  const handleRegisterLoyalCustomer = () => {
    if (isValid()) {
      fetchData();
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.post(REGISTER_LOYAL_CUSTOMER, {
        email: email
      });
      if (response.data !== null) {
        alert("Đăng kí thành công.");
        localStorage.setItem("user", JSON.stringify({currentUser: response.data}));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box style={{textAlign: "center", background: "#f5f5f5", lineHeight: "1.5"}} pt={8} pb={8}>
      <h1>ĐĂNG KÝ BẢN TIN</h1>
      <h3>Đăng ký nhận bản tin NEM để được cập nhật những mẫu thiết kế mới nhất</h3>
      <br/>
      <TextField
        id="outlined-basic"
        label=""
        placeholder={"your email"}
        variant="outlined"
        sx={{width: "20%"}}
        onChange={(e: any) => {
          setEmail(e.target.value)
        }}
        helperText={!!errorEmail}
        error={!!errorEmail}
      />
      <Button
        variant="outlined"
        style={{
          height: "56px",
          background: "black",
          color: "white",
          fontWeight: "700",
        }}
        onClick={() => {
          handleRegisterLoyalCustomer()
        }}
      >
        Đăng ký
      </Button>
    </Box>
  );
};
export default ReceiveNotifyEmail;