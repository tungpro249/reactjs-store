import Toolbar from "@mui/material/Toolbar";
import { Box, Grid, Modal } from "@mui/material";
import SidePath from "../../../components/sidePath";
import TableForm from "../../../components/table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_ORDER_ITEMS_API } from "../../../constants/api";
import { ADD_TYPE, DELETE_TYPE, UPDATE_TYPE } from "../../../constants/app";
import { typeOder } from "../../../types/typeOrder";

const Order = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [orders, setOrders] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_ALL_ORDER_ITEMS_API);
        if (response.data) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  const [type, setType] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);
  const [order, setOrder] = useState<typeOder | null>(null);

  // const showModalContent = () => {
  //   if (type === ADD_TYPE) return formAdd(handleClose);
  //   if (type === UPDATE_TYPE) return formUpdate(handleClose);
  //   if (type === DELETE_TYPE) return formDelete(handleClose);
  //   return <div />;
  // };

  const handleDeleteOrder = (orderId: number) => {
    setType(DELETE_TYPE);
    setOpen(true);
    setOrderId(orderId);
  };

  const handleEditOrder = (orderItem: typeOder) => {
    setType(UPDATE_TYPE);
    setOpen(true);
    setOrderId(orderItem.id);
    setOrder(orderItem);
  };

  const columns = [
    { header: "Tên sản phẩm", field: "product_name" },
    { header: "Người đặt", field: "user_name" },
    { header: "Số lượng", field: "quantity" },
    { header: "Giá tiền", field: "price" },
    { header: "Thời gian", field: "date_created" },
    { header: "Trạng thái", field: "status" },
  ];
  return (
    <>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} pr={2}>
          <SidePath handdleAdd={() => {}} showButton={false} />
          <Box pt={5}>
            <TableForm
              columns={columns}
              data={orders}
              handleDelete={() => {}}
              handleEdit={() => {}}
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div />
      </Modal>
    </>
  );
};

export default Order;
