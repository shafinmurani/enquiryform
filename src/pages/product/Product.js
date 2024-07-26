import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  TextField,
  Typography,
  CircularProgress,
  TablePagination,
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
import { decodedToken, serviceGroup } from "../../services/services_export";

export default function ProductGroup() {
  const [rows, setRows] = React.useState([]);
  const [serviceGroupList, setServiceGroupList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");

  // Filter rows based on the search input (both service name and service group)
  const filteredRows = search
    ? rows.filter((row) => {
        const serviceGroupLabel =
          serviceGroupList
            .find((group) => group.id === row.categoryID)
            ?.label.toLowerCase() || "";

        return (
          row.label.toLowerCase().includes(search.toLowerCase()) ||
          serviceGroupLabel.includes(search.toLowerCase())
        );
      })
    : rows;

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
    await getGroupList();
    var array = [];
    //TODO : IMPLEMENT SERVICE BACK END LOGIC HERE
    await axios
      .post("http://localhost:3001/api/service/get", {})
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (decodedToken.role.toLowerCase() == "admin") {
            // ADD ALL DATA
            if (res.data.list[i].isDeleted === "No") {
              array.push({
                label: res.data.list[i].vProduct,
                id: res.data.list[i].iProductID,
                categoryID: res.data.list[i].iCategoryID,
              });
            }
          } else {
            if (
              decodedToken.moduleFilter.includes(res.data.list[i].iCategoryID)
            ) {
              if (res.data.list[i].isDeleted === "No") {
                array.push({
                  label: res.data.list[i].vProduct,
                  id: res.data.list[i].iProductID,
                  categoryID: res.data.list[i].iCategoryID,
                });
              }
              // ADD ONLY REQUIRED DATA
            }
          }
        }
        setRows(array);
      });
  };

  const getGroupList = async () => {
    serviceGroup.get().then((res) => {
      setServiceGroupList(res);
    });
  };

  useEffect(() => {
    getData();
    getGroupList();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [deleteId, setDeleteId] = React.useState();
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

  const handleDelete = async () => {
    //TODO : IMPLEMENT BACK END LOGIC
    axios
      .post("http://localhost:3001/api/service/delete", {
        id: deleteId,
      })
      .then(async (res) => {
        if (res.data.result) {
          setRows([]);
          getData();
          getGroupList();
          handleClose();
        } else {
          setAlertMessage(res.data.message);
          setResult("error");
        }
      });
  };

  if (serviceGroupList === null) {
    return (
      <>
        <DrawerComponent>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </div>
        </DrawerComponent>
      </>
    );
  }

  return (
    <>
      <DrawerComponent title="Services List">
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
          <Link to="/service/add" state={{ list: rows }}>
            <Button startIcon={<Add />} variant="contained">
              Add
            </Button>
          </Link>
          <TextField
            style={{ minWidth: "20rem" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search by Service Name or Group"
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
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Service Group</TableCell>
                <TableCell align="center">Service</TableCell>
                <TableCell align="center">Actions</TableCell>
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
                  <TableCell align="center" component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="center">
                    {
                      serviceGroupList.find((x) => x.id === row.categoryID)
                        .label
                    }
                  </TableCell>
                  <TableCell align="center">{row.label}</TableCell>

                  <TableCell align="center">
                    <DialogBoxComponent
                      open={open}
                      onClose={handleClose}
                      title={title}
                      content={message}
                      style={{ padding: "1rem" }}
                    >
                      <div
                        style={{
                          margin: "1rem",
                          flexDirection: "row",
                          gap: "1rem",
                        }}
                      >
                        <Button
                          onClick={() => handleDelete(row.id)}
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
                          `You want to delete "${row.label}" service?`,
                          row.id,
                        );
                      }}
                    >
                      <Delete />
                    </IconButton>
                    <Link
                      to={`/service/edit/`}
                      state={{
                        id: row.id,
                        serviceGroupID: row.categoryID,
                      }}
                    >
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
