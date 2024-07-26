import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, TextField, Tooltip, Typography } from "@mui/material";
import { Add, Check, Clear, Delete, Download, Edit } from "@mui/icons-material";
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
import format from "../../asstes/renewal_upload_format.png";
import useWindowDimensions from "../../components/UseWindowDimensions";
import FileUploadDialog from "../../components/FileUploadDialog.js";
import { makeStyles } from "@mui/styles";
import Divider from "@mui/material/Divider";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import IconButton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import { decodedToken } from "../../services/services_export.js";

const useStyles = makeStyles({
  tableRow: {
    // height: 30,
  },
  tableCell: {
    // padding: "5px 16px",
  },
  tableHeadingCell: {
    // padding: "20px 16px",
    // fontWeight: "600",
  },
});

export default function Renewals() {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();

  const [renewalRows, setRenewalRows] = React.useState([]);
  const [productGroupRows, setProductGroupRows] = React.useState([]);
  const [productRows, setProductRows] = React.useState([]);
  const [partyRows, setPartyRows] = React.useState([]);
  const [companyRows, setCompanyRows] = React.useState([]);
  const [dealerRows, setDealerRows] = React.useState([]);
  const getData = async () => {
    try {
      var productDataRows = await getProductData();
      var productGroupDataRows = await getProductGroupData();
      var partyDataRows = await getPartyData();
      var companyDataRows = await getCompanyData();
      var dealerDataRows = await getDealerData();

      console.log(dealerDataRows);
      console.log(productDataRows);

      const response = await axios.post(
        "http://localhost:3001/api/renewals/get",
        { decodedToken },
      );
      const resData = response.data.list;
      const array = [];
      let srNo = 1;

      for (let i = 0; i < resData.length; i++) {
        if (resData[i].isDeleted === "No") {
          const partyData =
            partyDataRows.find((x) => x.id === resData[i].iPartyID) || {};
          const companyData =
            companyDataRows.find((x) => x.id === resData[i].iAccountID) || {};
          const dealerData =
            dealerDataRows.find((x) => x.id === resData[i].iDealerID) || {};
          const productData =
            productDataRows.find((x) => x.id === resData[i].iProductID) || {};
          const productGroupData =
            productGroupDataRows.find(
              (x) => x.id === (productData.groupId || -1),
            ) || {};

          array.push({
            srNo,
            partyData,
            companyData,
            dealerData,
            productData,
            productGroupData,
            iProductID: resData[i].iProductID,
            iCompanyID: resData[i].iAccountID,
            dtRegister: resData[i].dtRegister,
            dtExpiry: resData[i].dtExpiry,
            isActive: resData[i].eStatus === "Active",
            productType: resData[i].vType,
            remarks: resData[i].tRemarks,
            quantity: resData[i].iQty,
            id: resData[i].iRenewalID,
          });

          srNo += 1;
        }
      }

      console.log(array);
      setRenewalRows(array);
      setFilteredRows(array);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCompanyData = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/company/get", { decodedToken })
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vAccount,
              id: res.data.list[i].iAccountID,
              type: "company",
            });
          }
        }
      });
    setCompanyRows(array);
    return array;
  };

  const getDealerData = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/dealer/get", { decodedToken })
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vDName,
              id: res.data.list[i].iDealerID,
              type: "dealer",
            });
          }
        }
      });
    setDealerRows(array);
    return array;
  };
  const getProductGroupData = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/service-group/get", { decodedToken })
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vCategory,
              id: res.data.list[i].iCategoryID,
              type: "productGroup",
            });
          }
        }
      });
    setProductGroupRows(array);
    return array;
  };
  const getProductData = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/service/get", { decodedToken })
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vProduct,
              id: res.data.list[i].iProductID,
              groupId: res.data.list[i].iCategoryID,
              type: "product",
            });
          }
        }
        setProductRows(array);
      });
    return array;
  };
  const getPartyData = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/party/get", { decodedToken })
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vParty,
              id: res.data.list[i].iPartyID,
              phone: res.data.list[i].vCMobileno,
              email: res.data.list[i].vCEmail,
              name: res.data.list[i].vCName,
              type: "party",
            });
          }
        }
      });
    setPartyRows(array);
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

  const [statusFilter, setStatusFilter] = React.useState(null);

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

  const handleChange = (e, newVal) => {
    setFilters({
      ...filters,
      [newVal.type]: newVal,
    });
  };
  const [filters, setFilters] = React.useState({
    status: { label: "" },
    party: { label: "" },
    productGroup: { label: "" },
    product: { label: "" },
    company: { label: "" },
    dealer: { label: "" },
  });

  const filterData = () => {
    const filteredArray = renewalRows.filter((row) => {
      let isValid = true;

      // Filter by Status
      if (filters.status.label !== "") {
        isValid = isValid && row.isActive === filters.status.isActive;
      }

      // Filter by Party
      if (filters.party && filters.party.id) {
        isValid =
          isValid && row.partyData && row.partyData.id === filters.party.id;
      }

      // Filter by Product Group
      if (filters.productGroup.label !== "") {
        isValid =
          isValid &&
          row.productGroupData &&
          row.productGroupData.id === filters.productGroup.id;
      }

      // Filter by Product
      if (filters.product.label !== "") {
        isValid =
          isValid &&
          row.productData &&
          row.productData.id === filters.product.id;
      }

      // Filter by Company
      if (filters.company.label !== "") {
        isValid =
          isValid &&
          row.companyData &&
          row.companyData.id === filters.company.id;
      }

      // Filter by Dealer
      if (filters.dealer.label !== "") {
        isValid =
          isValid && row.dealerData && row.dealerData.id === filters.dealer.id;
      }

      return isValid;
    });

    setFilteredRows(filteredArray);
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
            flexDirection: "row",
            // justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <Autocomplete
            disablePortal
            disableClearable
            id="status"
            value={filters.status.label}
            onChange={(e, newVal) => {
              handleChange(e, newVal);
              console.log(filters);
            }}
            options={[
              { label: "Inactive", isActive: false, type: "status" },
              { label: "Active", isActive: true, type: "status" },
            ]}
            sx={{ width: 135 }}
            renderInput={(params) => (
              <TextField {...params} name="status" label="Status" />
            )}
          />
          <Autocomplete
            disablePortal
            disableClearable
            id="party"
            value={filters.party.label}
            onChange={(e, newVal) => {
              console.log(e);
              handleChange(e, newVal);
              console.log(filters);
            }}
            options={partyRows}
            sx={{ width: 135 }}
            renderInput={(params) => <TextField {...params} label="Party" />}
          />
          <Autocomplete
            disablePortal
            disableClearable
            id="productGroup"
            value={filters.productGroup.label}
            onChange={(e, newVal) => {
              console.log(e);
              handleChange(e, newVal);
              console.log(filters);
            }}
            options={productGroupRows}
            sx={{ width: 135 }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="productGroup"
                label="Product Groups"
              />
            )}
          />
          <Autocomplete
            disablePortal
            disableClearable
            id="productGroup"
            value={filters.product.label}
            onChange={(e, newVal) => {
              console.log(e);
              handleChange(e, newVal);
              console.log(filters);
            }}
            options={productRows.filter(
              (x) => x.groupId == filters.productGroup.id,
            )}
            sx={{ width: 135 }}
            renderInput={(params) => (
              <TextField {...params} name="product" label="Product" />
            )}
          />
          <Autocomplete
            disablePortal
            disableClearable
            id="company"
            value={filters.company.label}
            onChange={(e, newVal) => {
              console.log(e);
              handleChange(e, newVal);
              console.log(filters);
            }}
            options={companyRows}
            sx={{ width: 135 }}
            renderInput={(params) => (
              <TextField {...params} name="company" label="Company Account" />
            )}
          />
          <Autocomplete
            disablePortal
            disableClearable
            id="dealer"
            value={filters.dealer.label}
            onChange={(e, newVal) => {
              console.log(e);
              handleChange(e, newVal);
              console.log(filters);
            }}
            options={dealerRows}
            sx={{ width: 135 }}
            renderInput={(params) => (
              <TextField {...params} name="Dealer" label="Dealer" />
            )}
          />

          <div style={{ display: "flex", gap: "1rem" }}>
            <IconButton
              style={{ backgroundColor: "#1976d2", color: "white" }}
              onClick={(e) => {
                console.log(filters);
                filterData();
              }}
            >
              <FilterAltIcon />
            </IconButton>
            <IconButton
              style={{ backgroundColor: "#d32f2f", color: "white" }}
              onClick={(e) => {
                setFilters({
                  status: { label: "" },
                  party: { label: "" },
                  productGroup: { label: "" },
                  product: { label: "" },
                  company: { label: "" },
                  dealer: { label: "" },
                });
                getData();
              }}
            >
              <ClearIcon />
            </IconButton>
          </div>
          {/* <TextField
            style={{ minWidth: "20rem" }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            id="outlined-basic"
            label="Search by Product Name"
            variant="outlined"
          /> */}
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
              count={filteredRows.length}
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
          <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
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
                ? filteredRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage,
                  )
                : filteredRows
              ).map((row) => (
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableCell} align="center">
                    {row.srNo}
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    <span>{row.productData.label}</span> <br />
                    <span style={{ fontWeight: 600 }}>
                      {row.productGroupData.label}
                    </span>{" "}
                    <span style={{ fontWeight: 600, color: "blue" }}>
                      {row.quantity}
                    </span>{" "}
                    <span style={{ fontWeight: 600, color: "red" }}>
                      for {row.productType}
                    </span>
                    <br />
                    <span style={{ fontWeight: 200 }}>
                      {row.companyData.label}
                    </span>
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

                    <Link
                      to={`/renewals/edit/`}
                      state={{ id: row.id, redirect: "/renewals" }}
                    >
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
