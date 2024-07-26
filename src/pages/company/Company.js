import React, { useEffect, useState } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  TextField,
  Typography,
  TablePagination,
} from "@mui/material";
import { Tooltip, Divider } from "@mui/material";
import FileUploadDialog from "../../components/FileUploadDialog";
import format from "../../asstes/service_group_format.png";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";
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
import { company, decodedToken } from "../../services/services_export";
export default function Company() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [deleteId, setDeleteId] = useState();
  const [result, setResult] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const filteredRows = company.filter(search, rows);
  const [decodedJwt, setDecodedJwt] = useState(decodedToken);
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
    handleClose();
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [1, 2, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12];

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
          <TextField
            size="small"
            style={{ minWidth: "17rem" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />
        </div>
        <TableContainer component={Paper}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // paddingBlock: "0.8rem",
              paddingInline: "1rem",
            }}
          >
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 25]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Tooltip title="Export to CSV" arrow>
                <a href="http://localhost:3001/api/database/export/company">
                  <IconButton color="primary" variant="outlined">
                    <FileUploadIcon />
                  </IconButton>
                </a>
              </Tooltip>
              <Tooltip title="Import from Excel Sheet" arrow>
                <a>
                  <FileUploadDialog
                    get={getData}
                    path="company"
                    image={format}
                  />
                </a>
              </Tooltip>
              {decodedJwt.role == "Admin" ? (
                <Link to="/company/add">
                  <Tooltip arrow title="Add Company">
                    <IconButton
                      size="small"
                      style={{
                        backgroundColor: "#00a9d1",
                        color: "white",
                        marginTop: "3px",
                      }}
                      variant="contained"
                    >
                      <Add />
                    </IconButton>
                  </Tooltip>
                </Link>
              ) : null}
            </div>
          </div>
          <Divider />
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Company
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Date Created
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Date Modified
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Actions
                </TableCell>
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
                      <TableCell align="center">{row.vAccount}</TableCell>
                      <TableCell align="center">
                        {days[new Date(Date.parse(row.dtCreated)).getDay()]}{" "}
                        {new Date(Date.parse(row.dtCreated)).getDate()}/
                        {months[new Date(Date.parse(row.dtCreated)).getMonth()]}
                        /{new Date(Date.parse(row.dtCreated)).getFullYear()}
                      </TableCell>
                      <TableCell align="center">
                        {days[new Date(Date.parse(row.dtModified)).getDay()]}{" "}
                        {new Date(Date.parse(row.dtModified)).getDate()}/
                        {
                          months[
                            new Date(Date.parse(row.dtModified)).getMonth()
                          ]
                        }
                        /{new Date(Date.parse(row.dtModified)).getFullYear()}
                      </TableCell>
                      <TableCell
                        // style={{ display: "flex", gap: "1rem" }}
                        align="center"
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
                        <IconButton
                          size="small"
                          variant="contained"
                          color="error"
                          style={{ margin: "5px" }}
                          onClick={() => {
                            handleClickOpen(
                              "Are you sure?",
                              `You want to delete "${row.vAccount}" Company?`,
                              row.iAccountID,
                            );
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <Link
                          style={{ margin: "5px" }}
                          to={`/company/edit/`}
                          state={{ id: row.iAccountID }}
                        >
                          <IconButton
                            size="small"
                            variant="contained"
                            color="info"
                          >
                            <Edit />
                          </IconButton>
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
