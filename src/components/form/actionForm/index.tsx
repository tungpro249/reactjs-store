import Box from "@mui/material/Box/Box";
import MDButton from "components/ui/MDButton";

interface ActionFormProps {
  onConfirm: Function;
  onCancel: Function;
}

const ActionForm = ({ onConfirm, onCancel }: ActionFormProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
      <MDButton 
        label="Xác nhận" 
        sx={{ mt: 3, mb: 2 }} 
        onClick={() => onConfirm()} 
      />

      <MDButton
        label="Quay lại"
        sx={{ mt: 3, mb: 2 }}
        color="error"
        onClick={() => onCancel()}
      />
    </Box>
  );
};

export default ActionForm;
