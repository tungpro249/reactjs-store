import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BackupIcon from "@mui/icons-material/Backup";

const Toolbar = ({
  headerTitle,
  isCreate,
  isDeleteAll,
  isUploadFileExcel,
  handleAdd,
}: {
  headerTitle: string;
  isCreate?: boolean;
  isDeleteAll?: boolean;
  isUploadFileExcel?: boolean;
  handleAdd?: () => void;
}) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 10px",
        background: "#cfcccc",
        borderRadius: "10px",
        marginBottom: "15px",
        marginTop: "-16px",
      }}
    >
      <h3>{headerTitle.toUpperCase()}</h3>
      <Box>
        {isCreate && handleAdd && (
          <Button
            onClick={() => handleAdd()}
            style={{ fontWeight: "bold", fontSize: "15px", color: "inherit" }}
          >
            <AddCircleIcon />
            Thêm mới
          </Button>
        )}
        {isUploadFileExcel && (
          <Button
            onClick={() => {}}
            style={{ fontWeight: "bold", fontSize: "15px", color: "inherit" }}
          >
            <BackupIcon />
            Thêm bằng file excel
          </Button>
        )}
         {isDeleteAll && (
          <Button
            onClick={() => {}}
            style={{ fontWeight: "bold", fontSize: "15px", color: "inherit" }}
          >
            <BackupIcon />
            Xóa tất cả
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Toolbar;
