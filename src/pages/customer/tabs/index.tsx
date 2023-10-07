import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "60%" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        paddingTop: "100px",
        paddingBottom: "100px",
        paddingLeft: "30vh",
        textAlign: "left",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Hướng dẫn thanh toán" sx={{ marginRight: "auto" }} />
        <Tab label="Chính sách giao nhận-vận chuyển" sx={{ marginRight: "auto" }} />
        <Tab label="Chính sách bảo mật" sx={{ marginRight: "auto" }} />
        <Tab label="Hướng dẫn chọn size" sx={{ marginRight: "auto" }} />
        <Tab label="Qui định đổi hàng" sx={{ marginRight: "auto" }} />
        <Tab label="Chính sách bảo hành và sửa chữa" sx={{ marginRight: "auto" }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <p>
          Thời Trang NEM cung cấp 5 tài khoản. Khách hàng vui lòng chuyển khoản vào những số tài
          khoản đã được ghi ở phía dưới <br />
          (Nếu Quý khách chuyển khoản vào số tài khoản khác ngoài 05 số tài khoản dưới , nhãn hàng
          NEM sẽ không chịu trách nhiệm về số tiền Quý khách đã chuyển)
        </p>
        <br />
        <p>Khi chuyển khoản vui lòng ghi tiêu đề theo cú pháp:Họ tên + Số điện thoại</p>
        <br />
        Tên công ty: Công ty TNHH Dịch vụ và Thương mại An Thành
        <br />
        <br />
        - Ngân hàng VCB : STK: 1241 000 8234 568 Tại VCB CN Hưng Yn
        <br />- Ngân hàng Techcombank: STK: 1913 3219 672 013 tại Techcombank - Đoàn Thanh Tùng
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p>
          - Để đảm bảo quyền lợi cho khách hàng không bị thu sai các khoản phí và theo dõi tình
          trạng đơn hàng đến lúc Quý khách nhận được hàng, bên NEM chỉ áp dụng duy nhất hình thức
          chuyển khoản trước (Không áp dụng hình thức ship COD)
        </p>
        <br />
        <p>- Khách hàng vui lòng thanh toán phí ship trực tiếp với người giao hàng</p>
        <br />
        <p>LƯU Ý:</p>
        <br />
        <p>
          Quý khách vui lòng đợi nhân viên bán hàng liên hệ xác nhận đơn hàng thành công và hướng
          dẫn Quý khách chuyển khoản.
        </p>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <p>
          {" "}
          Chính sách bảo mật này nhằm giúp Quý khách hiểu về cách website thu thập và sử dụng thông
          tin cá nhân của mình thông qua việc sử dụng trang web, bao gồm mọi thông tin có thể cung
          cấp thông qua trang web khi Quý khách đăng ký tài khoản, đăng ký nhận thông tin liên lạc
          từ chúng tôi, hoặc khi Quý khách mua sản phẩm, dịch vụ, yêu cầu thêm thông tin dịch vụ từ
          chúng tôi.
        </p>
        <br />
        <p>
          <strong>Chính sách bảo mật thông tin</strong>
        </p>
        <br />
        <p>
          <strong>1. Mục đích sử dụng thông tin</strong>
        </p>
        - Thiết lập thẻ thành viên
        <br />
        - Nếu khách hàng đăng kí nhận email thông báo, thời trang NEM sẽ gửi thông tin liên quan đến
        sản phẩm, chương trình khuyến mãi và các sự kiện qua email.
        <br />
        <br />
        <p>
          <strong>2. Phạm vi sử dụng thông tin</strong>
        </p>
        - thời trang NEM không cung cấp hay chia sẻ thông tin cá nhân của khách hàng cho một bên thứ
        ba nào khác
        <br />- Thông tin cá nhân khách hàng sẽ chỉ được sử dụng trong nội bộ với mục đích như trên
      </TabPanel>
      <TabPanel value={value} index={3}>
        <h3 style={{ textAlign: "center" }}>HƯỚNG DẪN CHỌN SIZE</h3>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <p>
          <strong>1. Phạm vi áp dụng: </strong>Áp dụng đổi hàng tại hệ thống thời trang NEM trên
          toàn quốc
        </p>
        <br />
        <p>
          <strong>2. Thời gian đổi hàng:</strong>
        </p>
        - Đối với đơn hàng Offline: khách hàng đổi tại showroom trong vòng 7 ngày kể từ ngày mua
        <br />
        - Đối với đơn hàng Online: khách hàng gửi lại NEM sản phẩm trong vòng 3 ngày kể từ ngày nhận
        <br /> <br />
        <p>
          <strong>3. Điều kiện đổi hàng</strong>
        </p>
        - Sản phẩm còn nguyên vẹn, chưa qua sử dụng, sửa chữa, <br />
        giặt ủi với quần áo hay chùi rửa với túi xách <br />– giày dép, còn nguyên tem mác và hóa
        đơn. <br />- Chỉ áp dụng đổi với những sản phẩm có mức giảm giá ≤ 50% <br />- Không áp dụng
        đổi đối với phụ kiện (Tất, mũ, dây lưng, hoa cài áo,...)
        <br /> <br />
        <p>
          <strong>4. Quy định đổi hàng:</strong>
        </p>
        - Chỉ đổi khi sản phẩm có lỗi do nhà sản xuất hoặc do vận chuyển áp dụng đối với đơn hàng
        offline <br />- Áp dụng đổi khi sản phẩm có lỗi do nhà sản xuất, lỗi do vận chuyển hoặc đổi
        theo yêu cầu của khách hàng (đổi màu, đổi size, đổi mẫu) đối với đơn hàng online <br />- Chỉ
        đổi 01 lần/01 đơn hàng và đổi sang sản phẩm cùng chủng loại (không đổi từ quần áo sang túi
        xách/giày dép và ngược lại) <br />- Chỉ được đổi sang sản phẩm có giá bằng hoặc cao hơn và
        bù phần tiền chênh lệch nếu có (giá của sản phẩm mới sẽ tính theo giá tại thời điểm đổi).
        <br /> Trong trường hợp khách hàng đổi sang sản phẩm giá thấp hơn, NEM sẽ không hoàn trả lại
        phần tiền thừa. <br />- Khi đổi sản phẩm, khách hàng không được áp dụng thêm các chương
        trình khác tại thời điểm đổi như chương trình “Mua hàng Tặng hàng” hoặc chương trình “Chiết
        khấu thêm trên tổng hóa đơn”.
        <br /> - Không áp dụng đổi đối với sản phẩm phân phối tại các cửa hàng NEM Outlet (NEM 58
        Kim Mã và 22 Hàng Lược – Hà Nội)
        <br /> - Trường hợp khách hàng mua hàng trong chương trình mua tặng, thì sản phẩm đổi là sản
        phẩm thanh toán (sản phẩm được tặng không được đổi)
        <br /> <br />
        <p>
          <strong>5. Quy định về phí vận chuyển khi đổi hàng Online</strong>
        </p>
        - Trường hợp sản phẩm có lỗi do nhà sản xuất hoặc do vận chuyển, NEM sẽ chi trả phí vận
        chuyển 2 chiều <br />- Trường hợp đổi theo yêu cầu của khách hàng thì khách hàng sẽ chi trả
        phí vận chuyển 2 chiều
      </TabPanel>
      <TabPanel value={value} index={5}>
        <p>
          <strong>1. Quy định về bảo hành và sửa chữa sản phẩm:</strong>
        </p>
        <br />
        - Chỉ bảo hành/sửa chữa các sản phẩm được sản xuất và phân phối bởi NEM
        <br />
        - Chỉ bảo hành/sửa chữa 01 lần/01 sản phẩm trong thời hạn 06 tháng.
        <br />
        - Khi bảo hành/sửa chữa, khách hàng cần cung cấp đầy đủ Phiếu bảo hành (là hoá đơn bán hàng
        có thông tin và thời hạn bảo hành). Trong trường hợp không có phiếu bảo hành hoặc có nhưng
        hết hạn, xóa sửa, không còn nguyên vẹn, NEM sẽ từ chối bảo hành/sửa chữa sản phẩm.
        <br />
        - Không bảo hành/sửa chữa các sản phẩm bị hư hỏng do lỗi phát sinh trong quá trình sử dụng:
        trầy xước, rách do va chạm vật sắc nhọn, động vật cắn, sản phẩm hư hỏng do bảo quản không
        tốt dẫn đến ẩm mốc, phai nắng,...
        <br />
        - Không thay thế hoặc cấp lại phụ kiện đi kèm sản phẩm
        <br />
        <p>
          <strong> 1.1. Sản phẩm quần áo thời trang:</strong>
        </p>
        1. Chỉ bảo hành/sửa chữa đối với các sản phẩm có mức giảm giá ≤ 50% 2. Không bảo hành/sửa
        chữa áo phao, áo phông, đồ len 3. Chỉ nhận bảo hành/sửa chữa các trường hợp sau: lên hoặc
        xuống gấu, nới rộng hoặc bóp hẹp ở mức độ đơn giản, đính lại phụ kiện. Không nhận sửa chữa
        làm thay đổi kiểu dáng, thiết kế của sản phẩm: sửa dáng suông thành dáng ôm, tay ngắn thành
        tay dài, thay chất liệu vải, nhảy size quá lớn (ví dụ từ size 6 xuống thành size 2),...
        <p>
          <strong>Sản phẩm Túi Xách, Giày Dép:</strong>
        </p>
        <p>Chỉ bảo hành/sửa chữa đối với sản phẩm có mức giảm giá &lt; 50%</p>- Chỉ nhận bảo
        hành/sửa chữa những sản phẩm bị lỗi do nhà sản xuất bao gồm : Bong keo, bong nơ, lỗi viền
        sơn, đứt chỉ, đứt thun..
        <p>
          <strong>2. Thời gian bảo hành và sửa chữa: </strong>03 đến 15 ngày làm việc kể từ ngày NEM
          nhận được sản phẩm
        </p>
        <p>
          <strong>3. Địa chỉ nhận bảo hành và sửa chữa:</strong> Khách hàng vui lòng mang trực tiếp
          sản phẩm và phiếu bảo hành tới địa chỉ showroom gần nhất của NEM để được phục vụ
        </p>
        <p>
          <strong>Lưu ý:</strong> Trong trường hợp xảy ra các tình huống phát sinh đặc biệt hoặc
          trường hợp có bất đồng, tranh cãi, NEM sẽ là người ra quyết định cuối cùng.
        </p>
      </TabPanel>
    </Box>
  );
}
