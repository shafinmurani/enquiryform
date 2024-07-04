import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../../styles/AddProductGroup.css";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddRenewals() {
  //Text Editing controllers
  const [productType, setProductType] = React.useState("");
  const [quantity, setQuantity] = React.useState("0");
  const [tax, setTax] = React.useState("0");
  const [taxPercent, setTaxPercent] = React.useState("");
  const [rate, setRate] = React.useState("0");
  const [amount, setAmount] = React.useState("");
  const [totalAmt, setTotalAmt] = React.useState("0");

  const [result, setResult] = React.useState("0");
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
        if (res.data.list[i].isDelete == "No") {
          array.push({
            label: res.data.list[i].vCompanyName,
            id: res.data.list[i].iCompanyID,
          });
        }
      }
      setCompanyRows(array);
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

  const submit = () => {
    //TODO: Add submission logic
  };

  useEffect(() => {
    getProductGroupData();
    getCompanyData();
    getPartyData();
    getDealerData();
  }, []);
  return (
    <>
      <DrawerComponent title="Add Renewal Details">
        <div>
          <div
            className="add-product-container"
            style={{
              marginTop: "1rem",
              width: "80%",
              marginInline: "auto",
              backgroundColor: "#FFFFFF",
              padding: "2rem",
              paddingInline: "2rem",
            }}
          >
            <h1>Add Renewal Details</h1>

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
                  style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                >
                  <Autocomplete
                    disablePortal
                    disableClearable
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
                      <TextField {...params} label="Service Group" />
                    )}
                  />
                  <Autocomplete
                    key={productRows}
                    disablePortal
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
                </div>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                >
                  <Autocomplete
                    disablePortal
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
                  <Autocomplete
                    disablePortal
                    disableClearable
                    options={partyRows}
                    label="vParty"
                    style={{ flex: "1" }}
                    onChange={(event, newInputValue) => {
                      setPartyID(newInputValue.id);
                      setParty(newInputValue.label);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Party" />
                    )}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    justifyContent: "space-evenly",
                  }}
                >
                  <LocalizationProvider
                    style={{ flex: "1", width: "100%" }}
                    dateAdapter={AdapterDayjs}
                  >
                    <DesktopDatePicker
                      format="DD/MM/YYYY"
                      label="Registration Date"
                      defaultValue={dayjs(new Date())}
                    />
                  </LocalizationProvider>
                  <LocalizationProvider
                    style={{ flex: "1", width: "100%" }}
                    dateAdapter={AdapterDayjs}
                  >
                    <DesktopDatePicker
                      label="Expiry Date"
                      format="DD/MM/YYYY"
                    />
                  </LocalizationProvider>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                >
                  <Autocomplete
                    disablePortal
                    disableClearable
                    options={dealerRows}
                    label="vDName"
                    style={{ flex: "1" }}
                    onChange={(event, newInputValue) => {
                      setDealerID(newInputValue.id);
                      setDealer(newInputValue.label);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Dealer" />
                    )}
                  />
                  <TextField
                    style={{ flex: "1" }}
                    label="Product Rate"
                    onChange={(e) => {
                      setRate(e.target.value);
                    }}
                  />
                  <TextField
                    style={{ flex: "1" }}
                    label="Quantity"
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setAmount(rate * quantity);
                    }}
                  />{" "}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                >
                  <TextField
                    style={{ flex: "1" }}
                    value={quantity * rate}
                    label="Amount"
                    disabled
                  />
                  <FormControl style={{ flex: "1" }}>
                    <InputLabel id="demo-simple-select-label">Tax</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
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
                    onChange={(e) => {
                      setTaxPercent(e.target.value);
                      console.log(amount);
                      var tax_amt = (quantity * rate * e.target.value) / 100;
                      setTax(tax_amt);
                      setTotalAmt(tax_amt + quantity * rate);
                    }}
                    value={taxPercent}
                    disabled={isInclusive}
                  />
                </div>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
                >
                  <TextField
                    style={{ flex: "1" }}
                    label="Final Amount"
                    value={totalAmt}
                    disabled
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
                  onClick={() => {}}
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
