import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TableForm = ({ columns, data, handleDelete, handleEdit }: any) => {
  const renderTableCell = (item: any, column: any) => {
    switch (column.field) {
      case "image":
        return <img src={item[column.field]} alt="Product" width="50" height="50" />;
      case "category":
        return item.category?.name;
      default:
        return item[column.field];
    }
  };

  return (
    <TableContainer>
      <Table
        style={{
          border: "1px solid rgba(0, 0, 0, 0.1)",
          background: "#f5f5f5",
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column: any, index: number) => (
              <TableCell key={index} style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((item: any, index: number) => (
              <TableRow key={index}>
                {columns.length === 1 ? (
                  <TableCell
                    colSpan={11}
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      textAlign: "left",
                      width: "80%",
                    }}
                  >
                    {renderTableCell(item, columns[0])}
                  </TableCell>
                ) : (
                  columns.slice(0, 10).map((column: any, columnIndex: number) => (
                    <TableCell
                      key={columnIndex}
                      style={{ border: "1px solid rgba(0, 0, 0, 0.1)", width: "20%" }}
                    >
                      {renderTableCell(item, column)}
                    </TableCell>
                  ))
                )}
                <TableCell style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} colSpan={1}>
                  <IconButton onClick={() => handleEdit(item.id)} aria-label="edit" color="primary">
                    <EditIcon />
                    <p style={{ fontSize: "13px", paddingLeft: "5px" }}>Sửa</p>
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    aria-label="delete"
                    color="error"
                  >
                    <DeleteIcon />
                    <p style={{ fontSize: "13px", paddingLeft: "5px" }}>Xóa</p>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 2} style={{ textAlign: "center" }}>
                Không có sản phẩm nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableForm;