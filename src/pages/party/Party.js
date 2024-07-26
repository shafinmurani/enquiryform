import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  TextField,
  Typography,
  TablePagination,
  Divider,
  Tooltip,
  IconButton,
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

export default function ProductGroup() {
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

  // Fetch data
  const getData = async () => {
    await axios.post("http://localhost:3001/api/party/get", {}).then((res) => {
      setRows(res.data.list);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search filtering
  function filter(keyword) {
    if (keyword.length === 0) {
      return rows;
    } else {
      return rows.filter((row) =>
        [
          row.vParty,
          row.vCName,
          row.vCity,
          row.vCMobileno,
          row.vCEmail,
          row.tAddress,
        ].some(
          (field) =>
            field && field.toLowerCase().includes(keyword.toLowerCase()),
        ),
      );
    }
  }

  // Handle delete
  const handleDelete = async (id) => {
    //TODO : IMPLEMENT BACK END LOGIC
    axios
      .post("http://localhost:3001/api/party/delete", {
        id: id,
      })
      .then(async (res) => {
        if (res.data.result) {
          setAlertMessage(res.data.message);
          setResult("success");
          setRows([]);
          getData();
          handleClose();
        } else {
          setAlertMessage(res.data.message);
          setResult("error");
          handleClose();
        }
      });
  };

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

  // Filtered rows based on search input
  const filteredRows = filter(search);

  // Paginated rows
  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <>
      <DrawerComponent title="Party List">
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
            style={{ minWidth: "17rem" }}
            size="small"
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />
        </div>
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
        <TableContainer component={Paper}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
            <div
              style={{
                display: "flex",
                marginInline: "1rem",
                marginTop: "4px",
              }}
            >
              <Link to="/party/add">
                <Tooltip arrow title="Add Party">
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
                  ID
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Party
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Contact Information
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Address
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
              {paginatedRows.map((row) => {
                if (row.isDeleted === "Yes") {
                  return null;
                } else {
                  return (
                    <TableRow
                      align="center"
                      key={row.iPartyID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.iPartyID}</TableCell>

                      <TableCell align="center">{row.vParty}</TableCell>
                      <TableCell align="center">
                        {row.vCName}
                        <br />
                        {row.vCity}
                        <br />
                        {row.vCMobileno}
                        <br />
                        {row.vCEmail}
                        <br />
                      </TableCell>
                      <TableCell style={{ maxWidth: "12rem" }} align="center">
                        {row.tAddress}
                      </TableCell>
                      <TableCell style={{}} align="center">
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
                              onClick={() => handleDelete(deleteId)}
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
                          style={{ margin: "5px" }}
                          onClick={() =>
                            handleClickOpen(
                              "Are you sure?",
                              `You want to delete "${row.vParty}" party?`,
                              row.iPartyID,
                            )
                          }
                        >
                          <Delete />
                        </Button>
                        <Link
                          style={{ margin: "5px" }}
                          to={`/party/edit/`}
                          state={{ id: row.iPartyID }}
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
                <TableRow style={{ height: 53 * emptyRows }}>
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
