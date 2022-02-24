import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  IconButton,
} from "@material-ui/core";
import {
  EditOutlined,
  DeleteOutline,
  VisibilityOutlined,
} from "@material-ui/icons";
import { useQuery, useQueryClient } from "react-query";

import Spinner from "./Spinner";
import { getEvents, deleteEvent } from "../api/events";
import Pagination from "./Pagination";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function CustomizedTables({ state, setState, rowId, setRowId }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const params = {
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  };
  const queryClient = useQueryClient();

  const { isLoading, isError, isFetching, data } = useQuery(
    // query key
    ["events", { page, pageSize }],
    () => getEvents(params),
    {
      keepPreviousData: true,
      select: (response) => response.data,
    }
  );

  // console.log(data, "iki datane");
  const onDelete = (id) => {
    MySwal.fire({
      icon: "error",
      title: <p>Are You Sure ?</p>,
      text: "Do you really want to delete these records ? this process cannot be undone.",
      showConfirmButton: false,
      showCancelButton: true,
      showDenyButton: true,
      denyButtonText: `Don't save`,
      confirmButtonText: "Save",
    }).then(async (result) => {
      if (result.isDenied) {
        try {
          await deleteEvent(id);
          MySwal.fire("Deleted!", "Your file has been deleted.", "success");
          queryClient.invalidateQueries("events");
        } catch (error) {
          MySwal.fire("Failed!", "Internal server error", "error");
        }
      }
    });
  };

  return (
    <Box style={{ position: "relative", minHeight: 300 }}>
      <Spinner isLoading={isLoading} isFetching={isFetching} empty={false} />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Event Name</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Time</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.attributes.event_name}
                </StyledTableCell>
                <StyledTableCell>{row.attributes.date}</StyledTableCell>
                <StyledTableCell>{row.attributes.time}</StyledTableCell>
                <StyledTableCell>{row.attributes.location}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => {
                      setState("edit");
                      setRowId(row.id);
                    }}
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setState("view");
                      setRowId(row.id);
                    }}
                  >
                    <VisibilityOutlined />
                  </IconButton>
                  <IconButton onClick={() => onDelete(row.id)}>
                    <DeleteOutline />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        total={data?.meta?.pagination?.total}
        count={data?.meta?.pagination?.pageCount}
      />
    </Box>
  );
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
