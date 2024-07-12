import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, TextField, Typography } from "@mui/material";
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

export default function ProductGroup() {
  const [rows, setRows] = React.useState([]);
  const getData = async () => {
    await axios
      .post("http://localhost:3001/api/service-group/get", {})
      .then((res) => {
        var array = [];
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vCategory,
              id: res.data.list[i].iCategoryID,
              dtCreated: res.data.list[i].dtCreated,
              dtModified: res.data.list[i].dtModified,
            });
          }
        }
        setRows(array);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [deleteId, setDeleteId] = React.useState();
  const [search, setSearch] = React.useState("");

  const [result, setResult] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

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
  function filter(keyword) {
    if (keyword.length === 0) {
      return rows;
    } else {
      return rows.filter((row) =>
        row.vCategory.toLowerCase().includes(keyword),
      );
    }
  }
  const handleDelete = async () => {
    //TODO : IMPLEMENT BACK END LOGIC
    axios
      .post("http://localhost:3001/api/service-group/delete", {
        id: deleteId,
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <DrawerComponent title="Service Group List">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Service Group</h1>
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
          <Link to="/service-group/add">
            <Button startIcon={<Add />} variant="contained">
              Add
            </Button>
          </Link>
          <TextField
            style={{ minWidth: "20rem" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search by Service Group"
            variant="outlined"
          />
        </div>
        <TableContainer component={Paper}>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Service Group</TableCell>
                {/* <TableCell align="right">Is Deleted</TableCell> */}
                <TableCell align="right">Date Created</TableCell>
                <TableCell align="right">Date Modified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : rows
              ).map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">{row.label}</TableCell>
                  {/* <TableCell align="right">{row.isDeleted}</TableCell> */}
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
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleClickOpen(
                          "Are you sure?",
                          `You want to delete "${row.label}" product group?`,
                          row.id,
                        );
                      }}
                    >
                      <Delete />
                    </Button>
                    <Link to={`/service-group/edit/`} state={{ id: row.id }}>
                      <Button size="small" variant="contained" color="info">
                        <Edit />
                      </Button>
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
