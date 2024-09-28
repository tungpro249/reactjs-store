import React from "react";
import { useTable, useSortBy, usePagination, Column, TableInstance, TableState } from "react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Define a generic type for your data
interface TableData {
  [key: string]: any;
}

// Extend TableInstance to include pagination properties
interface TableInstanceWithPagination<T extends object> extends TableInstance<T> {
  page: T[];
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  gotoPage: (updater: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (pageSize: number) => void;
  state: TableState<T> & {
    pageIndex: number;
    pageSize: number;
  };
}

const StyledTableHead = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.active,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

interface CustomTableProps<T extends TableData> {
  columns: Column<T>[]; // React Table's Column type
  data: T[]; // Array of data with generic type T
}

const CustomTable = <T extends TableData>({ columns, data }: CustomTableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0 } as Partial<TableState<T>>,
    },
    useSortBy,
    usePagination
  ) as TableInstanceWithPagination<T>; // Cast the instance to include pagination

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <StyledTableHead {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <StyledTableCell
                  // @ts-ignore
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  {column.render("Header")}
                </StyledTableCell>
              ))}
            </StyledTableHead>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row);
            return (
              <StyledTableRow {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell: any) => (
                  <StyledTableCell {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        onPageChange={(event, newPage) => gotoPage(newPage)}
        onRowsPerPageChange={(event) => {
          setPageSize(Number(event.target.value));
        }}
      />
    </TableContainer>
  );
};

export default CustomTable;
