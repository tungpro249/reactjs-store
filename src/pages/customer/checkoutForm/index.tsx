import React, { useState } from "react";

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Gửi dữ liệu thông tin mua hàng qua API để xử lý đơn hàng
    const orderData = {
      name: name,
      address: address,
      email: email,
      phone: phone,
    };

    // Gọi API để xử lý đơn hàng
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tên:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        Địa chỉ:
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Số điện thoại:
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Đặt hàng</button>
    </form>
  );
};

export default CheckoutForm;