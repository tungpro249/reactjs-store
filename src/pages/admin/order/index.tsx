import Toolbar from "@mui/material/Toolbar";
import { Box, Grid, Modal } from "@mui/material";
import SidePath from "../../../components/sidePath";
import TableForm from "../../../components/table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_ORDER_ITEMS_API } from "../../../constants/api";

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
