import React from "react";
import { Box, Button } from "@mui/material";

const PriceFilter = ({ onFilterChange }) => {
  const handlePriceFilter = (min, max) => {
    onFilterChange({ min, max });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 3 }}>
      <Button variant="contained" onClick={() => handlePriceFilter(0, 10000)}>
        Dưới 10,000
      </Button>
      <Button variant="contained" onClick={() => handlePriceFilter(300000, 500000)}>
        300,000 - 500,000
      </Button>
      <Button variant="contained" onClick={() => handlePriceFilter(500000, 999999)}>
        Trên 500,000
      </Button>
    </Box>
  );
};

export default PriceFilter;