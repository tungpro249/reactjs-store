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
                "data:image/png;base64,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"
              }
              alt={""}
              width={"400px"}
            />
          </p>
        </Grid>
      </Grid>
    </>
  );
};
export default About;