import { Box, Grid } from "@mui/material";
import Copyright from "../copyRight";

const Foodter = () => {
  return (
    <>
      <Box sx={{ background: "#000", padding: "60px" }}>
        <Grid container color={"#fff"} padding={"0 150px"}>
          <Grid item xs={3} md={3} sm={3} lg={3} pr={3} pl={4}>
            <Box>
              <h2>Shop thời trang TinTin</h2>
              <address>
                Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ phường Bồ Đề, quận Long Biên, Hà
                Nội <br />
                Chăm sóc khách hàng: 0243.9388512
                <br /> Mua hàng online: 0246.2909098 <br />
                Email: nemcskh@stripe-vn.com
              </address>
            </Box>
          </Grid>
          <Grid item xs={3} md={3} sm={3} lg={3} pr={3}>
            Giới thiệu <br />
            Triết lý kinh doanh tại NEM Fashion NEM's <br />
            Blog <br />
            Hệ thống showroom <br />
            Liên hệ
          </Grid>
          <Grid item xs={3} md={3} sm={3} lg={3} pr={3}>
            Chính sách giao nhận - Vận chuyển <br />
            Hướng dẫn thanh toán <br />
            Tra cứu đơn hàng
            <br /> Hướng dẫn chọn Size
            <br /> Quy định đổi hàng <br />
            Quy định bảo hành và sửa chữa <br />
            Khách hàng thân thiết
          </Grid>

          <Grid item xs={3} md={3} sm={3} lg={3}>
            Phương thức thanh toán
          </Grid>
        </Grid>
      </Box>
      <Copyright />
    </>
  );
};

export default Foodter;