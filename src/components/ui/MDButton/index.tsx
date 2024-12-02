import React from "react";
import { Button, ButtonProps } from "@mui/material";

interface MDButtonProps extends ButtonProps {
  label?: string;
  styles?: React.CSSProperties;
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
  styles,
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
      onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(1.05)")}
      onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.transform = "scale(1)")}
      style={{
        width: "100%",
        borderRadius: "10px",
        transition: "transform 0.3s ease-in-out",
        ...styles,
      }}
      sx={{ ...sx }}
      {...props}
    >
      {label}
    </Button>
  );
};

export default MDButton;
