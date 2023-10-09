import Toolbar from "@mui/material/Toolbar";
import { Box, Grid, Modal } from "@mui/material";
import SidePath from "../../../components/sidePath";
import TableForm from "../../../components/table";
import React, { useState } from "react";

const Order = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { header: "Tên sản phẩm", field: "productName" },
    { header: "Người đặt", field: "userOrder" },
    { header: "Thời gian", field: "time" },
    { header: "Trạng thái", field: "status" },
  ];
  return (
    <>
      <Toolbar />
      <Grid container spacing={2}>
        <Grid item xs={12} pr={2}>
          <SidePath handdleAdd={() => {}} showButton={false} />
          <Box pt={5}>
            <TableForm columns={columns} data={[]} handleDelete={() => {}} handleEdit={() => {}} />
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
