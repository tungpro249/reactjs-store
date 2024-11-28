import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface MDButtonProps extends ButtonProps {
  label?: string;
}

const MDButton: React.FC<MDButtonProps> = ({
  label = "", 
  variant = "contained",
  color = "primary", 
  size = "medium", 
  fullWidth = false,
  disabled = false,
  onClick, 
  sx, 
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      style={{ width: "100%", borderRadius: "10px" }}
      sx={{ ...sx }}
      {...props}
    >
      {label}
    </Button>
  );
};

export default MDButton;
