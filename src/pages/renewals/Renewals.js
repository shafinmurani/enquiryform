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
import dayjs from "dayjs";

export default function Renewals() {
  const [renewalRows, setRenewalRows] = React.useState([]);
  const [productGroupRows, setProductGroupRows] = React.useState([]);
  const [productRows, setProductRows] = React.useState([]);
  const [partyRows, setPartyRows] = React.useState([]);

  const getData = async () => {
    await axios
      .post("http://localhost:3001/api/renewals/get", {})
      .then((res) => {
        setRenewalRows(res.data.list);
      });
  };
  const getProductGroupData = () => {
    axios
      .post("http://localhost:3001/api/service-group/get", {})
      .then((res) => {
        var array = [];
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vCategory,
              id: res.data.list[i].iCategoryID,
            });
          }
        }
        setProductGroupRows(array);
      });
  };
  const getProductData = () => {
    axios.post("http://localhost:3001/api/service/get").then((res) => {
      var array = [];
      for (var i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].isDeleted == "No") {
          array.push({
            label: res.data.list[i].vProduct,
            id: res.data.list[i].iProductID,
            groupId: res.data.list[i].iCategoryID,
          });
        }
      }
      setProductRows(array);
    });
  };
  const getPartyData = () => {
    axios.post("http://localhost:3001/api/party/get", {}).then((res) => {
      var array = [];
      for (var i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].isDeleted == "No") {
          array.push({
            label: res.data.list[i].vParty,
            id: res.data.list[i].iPartyID,
          });
        }
      }
      setPartyRows(array);
    });
  };
  useEffect(() => {
    getProductData();
    getProductGroupData();
    getPartyData();
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
      return renewalRows;
    } else {
      return renewalRows.filter((row) =>
        row.vCompanyName.toLowerCase().includes(keyword),
      );
    }
  }
  const handleDelete = () => {
    //TODO : IMPLEMENT BACK END LOGIC
    axios
      .post("http://localhost:3001/api/renewals/delete", {
        id: deleteId,
      })
      .then((res) => {
        if (res.data.result) {
          setAlertMessage(res.data.message);
          setResult("success");
          setRenewalRows([]);
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
      <DrawerComponent title="Renewals">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Renewals</h1>
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
          <Link to="/renewals/add">
            <Button startIcon={<Add />} variant="contained">
              Add
            </Button>
          </Link>
          <TextField
            style={{ minWidth: "20rem" }}
            onChange={(e) => setSearch(e.target.value)}
            id="outlined-basic"
            label="Search by Product Name"
            variant="outlined"
          />
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Product</TableCell>
                <TableCell align="right">Register</TableCell>
                <TableCell align="right">Expiry</TableCell>
                <TableCell align="right">Party Details</TableCell>
                <TableCell align="right">Actions</TableCell>
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
                      <TableCell align="right">
                        {
                          productGroupRows.find(
                            (x) =>
                              x.id ==
                              productRows.find((x) => x.id == row.iProductID)
                                .groupId,
                          ).label
                        }

                        {productRows.find((x) => x.id == row.iProductID).label}
                      </TableCell>
                      {/* <TableCell align="right">{row.isDeleted}</TableCell> */}
                      <TableCell align="right">
                        {Date(Date.parse(row.dtRegister))}
                      </TableCell>
                      <TableCell align="right">
                        {Date(Date.parse(row.dtExpiry))}
                      </TableCell>
                      <TableCell align="right">{row.iPartyID}</TableCell>

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
                                handleDelete(row.iRenewalID);
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
                            console.log(row);
                            handleClickOpen(
                              "Are you sure?",
                              `You want to delete "${row.iRenewalID}" for ${row.iPartyID}?`,
                              row.iRenewalID,
                            );
                          }}
                        >
                          <Delete />
                        </Button>
                        <Link
                          to={`/company/edit/`}
                          state={{ id: row.iRenewalID }}
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
            </TableBody>
          </Table>
        </TableContainer>
      </DrawerComponent>
    </>
  );
}
