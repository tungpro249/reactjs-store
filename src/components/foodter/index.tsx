import { Box, Grid } from "@mui/material";
import Copyright from "../copyRight";

const Foodter = () => {
  return (
    <>
      <Box sx={{ background: "#000", padding: "40px" }}>
        <Grid container color={"#fff"}>
          <Grid item xs={3} md={3} sm={3} lg={3}>
            <Box>
              <h2>Shop thời trang TinTin</h2>
              <address>
                Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ phường Bồ Đề, quận Long Biên, Hà
                Nội Chăm sóc khách hàng: 0243.9388512 Mua hàng online: 0246.2909098 Email:
                nemcskh@stripe-vn.com
              </address>
            </Box>
          </Grid>
          <Grid item xs={3} md={3} sm={3} lg={3}>
            Giới thiệu Triết lý kinh doanh tại NEM Fashion NEM's Blog Hệ thống showroom Liên hệ
          </Grid>
          <Grid item xs={3} md={3} sm={3} lg={3}>
            Chính sách giao nhận - Vận chuyển Hướng dẫn thanh toán Tra cứu đơn hàng Hướng dẫn chọn
            Size Quy định đổi hàng Quy định bảo hành và sửa chữa Khách hàng thân thiết
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