import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

interface MessageModalFormProps {
  message: string;
  severity?: "success" | "info" | "warning" | "error";
  onClose?: () => void;
}

const MessageModalForm: React.FC<MessageModalFormProps> = ({
  message,
  severity = "info",
  onClose,
}) => {
  const [open, setOpen] = useState(true);
console.log('dcm vl');

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageModalForm;