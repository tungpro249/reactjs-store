import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const statusOptions = ["Đã thanh toán", "Giao hàng thành công"];

const StatusAutocomplete = ({ status }: { status: any }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleChange = (event: any, value: any) => {
    setSelectedStatus(value);
    status(value);
  };

  return (
    <Autocomplete
      value={selectedStatus}
      onChange={handleChange}
      options={statusOptions}
      renderInput={(params) => (
        <TextField {...params} label="Trạng thái" variant="outlined" fullWidth />
      )}
    />
  );
};

export default StatusAutocomplete;