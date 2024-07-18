import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  TextField,
  Typography,
  CircularProgress,
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
  const [serviceGroupList, setServiceGroupList] = React.useState([]);

  const getData = async () => {
    await getGroupList();
    var array = [];
    //TOOD : IMPLEMENT SERVICE BACK END LOGIC HERE
    await axios
      .post("http://localhost:3001/api/service/get", {})
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vProduct,
              id: res.data.list[i].iProductID,
              categoryID: res.data.list[i].iCategoryID,
            });
          }
        }
        setRows(array);
      });
  };
  const getGroupList = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/service-group/get", {})
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          array.push({
            label: res.data.list[i].vCategory,
            id: res.data.list[i].iCategoryID,
          });
        }
      });
    setServiceGroupList(array);
  };
  useEffect(() => {
    getData();
    getGroupList();
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
      return rows.filter((row) => row.label.toLowerCase().includes(keyword));
    }
  }
  const handleDelete = async () => {
    //TODO : IMPLEMENT BACK END LOGIC
    axios
      .post("http://localhost:3001/api/service/delete", {
        id: deleteId,
      })
      .then(async (res) => {
        if (res.data.result) {
          setAlertMessage(res.data.message);
          setResult("success");
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
          <Link to="/service/add" state={{ list: rows }}>
            <Button startIcon={<Add />} variant="contained">
              Add
            </Button>
          </Link>
          <TextField
            style={{ minWidth: "20rem" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search by Service Name"
            variant="outlined"
          />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Service Group</TableCell>
                <TableCell align="right">Service</TableCell>

                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filter(search).map((row) => {
                return (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">
                      {
                        serviceGroupList.find((x) => x.id === row.categoryID)
                          .label
                      }
                    </TableCell>
                    <TableCell align="right">{row.label}</TableCell>
                    {/* <TableCell align="right">{row.isDeleted}</TableCell> */}

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
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => {
                          handleClickOpen(
                            "Are you sure?",
                            `You want to delete "${row.label}" service?`,
                            row.iProductID,
                          );
                        }}
                      >
                        <Delete />
                      </Button>
                      <Link
                        to={`/service/edit/`}
                        state={{
                          id: row.id,
                          serviceGroupID: row.categoryID,
                        }}
                      >
                        <Button size="small" variant="contained" color="info">
                          <Edit />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DrawerComponent>
    </>
  );
}
