import { Box, Button, Grid, Tabs, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppController } from "../../contexts/app";
import { getOrderUser, updateInformation } from "../../constants/api";
import axios from "axios";
import Tab from "@mui/material/Tab";
import * as React from "react";
import TableForm from "../../components/table";

const ProfileTab = () => {
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

  const handleUpdateInformation = async () => {
    const userId = userController.user?.currentUser?.data.id;
    if (userId) {
      const updateInformationResponse = await axios.put(updateInformation(userId), {
        phone,
        first_name: firstName,
        last_name: surname,
        email,
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
            onChange={(e: any) => setFirstName(e.target.value)}
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

const OrdersTab = () => {
  const [orders, setOrders] = useState("");
  // @ts-ignore
  const [userController, userDispatch] = useAppController();
  useEffect(() => {
    const userId = userController.user?.currentUser?.data.id;
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(getOrderUser(userId));
          if (response.data?.orderDetails) {
            setOrders(response.data?.orderDetails);
          }
        } catch (error) {
          console.log("Error fetching categories:", error);
        }
      };
      fetchData();
    }
  }, [orders.length]);

  const columns = [
    { header: "Tên sản phẩm", field: "phone_number" },
    { header: "Người đặt", field: "user_name" },
    { header: "Số lượng", field: "quantity" },
    { header: "Giá tiền", field: "price" },
    { header: "Thời gian", field: "date_created" },
    { header: "Trạng thái", field: "status" },
  ];

  return (
    <Box
      sx={{
        padding: "50px 0px 190px 0",
        width: "90%",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px" }}>Đơn hàng</h1>
      <TableForm columns={columns} data={orders} handleDelete={() => {}} handleEdit={() => {}} />
    </Box>
  );
};

const Information = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabChange = (event: any, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={activeTab}
        onChange={handleTabChange}
      >
        <Tab label="Hồ sơ của tôi" value="profile" sx={{ marginRight: "auto" }} />
        <Tab label="Đơn hàng" value="orders" sx={{ marginRight: "auto" }} />
        <Box>
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
        </Box>
      </Tabs>
    </>
  );
};

export default Information;