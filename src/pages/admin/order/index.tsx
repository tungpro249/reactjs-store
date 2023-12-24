import Toolbar from "@mui/material/Toolbar";
import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import SidePath from "../../../components/sidePath";
import TableForm from "../../../components/table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_ORDER_ITEMS_API, updateOrder } from "../../../constants/api";
import { DELETE_TYPE, UPDATE_TYPE } from "../../../constants/app";
import { typeOder } from "../../../types/typeOrder";
import StatusAutocomplete from "./components/AutoComplete";

const Order = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const [orders, setOrders] = useState([]);

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

  const [status, setStatus] = useState("");
  const changeStatus = async () => {
    // @ts-ignore
    const changeStatusResponse = await axios.put(updateOrder(order?.id), { status: status });
    handleClose();
    window.location.reload();
  };
  const showModalContent = () => {
    if (type === UPDATE_TYPE)
      return (
        <Box
          style={{
            background: "white",
            margin: "20vh auto",
            textAlign: "center",
            padding: "50px",
            width: "400px",
            borderRadius: "10px",
          }}
        >
          <h3>Sửa</h3>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <TextField placeholder={"Tên sản phẩm"} value={order?.product_name} disabled />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <TextField placeholder={"Tên tên người đặt"} value={order?.user_name} disabled />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <TextField placeholder={"Số lượng"} value={order?.quantity} disabled />
          </Box>
          <br />
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
            <TextField placeholder={"Giá tiền"} value={`${order?.price} VNĐ`} disabled />
          </Box>
          <br />
          <Box width={"56%"} margin={"auto"}>
            <StatusAutocomplete status={setStatus} />
          </Box>
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                // @ts-ignore
                changeStatus(order?.id);
              }}
            >
              Xác nhận
            </Button>
            <Box sx={{ padding: "0 30px" }} />
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color={"error"}
              onClick={() => {
                handleClose();
              }}
            >
              Quay lại
            </Button>
          </Box>
        </Box>
      );
    return <div />;
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
              data={orders.filter((item: any) => item.status)}
              handleDelete={() => {}}
              handleEdit={handleEditOrder}
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
        {showModalContent()}
      </Modal>
    </>
  );
};

export default Order;
