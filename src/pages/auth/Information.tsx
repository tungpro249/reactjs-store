import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { loginSuccess, useAppController } from "../../contexts/app";
import { getInfoUser, getOrderUser, updateInformation } from "../../constants/api";
import axios from "axios";
import * as React from "react";
import { typeUser } from "../../types/typeUser";

const Information = () => {
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [user, setUser] = useState<typeUser | null>(null);

  // @ts-ignore
  const [userController, userDispatch] = useAppController();

  useEffect(() => {
    if (user) {
      setSurname(user.lastName);
      setFirstName(user.firstName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);
    }
  }, [user]);

  const getInformation = async () => {
    const userId = userController.user?.currentUser?.data.id;
    if (userId) {
      const getInformationResponse = await axios.get(getInfoUser(userId));
      if (getInformationResponse) {
        setUser(getInformationResponse.data);
      }
    }
  };

  useEffect(() => {
    getInformation();
  }, [userController]);

  const handleUpdateInformation = async () => {
    const userId = userController.user?.currentUser?.data.id;
    if (userId) {
      const updateInformationResponse = await axios.put(updateInformation(userId), {
        phone,
        first_name: firstName,
        last_name: surname,
        email,
        address,
      });
      if (updateInformationResponse) {
        alert("Cập nhật thành công");
      }
    }
  };

  return (
    <Box
      sx={{
        padding: "50px 0px 50px 0",
        width: "50%",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px" }}>Hồ sơ của tôi</h1>
      <br />
      <br />
      <Grid container>
        <Grid item xs={2} display={"flex"}>
          <p>Họ</p>
        </Grid>
        <Grid item xs={10}>
          <TextField
            label=""
            fullWidth
            sx={{ marginBottom: 2 }}
            value={surname}
            onChange={(e: any) => setSurname(e.target.value)}
          />
        </Grid>

        <Grid item xs={2} display={"flex"}>
          <p>Tên</p>
        </Grid>
        <Grid item xs={10}>
          <TextField
            label=""
            fullWidth
            sx={{ marginBottom: 2 }}
            value={firstName}
            onChange={(e: any) => {
              setFirstName(e.target.value);
            }}
          />
        </Grid>

        <Grid item xs={2} display={"flex"}>
          <p>Email</p>
        </Grid>
        <Grid item xs={10}>
          <TextField
            label=""
            fullWidth
            sx={{ marginBottom: 2 }}
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </Grid>

        <Grid item xs={2} display={"flex"}>
          <p>Số điện thoại</p>
        </Grid>
        <Grid item xs={10}>
          <TextField
            label=""
            fullWidth
            sx={{ marginBottom: 2 }}
            value={phone}
            onChange={(e: any) => setPhone(e.target.value)}
          />
        </Grid>

        <Grid item xs={2} display={"flex"}>
          <p>Địa chỉ</p>
        </Grid>
        <Grid item xs={10}>
          <TextField
            label=""
            fullWidth
            sx={{ marginBottom: 2 }}
            value={address}
            onChange={(e: any) => setAddress(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            handleUpdateInformation();
          }}
        >
          Cập nhật
        </Button>
        <Box sx={{ padding: "0 30px" }} />
        <Button type="button" variant="contained" sx={{ mt: 3, mb: 2 }} color={"error"}>
          Quay lại
        </Button>
      </Box>
    </Box>
  );
};

export default Information;