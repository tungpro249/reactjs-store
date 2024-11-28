import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import TableForm from "../../../components/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_ALL_ORDER_ITEMS_API, updateOrder } from "../../../common/constants/api";
import { UPDATE_TYPE } from "../../../common/constants/app";
import { typeOder } from "../../../types/typeOrder";
import StatusAutocomplete from "./components/AutoComplete";
import ActionForm from "components/form/actionForm";

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
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TextField placeholder={"Tên sản phẩm"} value={order?.product_name} disabled />
          </Box>
          <br />
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TextField placeholder={"Tên tên người đặt"} value={order?.user_name} disabled />
          </Box>
          <br />
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TextField placeholder={"Số lượng"} value={order?.quantity} disabled />
          </Box>
          <br />
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <TextField placeholder={"Giá tiền"} value={`${order?.price} VNĐ`} disabled />
          </Box>
          <br />
          <Box width={"56%"} margin={"auto"}>
            <StatusAutocomplete status={setStatus} />
          </Box>
          <ActionForm onConfirm={changeStatus} onCancel={handleClose} />
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
    { Header: "Tên sản phẩm", accessor: "product_name" },
    { Header: "Người đặt", accessor: "user_name" },
    { Header: "Số lượng", accessor: "quantity" },
    { Header: "Giá tiền", accessor: "price" },
    { Header: "Thời gian", accessor: "date_created" },
    { Header: "Trạng thái", accessor: "status" },
  ];
  return (
    <>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} pr={2}>
          <Box pt={5}>
            <TableForm
              headerTitle="Quản lý đơn hàng"
              columns={columns}
              data={orders}
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
