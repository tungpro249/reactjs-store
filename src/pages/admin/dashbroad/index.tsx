import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { VerticalBarChart } from "./components/VerticalBarChart";

const Dashbroad = () => {
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
          <p>Overall</p>
          <Box>
            <Box>Đơn hàng</Box>
            <Box>Khách hàng</Box>
            <Box>Sản phẩm</Box>
            <Box>Doanh thu</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashbroad;
