import { Box, Grid } from "@mui/material";
import Copyright from "../copyRight";
import { Link } from "react-router-dom";

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
            <Link to="/about" className="link-style">
              Giới thiệu
            </Link>{" "}
            <br />
            <Link to="/blog" className="link-style">
              Blog
            </Link>{" "}
            <br />
            <Link to="/showroom" className="link-style">
              Hệ thống showroom
            </Link>{" "}
            <br />
            <Link to="/contact" className="link-style">
              Liên hệ
            </Link>
          </Grid>
          <Grid item xs={3} md={3} sm={3} lg={3} pr={3}>
            <Link to="/shipping-policy" className="link-style">
              Chính sách giao nhận - Vận chuyển
            </Link>{" "}
            <br />
            <Link to="/payment-guide" className="link-style">
              Hướng dẫn thanh toán
            </Link>{" "}
            <br />
            <Link to="/privacy-policy" className="link-style">
              Chính sách bảo mật
            </Link>{" "}
            <br />
            <Link to="/size-guide" className="link-style">
              Hướng dẫn chọn Size
            </Link>{" "}
            <br />
            <Link to="/return-policy" className="link-style">
              Quy định đổi hàng
            </Link>{" "}
            <br />
            <Link to="/warranty-policy" className="link-style">
              Quy định bảo hành và sửa chữa
            </Link>
          </Grid>

          <Grid item xs={3} md={3} sm={3} lg={3}>
            <p>Phương thức thanh toán</p>
            <p style={{ paddingTop: "10px" }}>
              <img
                src={
                  "https://theme.hstatic.net/200000182297/1000887316/14/image_method_3.png?v=855"
                }
              />
            </p>
            <p style={{ paddingTop: "10px" }}>
              <img
                src={"https://theme.hstatic.net/200000182297/1000887316/14/bct.png?v=855"}
                width={"118px"}
              />
            </p>
          </Grid>
        </Grid>
      </Box>
      <Copyright />
    </>
  );
};

export default Foodter;