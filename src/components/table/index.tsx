import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import ActionButtons from "./actionButtons";
import { useTable, usePagination, TableInstance } from "react-table";
import MDImage from "components/ui/MDImage";
import Toolbar from "./toolbar";

interface TableData {
  name: string;
  image: string;
  category: { name: string };
  date_created: string;
}

interface TableInstanceWithPagination extends TableInstance<TableData> {
  page: TableData[];
  gotoPage: (updater: number) => void;
  setPageSize: (size: number) => void;
  state: {
    pageIndex: number;
    pageSize: number;
  };
}
const TableForm = React.memo(
  ({
    columns,
    data,
    handleDelete,
    handleEdit,
    headerTitle,
    isCreate,
    handleAdd,
    isUploadFileExcel,
  }: {
    columns: any;
    data: any;
    handleDelete?: Function;
    handleEdit?: Function;
    handleAdd?: () => void;
    headerTitle: string;
    isCreate?: boolean;
    isUploadFileExcel?: boolean;
  }) => {
    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memoizedData = React.useMemo(() => data, [data]);

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      state: { pageIndex, pageSize },
      gotoPage,
      setPageSize,
    } = useTable(
      {
        columns: memoizedColumns,
        data: memoizedData,
        initialState: { pageIndex: 0, pageSize: 10 },
      },
      usePagination
    ) as TableInstanceWithPagination;

    const handleChangePage = React.useCallback(
      (event: unknown, newPage: number) => {
        gotoPage(newPage);
      },
      [gotoPage]
    );

    const handleChangeRowsPerPage = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(Number(event.target.value));
      },
      [setPageSize]
    );
    const renderTableCell = (cell: any) => {
      const columnId = cell.column.id;
      const value = cell.value;
      switch (columnId) {
        case "image":
          return <MDImage src={value} alt={cell.row.original.name} width={100} height={100} />;
        case "category":
          return cell.row.original.category?.name;
        case "date_created":
          return <div>{new Date(value).toLocaleString()}</div>;
        default:
          return value;
      }
    };
    return (
      <>
        <Toolbar
          headerTitle={headerTitle}
          isCreate={isCreate}
          isUploadFileExcel={isUploadFileExcel}
          handleAdd={handleAdd}
        />
        <TableContainer style={{ borderRadius: "12px" }}>
          <Table
            {...getTableProps()}
            style={{
              border: "1px solid rgba(0, 0, 0, 0.1)",
              background: "#cfcccc",
            }}
          >
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  <TableCell
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textAlign: "center",
                      width: "1%",
                    }}
                  >
                    STT
                  </TableCell>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      {...column.getHeaderProps()}
                      style={{
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      {column.render("Header")}
                    </TableCell>
                  ))}
                  <TableCell
                    key="action-header"
                    style={{
                      border: "1px solid rgba(0, 0, 0, 0.1)",
                      fontWeight: "bold",
                      fontSize: "18px",
                      textAlign: "center",
                      width: "10%",
                    }}
                  >
                    Hành động
                  </TableCell>
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.length > 0 ? (
                page.map((row, index) => {
                  prepareRow(row);
                  return (
                    // @ts-ignore
                    <TableRow {...row.getRowProps()}>
                      <TableCell
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          textAlign: "center",
                          fontSize: "17px",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      {/* @ts-ignore */}
                      {row.cells.map((cell: any) => (
                        <TableCell
                          {...cell.getCellProps()}
                          style={{
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            width: "20%",
                            fontSize: "17px",
                          }}
                        >
                          {renderTableCell(cell)}
                        </TableCell>
                      ))}
                      <TableCell
                        style={{
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          textAlign: "center",
                        }}
                        colSpan={1}
                      >
                        <ActionButtons
                          // @ts-ignore
                          item={row.original}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
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
        <TablePagination
          component="div"
          count={data.length}
          page={pageIndex}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Số hàng mỗi trang:"
        />
      </>
    );
  }
);

export default TableForm;
