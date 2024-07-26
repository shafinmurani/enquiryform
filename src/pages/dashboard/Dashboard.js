import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Alert,
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
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
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ClearIcon from "@mui/icons-material/Clear";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { decodedToken } from "../../services/services_export.js";

const useStyles = makeStyles({
  tableRow: {
    height: 30,
  },
  tableCell: {
    padding: "5px 16px",
  },
  tableHeadingCell: {
    // padding: "20px 16px",
    fontWeight: "600",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();

  const [renewalRows, setRenewalRows] = React.useState([]);
  const [productGroupRows, setProductGroupRows] = React.useState([]);
  const [productRows, setProductRows] = React.useState([]);
  const [partyRows, setPartyRows] = React.useState([]);
  const [companyRows, setCompanyRows] = React.useState([]);
  const [dealerRows, setDealerRows] = React.useState([]);
  const [expiringGroups, setExpiringGroups] = React.useState([]);
  const getData = async () => {
    var productDataRows = await getProductData();
    var prodcutGroupDataRows = await getProductGroupData();
    var partyDataRows = await getPartyData();
    var companyDataRows = await getCompanyData();
    var dealerDataRows = await getDealerData();
    await axios
      .post("http://localhost:3001/api/renewals/get", { decodedToken })
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
              companyData: companyDataRows.find(
                (x) => x.id == res.data.list[i].iAccountID,
              ),
              dealerData: dealerDataRows.find(
                (x) => x.id == res.data.list[i].iDealerID,
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
              iCompanyID: res.data.list[i].iAccountID,
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
        console.log(array);
        setRenewalRows(array);
        setExpiryMonthYearFilter(dayjs(new Date()));
      });
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
    await axios.post("http://localhost:3001/api/party/get", {}).then((res) => {
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

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [deleteId, setDeleteId] = React.useState();
  const [search, setSearch] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [result, setResult] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [selectedServiceGroup, setSelectedServiceGroup] = React.useState(null);

  const handleFilterByServiceGroup = (groupLabel) => {
    setSelectedServiceGroup(groupLabel);
  };
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

  const handleSetInactive = (id) => {
    axios
      .post("http://localhost:3001/api/renewals/set-inactive", {
        id: id,
      })
      .then((res) => {
        if (res.data.result) {
          // setAlertMessage(res.data.message);
          // setResult("success");
          setRenewalRows([]);
          getData();
          filterData();
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
          // setAlertMessage(res.data.message);
          // setResult("success");
          setRenewalRows([]);
          getData();
          filterData();
          handleClose();
        } else {
          setAlertMessage(res.data.message);
          setResult("error");
          handleClose();
        }
      });
    setExpiryMonthYearFilter(expiryMonthYearFilter);
  };

  const clearFilter = () => {
    setExpiryMonthYearFilter(dayjs(new Date()));
    setSearch("");
    setStatusFilter(null);
    setSelectedServiceGroup();
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [expiryMonthYearFilter, setExpiryMonthYearFilter] = React.useState(
    dayjs(new Date()),
  );

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

  const handleChange = (e, newVal) => {};

  const filterData = async () => {
    const filteredData = renewalRows.filter((row) => {
      const searchString =
        row.partyData?.label +
        row.companyData?.label +
        row.productData?.label +
        row.productGroupData?.label +
        row.partyData?.phone +
        row.partyData?.email +
        row.productType +
        row.remarks +
        row.dealerData?.label;
      const matchSearch = searchString
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchExpiryMonthYear = expiryMonthYearFilter
        ? dayjs(row.dtExpiry).format("MM-YYYY") ===
          expiryMonthYearFilter.format("MM-YYYY")
        : true;

      const matchServiceGroup = selectedServiceGroup
        ? row.productGroupData?.label === selectedServiceGroup
        : true;

      return matchSearch && matchExpiryMonthYear && matchServiceGroup;
    });

    setFilteredRows(filteredData);
    const serviceGroupCounts = new Map();
    filteredData.forEach((row) => {
      if (row.productGroupData?.label) {
        const label = row.productGroupData.label;
        if (serviceGroupCounts.has(label)) {
          serviceGroupCounts.set(label, serviceGroupCounts.get(label) + 1);
        } else {
          serviceGroupCounts.set(label, 1);
        }
      }
    });

    const serviceGroupArray = Array.from(
      serviceGroupCounts,
      ([label, count]) => ({
        label,
        count,
      }),
    );

    // serviceGroupArray.sort((a, b) => a.localeCompare(b));

    setExpiringGroups(
      serviceGroupArray.sort((a, b) => a.label.localeCompare(b.label)),
    );
  };
  useEffect(() => {
    if (decodedToken == null) {
      window.location.reload();
    }
    getData();
  }, []);
  useEffect(() => {
    filterData();
  }, [search, statusFilter, expiryMonthYearFilter, selectedServiceGroup]);
  return (
    <>
      <DrawerComponent isHome={true} title="Dashboard">
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
            justifyContent: "space-between",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "space-around",
              // marginBottom: "1rem",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={["year", "month"]}
                slotProps={{ textField: { size: "small" } }}
                label="Expiry Month-Year"
                value={expiryMonthYearFilter}
                onChange={(newValue) => {
                  console.log(newValue);
                  setExpiryMonthYearFilter(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} sx={{ marginRight: 2 }} />
                )}
              />
            </LocalizationProvider>
            <div style={{ display: "flex", gap: "1rem" }}>
              <IconButton
                size="small"
                color="primary" // style={{ backgroundColor: "#1976d2", color: "white" }}
                onClick={(e) => {
                  filterData();
                }}
              >
                <FilterAltIcon />
              </IconButton>
              <IconButton
                size="small"
                style={{ color: "red" }}
                onClick={(e) => {
                  clearFilter();
                }}
              >
                <ClearIcon />
              </IconButton>
            </div>
          </div>
          <TextField
            style={{ minWidth: "17rem" }}
            size="small"
            label="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            sx={{ marginRight: 2 }}
          />
        </div>
        <Grid
          container
          style={{ marginBottom: "1rem", marginInline: "auto" }}
          spacing={1}
        >
          {expiringGroups.map((card) => {
            return (
              <Grid item>
                <Card style={{ minWidth: "12rem" }}>
                  <CardContent
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      color="text.secondary"
                      variant="h6"
                      component="div"
                    >
                      {card.label}
                    </Typography>
                  </CardContent>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={{ fontSize: "1rem" }}
                      onClick={() => handleFilterByServiceGroup(card.label)}
                      fullWidth
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        {card.count}

                        <ArrowCircleRightIcon />
                      </div>
                    </Button>
                  </div>
                </Card>
              </Grid>
            );
          })}
        </Grid>
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
          </div>
          <Divider />
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  className={classes.tableHeadingCell}
                  align="center"
                >
                  Sr. No.
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  className={classes.tableHeadingCell}
                  align="center"
                >
                  Product
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  className={classes.tableHeadingCell}
                  align="center"
                >
                  Register
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  className={classes.tableHeadingCell}
                  align="center"
                >
                  Expiry
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  className={classes.tableHeadingCell}
                  align="center"
                >
                  Party Details
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  className={classes.tableHeadingCell}
                  align="center"
                >
                  Actions
                </TableCell>
                <TableCell
                  style={{ fontWeight: 600, fontSize: "1.1rem" }}
                  className={classes.tableHeadingCell}
                  align="center"
                >
                  Message
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
                    <Link
                      to={`/renew-product/`}
                      state={{ id: row.id, redirect: "/" }}
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
                        <AutorenewIcon />
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
                  <TableCell
                    className={classes.tableCell}
                    style={{ maxWidth: "8rem" }}
                    align="center"
                  >
                    <a
                      target="_blank"
                      href={`https://api.whatsapp.com/send?phone=+91${row.partyData.phone}&text=${encodeURI(
                        `Dear ${row.partyData.label},
Your ${row.productGroupData.label} ${row.productData.label} is going to expire on  ${new Date(Date.parse(row.dtExpiry)).getDate()}/${months[new Date(Date.parse(row.dtExpiry)).getMonth()]}/${new Date(Date.parse(row.dtExpiry)).getFullYear()}. So kindly renew service.
YESHA SOFTWARE LLP
9722220777
8200438932
web@yeshasoftware.com
`,
                      )}`}
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
                        <WhatsAppIcon />
                      </IconButton>
                    </a>{" "}
                    <a
                      target="_blank"
                      href={`mailto:${row.partyData.email}?subject=${encodeURI(`Your ${row.productGroupData.label} ${row.productData.label} is going to expire`)}&body=${encodeURI(
                        `Dear ${row.partyData.label},
Your ${row.productGroupData.label} ${row.productData.label} is going to expire on  ${new Date(Date.parse(row.dtExpiry)).getDate()}/${months[new Date(Date.parse(row.dtExpiry)).getMonth()]}/${new Date(Date.parse(row.dtExpiry)).getFullYear()}. So kindly renew service.
YESHA SOFTWARE LLP
9722220777
8200438932
web@yeshasoftware.com
                      `,
                      )}`}
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
                        <MailOutlineIcon />
                      </IconButton>
                    </a>
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
