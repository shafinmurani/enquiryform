import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, TextField, Tooltip, Typography } from "@mui/material";
import {
  Add,
  Check,
  Clear,
  Delete,
  Download,
  Edit,
  ImportExport,
} from "@mui/icons-material";
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
import TablePagination from "@mui/material/TablePagination";
import useWindowDimensions from "../../components/UseWindowDimensions";
import FileUploadDialog from "../../components/FileUploadDialog.js";
import format from "../../asstes/renewal_upload_format.png";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";

const useStyles = makeStyles({
  tableRow: {
    height: 30,
  },
  tableCell: {
    padding: "8px 16px",
  },
  tableHeadingCell: {
    padding: "20px 16px",
    fontWeight: "600",
  },
});

export default function Renewals() {
  const classes = useStyles();

  const { height, width } = useWindowDimensions();

  const [renewalRows, setRenewalRows] = React.useState([]);
  const [productGroupRows, setProductGroupRows] = React.useState([]);
  const [productRows, setProductRows] = React.useState([]);
  const [partyRows, setPartyRows] = React.useState([]);
  const getData = async () => {
    var productDataRows = await getProductData();
    var prodcutGroupDataRows = await getProductGroupData();
    var partyDataRows = await getPartyData();
    console.log(productDataRows);
    await axios
      .post("http://localhost:3001/api/renewals/get", {})
      .then((res) => {
        var array = [];
        var srNo = 1;
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              srNo,
              partyData: partyDataRows.find(
                (x) => x.id == res.data.list[i].iPartyID,
              ),
              productData: productDataRows.find(
                (x) => x.id == res.data.list[i].iProductID,
              ),
              productGroupData: prodcutGroupDataRows.find(
                (x) =>
                  x.id ==
                  productDataRows.find(
                    (x) => x.id == res.data.list[i].iProductID,
                  ).groupId,
              ),
              iProductID: res.data.list[i].iProductID,
              dtRegister: res.data.list[i].dtRegister,
              dtExpiry: res.data.list[i].dtExpiry,
              isActive: res.data.list[i].eStatus == "Active" ? true : false,
              productType: res.data.list[i].vType,
              remarks: res.data.list[i].tRemarks,
              quantity: res.data.list[i].iQty,
              id: res.data.list[i].iRenewalID,
            });
            srNo = srNo + 1;
          }
        }
        setRenewalRows(array);
      });
  };
  const getProductGroupData = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/service-group/get", {})
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vCategory,
              id: res.data.list[i].iCategoryID,
            });
          }
        }
      });
    return array;
  };
  const getProductData = async () => {
    var array = [];
    await axios.post("http://localhost:3001/api/service/get").then((res) => {
      for (var i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].isDeleted == "No") {
          array.push({
            label: res.data.list[i].vProduct,
            id: res.data.list[i].iProductID,
            groupId: res.data.list[i].iCategoryID,
          });
        }
      }
    });
    return array;
  };
  const getPartyData = async () => {
    var array = [];
    await axios.post("http://localhost:3001/api/party/get", {}).then((res) => {
      for (var i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].isDeleted == "No") {
          array.push({
            label: res.data.list[i].vParty,
            id: res.data.list[i].iPartyID,
            phone: res.data.list[i].vCMobileno,
            email: res.data.list[i].vCEmail,
            name: res.data.list[i].vCName,
          });
        }
      }
    });
    return array;
  };
  useEffect(() => {
    getData();
  }, []);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [deleteId, setDeleteId] = React.useState();
  const [search, setSearch] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [result, setResult] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [1, 2, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12];

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
    //TODO : IMPLEMENT BACK END LOGIC
    console.log(deleteId);
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

  const handleSetInactive = (id) => {
    axios
      .post("http://localhost:3001/api/renewals/set-inactive", {
        id: id,
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

  const handleSetActive = (id) => {
    axios
      .post("http://localhost:3001/api/renewals/set-active", {
        id: id,
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - renewalRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <DrawerComponent title="Renewals">
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
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            id="outlined-basic"
            label="Search by Product Name"
            variant="outlined"
          />
        </div>
        <TableContainer component={Paper}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBlock: "0.8rem",
              paddingInline: "1rem",
            }}
          >
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 25]}
              component="div"
              count={renewalRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div style={{ display: "flex", gap: "1rem" }}>
              <Tooltip title="Export to CSV" arrow>
                <a href="http://localhost:3001/api/database/export/renewals">
                  <IconButton color="primary" variant="outlined">
                    <FileUploadIcon />
                  </IconButton>
                </a>
              </Tooltip>
              <Tooltip title="Import from Excel Sheet" arrow>
                <a>
                  <FileUploadDialog image={format} />
                </a>
              </Tooltip>
              <Tooltip title="Add Renewal" arrow>
                <Link to="/renewals/add">
                  <IconButton
                    style={{ backgroundColor: "#00a9d1", color: "white" }}
                    variant="contained"
                  >
                    <Add />
                  </IconButton>
                </Link>
              </Tooltip>
            </div>
          </div>
          <Divider />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell className={classes.tableHeadingCell} align="center">
                  Sr. No.
                </TableCell>
                <TableCell className={classes.tableHeadingCell} align="center">
                  Product
                </TableCell>
                <TableCell className={classes.tableHeadingCell} align="center">
                  Register
                </TableCell>
                <TableCell className={classes.tableHeadingCell} align="center">
                  Expiry
                </TableCell>
                <TableCell className={classes.tableHeadingCell} align="center">
                  Party Details
                </TableCell>
                <TableCell className={classes.tableHeadingCell} align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? renewalRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : renewalRows
              ).map((row) => (
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableCell} align="center">
                    {row.srNo}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    {console.log(row)}
                    Category: {row.productGroupData.label}
                    <br />
                    {row.productData.label} for {row.productType}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    {days[new Date(Date.parse(row.dtRegister)).getDay()]}{" "}
                    {new Date(Date.parse(row.dtRegister)).getDate()}/
                    {months[new Date(Date.parse(row.dtRegister)).getMonth()]}/
                    {new Date(Date.parse(row.dtRegister)).getFullYear()}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    {/* {Date.parse(row.dtExpiry)} */}{" "}
                    {days[new Date(Date.parse(row.dtExpiry)).getDay()]}{" "}
                    {new Date(Date.parse(row.dtExpiry)).getDate()}/
                    {months[new Date(Date.parse(row.dtExpiry)).getMonth()]}/
                    {new Date(Date.parse(row.dtExpiry)).getFullYear()}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    {row.partyData.label}

                    <br />
                    {row.partyData.phone}
                    <br />
                    {row.partyData.email}
                    <br />
                  </TableCell>

                  <TableCell
                    className={classes.tableCell}
                    style={{ maxWidth: "8rem" }}
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
                      style={
                        width >= 840
                          ? { marginInline: "0rem" }
                          : { marginInline: "0rem" }
                      }
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => {
                        handleClickOpen(
                          "Are you sure?",
                          `You want to delete "${row.productData.label}" for ${row.partyData.label}?`,
                          row.id,
                        );
                      }}
                    >
                      <Delete />
                    </IconButton>

                    <Link to={`/renewals/edit/`} state={{ id: row.id }}>
                      <IconButton
                        style={
                          width >= 840
                            ? { marginInline: "0.1rem" }
                            : { marginInline: "0rem" }
                        }
                        size="small"
                        variant="contained"
                        color="info"
                      >
                        <Edit />
                      </IconButton>
                    </Link>
                    {row.isActive ? (
                      <Tooltip
                        onClick={() => {
                          handleSetInactive(row.id);
                        }}
                        title="Set Inactive"
                        variant="soft"
                      >
                        <IconButton
                          size="small"
                          variant="contained"
                          color="warning"
                          style={{ backgroundColor: "#418944" }}
                        >
                          <Check style={{ color: "white" }} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip
                        onClick={() => {
                          handleSetActive(row.id);
                        }}
                        title="Set Active"
                        variant="soft"
                      >
                        <IconButton
                          style={{ backgroundColor: "#ed6c02" }}
                          size="small"
                          variant="contained"
                        >
                          <Clear style={{ color: "white" }} />
                        </IconButton>
                      </Tooltip>
                    )}
                    {/* </div> */}
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
