import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
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
import { decodedToken } from "../../services/services_export";

export default function Admin() {
  const [rows, setRows] = React.useState([]);
  const getData = async () => {
    await axios.post("http://localhost:3001/api/admin/get", {}).then((res) => {
      setRows(res.data.list);
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
    console.log(id);
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
      return rows.filter((row) => {
        if (row.vFirstName.toLowerCase().includes(keyword)) {
          return row.vFirstName.toLowerCase().includes(keyword);
        } else {
          return row.vLastName.toLowerCase().includes(keyword);
        }
      });
    }
  }
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [1, 2, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12];
  const handleDelete = () => {
    //TODO : IMPLEMENT BACK END LOGIC
    axios
      .post("http://localhost:3001/api/admin/delete", {
        id: deleteId,
      })
      .then((res) => {
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
      <DrawerComponent title="Admin">
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
          {decodedToken.role.toLowerCase() == "admin" ? (
            <Link to="/admin/add">
              <Tooltip arrow title="Add Admin">
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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Email
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Status
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  align="center"
                >
                  Role
                </TableCell>
                {/* <TableCell align="right">Is Deleted</TableCell> */}
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
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filter(search).map((row) => {
                if (row.isDelete === "Yes") {
                  return null;
                } else {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">
                        {row.vFirstName} {row.vLastName}
                      </TableCell>
                      <TableCell align="center">{row.vEmail}</TableCell>
                      <TableCell align="center">{row.eStatus}</TableCell>
                      <TableCell align="center">{row.eRole}</TableCell>

                      {/* <TableCell align="right">{row.isDeleted}</TableCell> */}
                      <TableCell align="center">
                        {" "}
                        {
                          days[new Date(Date.parse(row.dtCreated)).getDay()]
                        }{" "}
                        {new Date(Date.parse(row.dtCreated)).getDate()}/
                        {months[new Date(Date.parse(row.dtCreated)).getMonth()]}
                        /{new Date(Date.parse(row.dtCreated)).getFullYear()}
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
                                handleDelete(row.iCategoryID);
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
                          variant="contained"
                          color="error"
                          style={{ margin: "5px" }}
                          onClick={() => {
                            console.log(row);
                            handleClickOpen(
                              "Are you sure?",
                              `You want to delete "${row.vFirstName} ${row.vLastName}" User?`,
                              row.iAdminID,
                            );
                          }}
                        >
                          <Delete />
                        </IconButton>
                        <Link to={`/admin/edit/`} state={{ id: row.iAdminID }}>
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
