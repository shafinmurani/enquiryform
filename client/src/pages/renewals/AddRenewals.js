import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import "../../styles/AddProductGroup.css";
import useWindowDimensions from "../../components/UseWindowDimensions";
import DialogBoxComponent from "../../components/DialogBoxComponent";
import AddGroupComponent from "../product_group/AddGroupComponent";
import DialogComponent from "../../components/DialogComponent";
import Box from "@mui/material/Box";
import AddProductComponent from "../product/AddProductComponent";
import AddCompanyComponent from "../company/AddCompanyComponent";
import AddPartyComponent from "../party/AddPartyComponent";
import AddDealerComponent from "../dealer/AddDealerComponent";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { decodedToken } from "../../services/services_export";
const token = sessionStorage.getItem("jwt-token");

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddRenewals() {
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };
  //Text Editing controllers
  const [productType, setProductType] = React.useState("");
  const [remarks, setRemarks] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [tax, setTax] = React.useState("");
  const [taxPercent, setTaxPercent] = React.useState("");
  const [rate, setRate] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [totalAmt, setTotalAmt] = React.useState("");

  const [result, setResult] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [productGroupRows, setProductGroupRows] = React.useState([]);
  const [productRows, setProductRows] = React.useState([]);
  const [companyRows, setCompanyRows] = React.useState([]);
  const [partyRows, setPartyRows] = React.useState([]);
  const [dealerRows, setDealerRows] = React.useState([]);

  const [productGroup, setProductGroup] = React.useState("");
  const [product, setProduct] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [party, setParty] = React.useState("");
  const [dealer, setDealer] = React.useState("");

  const [productGroupID, setProductGroupID] = React.useState("");
  const [productID, setProductID] = React.useState("");
  const [companyID, setCompanyID] = React.useState("");
  const [partyID, setPartyID] = React.useState("");
  const [dealerID, setDealerID] = React.useState("");

  const [isInclusive, setIsInclusive] = React.useState(false);

  const [registrationDate, setRegistrationDate] = React.useState(
    dayjs(new Date()),
  );
  const [expiryDate, setExpiryDate] = React.useState(dayjs(new Date()));

  const getProductGroupData = () => {
    axios
      .post("http://localhost:3001/api/service-group/get", { decodedToken })
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
  const getProductData = (id) => {
    axios
      .post("http://localhost:3001/api/service/get-by-group", { id: id })
      .then((res) => {
        var array = [];
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vProduct,
              id: res.data.list[i].iProductID,
            });
          }
        }
        setProductRows(array);
      });
  };
  const getCompanyData = () => {
    axios.post("http://localhost:3001/api/company/get", {}).then((res) => {
      var array = [];
      for (var i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].isDeleted == "No") {
          array.push({
            label: res.data.list[i].vAccount,
            id: res.data.list[i].iAccountID,
          });
        }
      }
      setCompanyRows(array);
    });
  };
  const reset = () => {
    setProductType("");
    setRemarks("");
    setQuantity("");
    setTax("");
    setTaxPercent("");
    setRate("");
    setAmount("");
    setTotalAmt("");
    setProductGroup("");
    setProductID("");
    setProductGroupID("");
    setDealer("");
    setDealerID("");
    setParty("");
    setPartyID("");
    setTotalAmt("");
    setCompany("");
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

  const getDealerData = () => {
    axios.post("http://localhost:3001/api/dealer/get", {}).then((res) => {
      var array = [];
      for (var i = 0; i < res.data.list.length; i++) {
        if (res.data.list[i].isDeleted == "No") {
          array.push({
            label: res.data.list[i].vDName,
            id: res.data.list[i].iDealerID,
          });
        }
      }
      setDealerRows(array);
    });
  };

  async function clearMessage() {
    await timeout(1500);
    setResult("");
    setResult("");
  }

  const submit = async () => {
    var adminId = parseJwt(token).id;
    await axios
      .post("http://localhost:3001/api/login/decode", {
        token: localStorage.getItem("jwt-token"),
      })
      .then((res) => {
        adminId = res.data.decodedToken.id;
      });
    var taxType = isInclusive ? "Inclusive" : "Exclusive";
    if (
      productGroupID.length == 0 ||
      productID.length == 0 ||
      companyID.length == 0 ||
      partyID.length == 0 ||
      !registrationDate.isValid ||
      expiryDate.isBefore(registrationDate) ||
      rate.length == 0 ||
      quantity.length == 0 ||
      totalAmt.length == 0
    ) {
      setResult("error");
      setMessage("Invalid data");
      await clearMessage();
    } else {
      var data = {
        adminId,
        productGroupID,
        productID,
        companyID,
        partyID,
        registrationDate: new Date(registrationDate),
        expiryDate: new Date(expiryDate),
        dealerID,
        productType,
        remarks,
        rate,
        quantity,
        amount: quantity * rate,
        tax,
        taxPercent,
        taxType,
        totalAmt,
      };
      axios
        .post("http://localhost:3001/api/renewals/add", data)
        .then(async (res) => {
          if (res.data.affectedRows > 0) {
            setResult("success");
            setMessage("Data added successfully");
            reset();
            await clearMessage();
          } else {
            setResult("error");
            setMessage("There was some error adding data to the table");
            await clearMessage();
          }
        });
    }
  };

  useEffect(() => {
    getProductGroupData();
    getCompanyData();
    getPartyData();
    getDealerData();
  }, []);
  const { height, width } = useWindowDimensions();

  return (
    <>
      <DrawerComponent title="Add Renewal Details">
        <div>
          <div
            className="add-product-container"
            style={{
              marginTop: "1rem",
              width: "90%",
              marginInline: "auto",
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              paddingInline: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                marginTop: "0.2rem",
                gap: "1rem",
                alignItems: "flex-end",
              }}
            >
              <Alert
                style={{
                  width: "100%",
                  display: result.length === 0 ? "none" : "",
                }}
                severity={result}
              >
                {message}
              </Alert>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      disableClearable
                      size="small"
                      autoComplete
                      autoHighlight
                      openOnFocus
                      forcePopupIcon={false}
                      value={productGroup}
                      options={productGroupRows}
                      label="vCategory"
                      style={{ flex: "1" }}
                      onChange={(event, newInputValue) => {
                        setProductGroupID(newInputValue.id);
                        setProductGroup(newInputValue.label);
                        setProductRows([]);
                        getProductData(newInputValue.id);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Group" />
                      )}
                    />
                    {decodedToken.role.toLowerCase() == "admin" ? (
                      <DialogComponent
                        title="Service Group"
                        onClose={() => {
                          getProductGroupData();
                          getCompanyData();
                          getPartyData();
                          getDealerData();
                        }}
                        component={<AddGroupComponent />}
                      />
                    ) : null}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Autocomplete
                      value={product}
                      key={productRows}
                      disablePortal
                      size="small"
                      autoComplete
                      autoHighlight
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      openOnFocus
                      forcePopupIcon={false}
                      disableClearable
                      options={productRows}
                      label="vProduct"
                      style={{ flex: "1" }}
                      onChange={(event, newInputValue) => {
                        setProductID(newInputValue.id);
                        setProduct(newInputValue.label);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Services" />
                      )}
                    />
                    <DialogComponent
                      title="Services"
                      onClose={() => {
                        getProductGroupData();
                        getCompanyData();
                        getPartyData();
                        getDealerData();
                      }}
                      component={<AddProductComponent />}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      size="small"
                      autoComplete
                      autoHighlight
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      openOnFocus
                      forcePopupIcon={false}
                      value={company}
                      disableClearable
                      options={companyRows}
                      label="vCompanyName"
                      style={{ flex: "1" }}
                      onChange={(event, newInputValue) => {
                        setCompanyID(newInputValue.id);
                        setCompany(newInputValue.label);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Company" />
                      )}
                    />
                    <DialogComponent
                      title="Company"
                      onClose={() => {
                        getProductGroupData();
                        getCompanyData();
                        getPartyData();
                        getDealerData();
                      }}
                      component={<AddCompanyComponent />}
                    />
                  </Box>
                  <TextField
                    value={productType}
                    size="small"
                    label="Product Type"
                    style={{ flex: 1 }}
                    onChange={(e) => {
                      setProductType(e.target.value);
                    }}
                  />
                </div>
                {/* <div
                  style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                >

                </div> */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                  }}
                >
                  <LocalizationProvider
                    // style={{ flex: "1", width: "100%" }}
                    dateAdapter={AdapterDayjs}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      label="Registration"
                      defaultValue={dayjs(new Date())}
                      value={registrationDate}
                      slotProps={{
                        textField: {
                          size: "small",
                          style: {
                            // minWidth: "100%",
                            flex: "1",
                          },
                        },
                      }}
                      onChange={(val) => {
                        setRegistrationDate(val);
                        if (val.isAfter(expiryDate) || val.isSame(expiryDate)) {
                          setExpiryDate(val.add(1, "day"));
                        }
                      }}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider
                    // style={{ flex: "1", width: "100%" }}
                    dateAdapter={AdapterDayjs}
                  >
                    <DatePicker
                      label="Expiry"
                      format="DD/MM/YYYY"
                      slotProps={{
                        textField: {
                          size: "small",
                          style: {
                            // minWidth: "100%",
                            flex: "1",
                          },
                        },
                      }}
                      value={expiryDate}
                      minDate={registrationDate}
                      onChange={(val) => {
                        setExpiryDate(val);
                      }}
                    />
                  </LocalizationProvider>{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      size="small"
                      autoComplete
                      autoHighlight
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      openOnFocus
                      forcePopupIcon={false}
                      disableClearable
                      options={partyRows}
                      label="vParty"
                      value={party}
                      style={{ flex: "1" }}
                      onChange={(event, newInputValue) => {
                        setPartyID(newInputValue.id);
                        setParty(newInputValue.label);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Party" />
                      )}
                    />
                    <DialogComponent
                      title="Party"
                      onClose={() => {
                        getProductGroupData();
                        getCompanyData();
                        getPartyData();
                        getDealerData();
                      }}
                      component={<AddPartyComponent />}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Autocomplete
                      disablePortal
                      size="small"
                      autoComplete
                      autoHighlight
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end"></InputAdornment>
                        ),
                      }}
                      openOnFocus
                      forcePopupIcon={false}
                      disableClearable
                      options={dealerRows}
                      label="vDName"
                      value={dealer}
                      style={{ flex: "1" }}
                      onChange={(event, newInputValue) => {
                        setDealerID(newInputValue.id);
                        setDealer(newInputValue.label);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Dealer" />
                      )}
                    />
                    <DialogComponent
                      title="Dealer"
                      onClose={() => {
                        getProductGroupData();
                        getCompanyData();
                        getPartyData();
                        getDealerData();
                      }}
                      component={<AddDealerComponent />}
                    />
                  </Box>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: width > 1000 ? "row" : "column",
                    gap: width > 1000 ? "2rem" : "1rem",
                  }}
                >
                  <TextField
                    style={{ flex: "1" }}
                    size="small"
                    label="Rate"
                    value={rate}
                    onChange={(e) => {
                      setRate(e.target.value);
                    }}
                  />{" "}
                  <TextField
                    style={{ flex: "1" }}
                    label="Quantity"
                    size="small"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setAmount(rate * quantity);
                    }}
                  />{" "}
                  <TextField
                    style={{ flex: "1" }}
                    value={quantity * rate}
                    size="small"
                    label="Amount"
                    disabled
                  />
                  <FormControl style={{ flex: "1" }}>
                    <InputLabel id="demo-simple-select-label">Tax</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      size="small"
                      value={isInclusive}
                      label="Age"
                      onChange={(e) => {
                        setIsInclusive(e.target.value);
                      }}
                    >
                      <MenuItem value={true}>Inclusive</MenuItem>
                      <MenuItem value={false}>Exclusive</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    style={{ flex: "1" }}
                    label="Tax %"
                    size="small"
                    onChange={(e) => {
                      setTaxPercent(e.target.value);
                      console.log(amount);
                      var tax_amt = (quantity * rate * e.target.value) / 100;
                      setTax(tax_amt);
                      setTotalAmt(tax_amt + quantity * rate);
                    }}
                    value={taxPercent}
                    disabled={isInclusive}
                  />{" "}
                  <TextField
                    style={{ flex: "1" }}
                    label="Final Amount"
                    size="small"
                    value={totalAmt}
                    disabled
                  />{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  <TextField
                    style={{ flex: "3" }}
                    label="Remarks"
                    value={remarks}
                    onChange={(e) => {
                      setRemarks(e.target.value);
                    }}
                    multiline
                    minRows={2}
                    maxRows={5}
                  />
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={submit}
                  disabled={isLoading}
                  size="large"
                  variant="contained"
                  // style={{ flex: "2" }}
                >
                  {isLoading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  onClick={() => {
                    reset();
                  }}
                  disabled={isLoading}
                  size="large"
                  variant="contained"
                  color="warning"
                  // style={{ flex: "2" }}
                >
                  {isLoading ? (
                    <CircularProgress style={{ color: "white" }} />
                  ) : (
                    "Reset"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DrawerComponent>
    </>
  );
}
