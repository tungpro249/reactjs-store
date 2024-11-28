import React from "react";
import TextField from "@mui/material/TextField";

interface MDInputProps {
  label?: string;
  name: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInvalid?: React.FormEventHandler<HTMLDivElement>;  // Explicit type narrowing
}

const MDInput: React.FC<MDInputProps> = ({
  label = "Enter text",
  name,
  value,
  onChange,
  onInvalid,  
  ...props
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onInvalid={onInvalid} 
      {...props}
    />
  );
};

export default MDInput;
