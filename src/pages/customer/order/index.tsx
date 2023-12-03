import { useEffect, useState } from "react";
import { typeOder } from "../../../types/typeOrder";
import { useAppController } from "../../../contexts/app";
import axios from "axios";
import { getOrderUser } from "../../../constants/api";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import * as React from "react";

const OrderCustomer = () => {
  const [orders, setOrders] = useState<Array<typeOder>>([]);
  // @ts-ignore
  const [userController, userDispatch] = useAppController();
  useEffect(() => {
    const userId = userController.user?.currentUser?.data.id;
    if (userId) {
      console.log("vl");
      const fetchData = async () => {
        try {
          const response = await axios.get(getOrderUser(userId));
          if (response.data.orderDetails) {
            setOrders(response.data.orderDetails);
          }
        } catch (error) {
          console.log("Error fetching categories:", error);
        }
      };
      fetchData();
    }
  }, [userController]);

  return (
    <Box
      sx={{
        padding: "50px 0px 190px 0",
        width: "90%",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px" }}>Đơn hàng</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Người đặt</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá tiền</TableCell>
              <TableCell>Thời gian</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={index}>
                <TableCell>{order?.product_name}</TableCell>
                <TableCell>{order?.user_name}</TableCell>
                <TableCell>{order?.quantity}</TableCell>
                <TableCell>{order?.price}</TableCell>
                <TableCell>{order?.date_created}</TableCell>
                <TableCell>{order?.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default OrderCustomer;