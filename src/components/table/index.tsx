import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import ActionButtons from "./actionButtons";

const TableForm = ({ columns, data, handleDelete, handleEdit }: any) => {
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when rows per page change
  };

  const renderTableCell = (item: any, column: any) => {
    switch (column.field) {
      case "image":
        return (
          <img
            src={`http://localhost:1000/${item[column.field].replace(/\\\\/g, "/")}`}
            alt="Product"
            width="100"
            height="100"
          />
        );
      case "category":
        return item.category?.name;
      case "date_created":
        return <div>{new Date(item?.date_created).toLocaleString()}</div>;
      default:
        return item[column.field];
    }
  };

  // Slice the data according to pagination
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <TableContainer style={{ borderRadius: "12px" }}>
        <Table
          style={{
            border: "1px solid rgba(0, 0, 0, 0.1)",
            background: "#cfcccc",
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column: any, index: number) => (
                <TableCell
                  key={index}
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {column.header}
                </TableCell>
              ))}
              {/* Add "Hành động" column */}
              <TableCell
                key="action-header"
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item: any, index: number) => (
                <TableRow key={index}>
                  {columns.map((column: any, columnIndex: number) => (
                    <TableCell
                      key={columnIndex}
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        width: "20%",
                        fontSize: "17px",
                      }}
                    >
                      {renderTableCell(item, column)}
                    </TableCell>
                  ))}
                  {/* Use ActionButtons for each row */}
                  <TableCell
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      textAlign: "center",
                    }}
                    colSpan={1}
                  >
                    <ActionButtons
                      item={item}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} style={{ textAlign: "center" }}>
                  Không có sản phẩm nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination controls */}
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </>
  );
};

export default TableForm
