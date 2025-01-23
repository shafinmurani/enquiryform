import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  TextField,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import AuthVerify from "../../components/AuthVerify";
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
import TablePagination from "@mui/material/TablePagination";
import { decodedToken, serviceGroup } from "../../services/services_export";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";
import FileUploadDialog from "../../components/FileUploadDialog";
import format from "../../asstes/service_group_format.png";
export default function ProductGroup() {
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [deleteId, setDeleteId] = React.useState();
  const [search, setSearch] = React.useState("");
  const [result, setResult] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getData = async () => {
    serviceGroup.get().then((res) => {
      setRows(res);
      setFilteredRows(res); // Initialize filteredRows with the full dataset
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      setFilteredRows(rows);
    } else {
      setFilteredRows(
        rows.filter((row) =>
          row.label.toLowerCase().includes(search.toLowerCase()),
        ),
      );
    }
  }, [search, rows]);

  const handleClickOpen = (title, message, id) => {
    setOpen(true);
    setMessage(message);
    setTitle(title);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setMessage("");
  };

  const handleDelete = async () => {
    axios
      .post("http://localhost:3001/api/service-group/delete", {
        id: deleteId,
      })
      .then(async (res) => {
        if (res.data.result) {
          getData();
          handleClose();
        } else {
          setAlertMessage(res.data.message);
          setResult("error");
          handleClose();
        }
      });
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [1, 2, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <>
      <AuthVerify />
      <DrawerComponent title="Service Group List">
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
            <div style={{ display: "flex", gap: "1rem", marginTop: "5px" }}>
              <Tooltip title="Export to CSV" arrow>
                <a href="http://localhost:3001/api/database/export/service-group">
                  <IconButton color="primary" variant="outlined">
                    <FileUploadIcon />
                  </IconButton>
                </a>
              </Tooltip>
              <Tooltip title="Import from Excel Sheet" arrow>
                <a>
                  <FileUploadDialog
                    get={getData}
                    path="service-group"
                    image={format}
                  />
                </a>
              </Tooltip>
              {decodedToken.role.toLowerCase() === "admin" ? (
                <Link to="/service-group/add">
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
                </Link>
              ) : null}
            </div>
          </div>
          <Divider />
          <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Service Group
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
              ).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.label}</TableCell>
                  <TableCell align="center">
                    {days[new Date(Date.parse(row.dtCreated)).getDay()]}{" "}
                    {new Date(Date.parse(row.dtCreated)).getDate()}/
                    {months[new Date(Date.parse(row.dtCreated)).getMonth()]}/
                    {new Date(Date.parse(row.dtCreated)).getFullYear()}
                  </TableCell>
                  <TableCell align="center">
                    {days[new Date(Date.parse(row.dtModified)).getDay()]}{" "}
                    {new Date(Date.parse(row.dtModified)).getDate()}/
                    {months[new Date(Date.parse(row.dtModified)).getMonth()]}/
                    {new Date(Date.parse(row.dtModified)).getFullYear()}
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
                          onClick={() => {
                            handleDelete(row.id);
                          }}
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
                      style={{ margin: "5px" }}
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleClickOpen(
                          "Are you sure?",
                          `You want to delete "${row.label}" service group?`,
                          row.id,
                        );
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <Link to={`/service-group/edit/`} state={{ id: row.id }}>
                      <IconButton
                        style={{ margin: "5px" }}
                        size="small"
                        variant="contained"
                        color="info"
                      >
                        <Edit />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DrawerComponent>
    </>
  );
}
