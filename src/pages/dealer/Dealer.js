import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  TextField,
  Typography,
  TablePagination,
  Tooltip,
  IconButton,
  Divider,
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

export default function Dealer() {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [deleteId, setDeleteId] = React.useState();
  const [search, setSearch] = React.useState("");

  const [result, setResult] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const getData = async () => {
    await axios.post("http://localhost:3001/api/dealer/get", {}).then((res) => {
      setRows(res.data.list);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  // Update filter function to handle null and undefined values
  const filter = (keyword) => {
    if (keyword.length === 0) {
      return rows;
    } else {
      const lowercasedKeyword = keyword.toLowerCase();
      return rows.filter((row) => {
        const name = row.vDName ? row.vDName.toLowerCase() : "";
        const mobileno = row.vDMobileno ? row.vDMobileno.toLowerCase() : "";
        const email = row.vDEmail ? row.vDEmail.toLowerCase() : "";
        const city = row.vDCity ? row.vDCity.toLowerCase() : "";

        return (
          name.includes(lowercasedKeyword) ||
          mobileno.includes(lowercasedKeyword) ||
          email.includes(lowercasedKeyword) ||
          city.includes(lowercasedKeyword)
        );
      });
    }
  };

  const handleDelete = async (id) => {
    // TODO: IMPLEMENT BACK END LOGIC
    axios
      .post("http://localhost:3001/api/dealer/delete", {
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

  return (
    <>
      <DrawerComponent title="Dealer List">
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
            style={{ minWidth: "20rem" }}
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
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 25]}
              component="div"
              count={filter(search).length}
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
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Dealer</TableCell>
                <TableCell align="center">Contact Info</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filter(search).slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : filter(search)
              ).map((row) => {
                if (row.isDeleted === "Yes") {
                  return null;
                } else {
                  return (
                    <TableRow
                      align="center"
                      key={row.iDealerID}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.iDealerID}</TableCell>

                      <TableCell align="center">{row.vDName}</TableCell>
                      <TableCell align="center">{row.vDMobileno}</TableCell>
                      <TableCell
                        style={{
                          gap: "0.2rem",
                        }}
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
                                handleDelete(row.iDealerID);
                              }}
                              style={{ maxWidth: "1rem" }}
                              size="small"
                              variant="contained"
                              color="error"
                            >
                              <Typography>Yes</Typography>
                            </Button>

                            <Button
                              onClick={handleClose}
                              size="small"
                              style={{ maxWidth: "1rem" }}
                              variant="contained"
                              color="info"
                            >
                              <Typography>No</Typography>
                            </Button>
                          </div>
                        </DialogBoxComponent>
                        <IconButton
                          style={{ margin: "5px" }}
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleClickOpen(
                              "Are you sure?",
                              `You want to delete "${row.vDName}" Dealer?`,
                              row.iDealerID,
                            );
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <Link
                          to={`/dealer/edit/`}
                          style={{ margin: "5px" }}
                          state={{ id: row.iDealerID }}
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
            </TableBody>
          </Table>
        </TableContainer>
      </DrawerComponent>
    </>
  );
}
