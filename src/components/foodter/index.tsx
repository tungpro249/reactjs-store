import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Copyright from "../copyRight";
import { Link } from "react-router-dom";

const linkSections = [
  {
    title: "Shop thời trang FRENZY",
    content: (
      <address>
        Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ phường Bồ Đề, quận Long Biên, Hà Nội
        <br />
        Chăm sóc khách hàng: 0243.9388512
        <br />
        Mua hàng online: 0246.2909098
        <br />
        Email: nemcskh@stripe-vn.com
      </address>
    ),
  },
  {
    links: [
      { to: "/about", label: "Giới thiệu" },
      { to: "/blog", label: "Blog" },
      { to: "/showroom", label: "Hệ thống showroom" },
      { to: "/contact", label: "Liên hệ" },
    ],
  },
  {
    links: [
      { to: "/shipping-policy", label: "Chính sách giao nhận - Vận chuyển" },
      { to: "/payment-guide", label: "Hướng dẫn thanh toán" },
      { to: "/privacy-policy", label: "Chính sách bảo mật" },
      { to: "/size-guide", label: "Hướng dẫn chọn Size" },
      { to: "/return-policy", label: "Quy định đổi hàng" },
      { to: "/warranty-policy", label: "Quy định bảo hành và sửa chữa" },
    ],
  },
  {
    title: "Phương thức thanh toán",
    content: (
      <>
        <img
          src="https://theme.hstatic.net/200000182297/1000887316/14/image_method_3.png?v=855"
          alt="Payment methods"
        />
        <img
          src="https://theme.hstatic.net/200000182297/1000887316/14/bct.png?v=855"
          width="118px"
          alt="Certification"
        />
      </>
    ),
  },
];

const Foodter = () => (
  <>
    <Box sx={{ background: "#000", padding: "50px" }}>
      <Grid container color="#fff">
        {linkSections.map((section, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} pr={3} key={index}>
            {section.title && <h2>{section.title}</h2>}
            {section.content ||
              section.links.map((link, i) => (
                <Link to={link.to} className="link-style" key={i}>
                  <div>{link.label}</div>
                </Link>
              ))}
          </Grid>
        ))}
      </Grid>
    </Box>
    <Copyright />
  </>
);

export default Foodter
