import { Box, Button, Grid, Avatar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppController } from "../../../contexts/app";
import { getInfoUser, updateInformation } from "../../../constants/api";
import axios from "axios";
import { typeUser } from "../../../types/typeUser";

const Information = () => {
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [user, setUser] = useState<typeUser | null>(null);
  // @ts-ignore
  const [userController] = useAppController();

  useEffect(() => {
    if (user) {
      setSurname(user.lastName);
      setFirstName(user.firstName);
      setEmail(user.email);
      setPhone(user.phone);
      setAddress(user.address);

      // Use default avatar only if user.avatar is null or undefined
      setAvatarUrl(user.avatar ? user.avatar : "default_avatar_url");
    }
  }, [user]);

  const getInformation = async () => {
    const userId = userController.user?.currentUser?.data.id;
    if (userId) {
      const { data } = await axios.get(getInfoUser(userId));
      console.log("data", data);
      setUser(data);
    }
  };

  useEffect(() => {
    getInformation();
  }, [userController]);

  const handleUpdateInformation = async () => {
    const userId = userController.user?.currentUser?.data.id;
    if (userId) {
      const formData = new FormData();
      formData.append("phone", phone?.toString() || "");
      formData.append("first_name", firstName);
      formData.append("last_name", surname);
      formData.append("email", email);
      formData.append("address", address);
      if (avatarFile) formData.append("avatar", avatarFile); // Add avatar file if selected

      const { status } = await axios.put(updateInformation(userId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (status === 200) alert("Cập nhật thành công");
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file)); // Preview the new avatar
    }
  };

  return (
    <Box sx={{ padding: "50px 0", width: "50%", margin: "auto", textAlign: "center" }}>
      <Avatar
        src={`http://localhost:1000/${avatarUrl.replace(/\\\\/g, "/")}`}
        sx={{ width: 100, height: 100, margin: "auto", mb: 2 }}
      />
      <input
        accept="image/*"
        type="file"
        onChange={handleAvatarChange}
        style={{ marginBottom: "20px" }}
      />
      <h1 style={{ fontSize: "40px" }}>Hồ sơ của tôi</h1>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <p>Họ</p>
        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth value={surname} onChange={(e) => setSurname(e.target.value)} />
        </Grid>

        <Grid item xs={2}>
          <p>Tên</p>
        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </Grid>

        <Grid item xs={2}>
          <p>Email</p>
        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
        </Grid>

        <Grid item xs={2}>
          <p>Số điện thoại</p>
        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth value={phone} onChange={(e) => setPhone(Number(e.target.value))} />
        </Grid>

        <Grid item xs={2}>
          <p>Địa chỉ</p>
        </Grid>
        <Grid item xs={10}>
          <TextField fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button variant="contained" onClick={handleUpdateInformation}>
          Cập nhật
        </Button>
        <Box sx={{ width: 30 }} />
        <Button variant="contained" color="error">
          Quay lại
        </Button>
      </Box>
    </Box>
  );
};

export default Information;
