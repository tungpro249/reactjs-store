import React from "react";
import { Grid } from "@mui/material";

const About = () => {
  return (
    <>
      <Grid container pr={20} pl={20} pt={3} pb={3}>
        <Grid item xs={12} md={6}>
          <h1 style={{ paddingBottom: "16px" }}>THỜI TRANG FRENZY</h1>
          <p>
            Frenzy là một thương hiệu quần áo nam đồng hành cùng phái mạnh từ những ngày đầu của năm
            2002. Với tư cách là một biểu tượng trong ngành thời trang nam Việt Nam, Frenzy tự hào
            đã đóng góp vào sự thay đổi và phát triển của diện mạo thời trang trong nước, với sứ
            mệnh đồng hành cùng xu hướng thời trang quốc tế.
            <br />
            <br />
            Các thiết kế của Frenzy mang đến sự đơn giản nhưng tinh tế, kết hợp giữa vẻ thanh lịch
            và nét đẹp truyền thống của người Á Đông. Thương hiệu này đặt công sức lớn vào việc
            thiết kế sản phẩm, chú trọng đến các chi tiết cắt may tinh tế và lựa chọn chất liệu cao
            cấp. Đội ngũ nhà thiết kế của Frenzy luôn tin rằng một bộ trang phục dành cho phái mạnh
            Việt không chỉ cần mang đến vẻ sang trọng và quyến rũ, mà còn cần phải vừa vặn và phù
            hợp với vóc dáng và phong cách cá nhân của người đàn ông Á Đông.
            <br />
            <br />
            Frenzy mang đến bốn dòng sản phẩm chính: NEM New, NEM Luxury Limited, Homewear, mỗi dòng
            sản phẩm đều có những nét đặc trưng riêng trong thiết kế. Thông qua sự đa dạng này,
            Frenzy tự tin đáp ứng "giải pháp" thời trang phù hợp với nhiều độ tuổi, phong cách ăn
            mặc và hoàn cảnh sử dụng khác nhau của khách hàng.
            <br />
            <br />
            Với sự cam kết về chất lượng và phong cách, Frenzy đã xây dựng được một danh tiếng vững
            chắc trong thị trường thời trang nam Việt Nam. Thương hiệu này không chỉ đơn giản là một
            nhãn hiệu quần áo, mà còn là một biểu tượng đại diện cho sự lịch lãm, tinh tế và phong
            cách của người đàn ông Việt.
          </p>
        </Grid>
        <Grid item xs={12} md={6}>
          <p style={{ textAlign: "center" }}>
            <img
              src={
                "https://cbu01.alicdn.com/img/ibank/O1CN01JOPmow1GQAg6oEjch_!!4258180616-0-cib.jpg   "
              }
              alt={""}
              width={"50%"}
            />
          </p>
        </Grid>
      </Grid>
    </>
  );
};
export default About;