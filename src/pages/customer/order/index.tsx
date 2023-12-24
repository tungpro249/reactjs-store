import { useEffect, useState } from "react";
import { typeOder } from "../../../types/typeOrder";
import { useAppController } from "../../../contexts/app";
import axios from "axios";
import { deleteOrder, getOrderUser } from "../../../constants/api";
import {
  Box,
  Button,
  Modal,
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
  const [open, setOpen] = useState(false);
  // @ts-ignore
  const [userController, userDispatch] = useAppController();
  useEffect(() => {
    const userId = userController.user?.currentUser?.data.id;
    if (userId) {
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
  const [orderId, setOrderId] = useState(null);
  const deleteOder = async () => {
    try {
      if (orderId) {
        const response = await axios.delete(deleteOrder(orderId));
        if (response) {
          alert("Đã hủy đơn hàng");
          window.location.reload();
        } else alert("Hủy đơn hàng thất bại");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleReturns = (order: any) => {
    setOpen(true);
    setOrderId(order.order_id);
  };

  return (
    <>
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
                <TableCell>Hành động</TableCell>
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
                  <Box>
                    {/*<TableCell onClick={handleCancel}>Hủy</TableCell>*/}
                    <TableCell
                      onClick={() => {
                        handleReturns(order);
                      }}
                    >
                      Trả hàng
                    </TableCell>
                  </Box>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Modal open={open}>
        <Box
          style={{
            width: "500px",
            background: "white",
            textAlign: "center",
            margin: "17% auto",
            padding: "50px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          <div>Bạn chắc chắn muốn hủy hàng?</div>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setOpen(false)}
            >
              Đóng
            </Button>
            <Box sx={{ padding: "0 30px" }} />
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color={"error"}
              onClick={deleteOder}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default OrderCustomer;