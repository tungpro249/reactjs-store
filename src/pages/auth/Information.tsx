import { Box, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppController } from "../../contexts/app";

const Information = () => {
  const [surname, setSurname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // @ts-ignore
  const [userController, userDispatch] = useAppController();

  useEffect(() => {
    if (userController.user) {
      setSurname(userController?.user?.currentUser?.data?.last_name);
      setFirstName(userController?.user?.currentUser?.data?.first_name);
      setEmail(userController?.user?.currentUser?.data?.email);
      setPhone(userController?.user?.currentUser?.data?.phone);
    }
  }, [userController]);

  console.log(userController.user);
  return (
    <Box
      sx={{
        padding: "50px 0px 190px 0",
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
          <TextField label="" fullWidth sx={{ marginBottom: 2 }} value={surname} />
        </Grid>

        <Grid item xs={2} display={"flex"}>
          <p>Tên</p>
        </Grid>
        <Grid item xs={10}>
          <TextField label="" fullWidth sx={{ marginBottom: 2 }} value={firstName} />
        </Grid>

        <Grid item xs={2} display={"flex"}>
          <p>Email</p>
        </Grid>
        <Grid item xs={10}>
          <TextField label="" fullWidth sx={{ marginBottom: 2 }} value={email} />
        </Grid>

        <Grid item xs={2} display={"flex"}>
          <p>Số điện thoại</p>
        </Grid>
        <Grid item xs={10}>
          <TextField label="" fullWidth sx={{ marginBottom: 2 }} value={phone} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Information;