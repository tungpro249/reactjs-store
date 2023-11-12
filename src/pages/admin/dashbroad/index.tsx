import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { VerticalBarChart } from "./components/VerticalBarChart";
import axios from "axios";
import { GET_STATISTICAL } from "../../../constants/api";

const Dashbroad = () => {
  const [statistical, setStatisticalResponse] = useState<any>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const statisticalResponse = await axios.get(GET_STATISTICAL);
        if (statisticalResponse.data) {
          setStatisticalResponse(statisticalResponse.data);
        }
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${240}px)` },
      }}
    >
      <Toolbar />
      <Grid container>
        <Grid item xs={9} pr={5}>
          <VerticalBarChart />
        </Grid>
        <Grid item xs={3}>
          <h3>TỔNG QUAN</h3>
          <Box>
            <Box>Đơn hàng: {statistical?.totalOrders}</Box>
            <Box>Khách hàng: {statistical?.totalUsers}</Box>
            <Box>Sản phẩm: {statistical?.totalProducts}</Box>
            <Box>Doanh thu: {statistical?.totalRevenue} VNĐ</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashbroad;
