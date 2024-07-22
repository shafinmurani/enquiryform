import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  TextField,
  Typography,
  TablePagination,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import DialogBoxComponent from "../../components/DialogBoxComponent";
import { company } from "../../services/services_export";
export default function Company() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [deleteId, setDeleteId] = React.useState();
  const [result, setResult] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const filteredRows = company.filter(search, rows);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getData = async () => {
    company.get().then((res) => {
      setRows(res.data.list);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClickOpen = (title, message, id) => {
    setOpen(true);
    setMessage(message);
    setTitle(title);
    setDeleteId(id);
    console.log(id);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setMessage("");
  };

  const handleDelete = () => {
    company.delete(deleteId).then((res) => {
      if (res.data.result) {
        setRows([]);
        getData();
      } else {
        setAlertMessage(res.data.message);
        setResult("error");
        handleClose();
      }
    });
  };

  return (
    <>
      <DrawerComponent title="Company List">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
        <Alert
          style={{
            width: "80%",
            display: result.length === 0 ? "none" : "",
            margin: "1rem",
          }}
          severity={result}
        >
          {alertMessage}
        </Alert>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Link to="/company/add">
            <Button startIcon={<Add />} variant="contained">
              Add
            </Button>
          </Link>
          <TextField
            style={{ minWidth: "20rem" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search by Company"
            variant="outlined"
          />
        </div>
        <TableContainer component={Paper}>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Company</TableCell>
                <TableCell align="right">Date Created</TableCell>
                <TableCell align="right">Date Modified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : filteredRows
              ).map((row) => {
                if (row.isDeleted === "Yes") {
                  return null;
                } else {
                  return (
                    <TableRow
                      key={row.iAccountID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.vAccount}</TableCell>
                      <TableCell align="right">{row.dtCreated}</TableCell>
                      <TableCell align="right">{row.dtModified}</TableCell>
                      <TableCell
                        style={{ display: "flex", gap: "1rem" }}
                        align="right"
                      >
                        <DialogBoxComponent
                          open={open}
                          onClose={handleClose}
                          title={title}
                          content={message}
                          style={{ padding: "1rem" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              margin: "1rem",
                              flexDirection: "row",
                              gap: "1rem",
                            }}
                          >
                            <Button
                              onClick={handleDelete}
                              size="small"
                              variant="contained"
                              color="error"
                            >
                              <Typography>Yes</Typography>
                            </Button>

                            <Button
                              onClick={handleClose}
                              size="small"
                              variant="contained"
                              color="info"
                            >
                              <Typography>No</Typography>
                            </Button>
                          </div>
                        </DialogBoxComponent>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleClickOpen(
                              "Are you sure?",
                              `You want to delete "${row.vAccount}" Company?`,
                              row.iAccountID,
                            );
                          }}
                        >
                          <Delete />
                        </Button>
                        <Link
                          to={`/company/edit/`}
                          state={{ id: row.iAccountID }}
                        >
                          <Button size="small" variant="contained" color="info">
                            <Edit />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DrawerComponent>
    </>
  );
}
