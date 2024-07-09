import { Alert, Button, CircularProgress, TextField } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import { useLocation } from "react-router-dom";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function EditRenewals() {
  let navigate = useNavigate();

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
  const [allProductRows, setAllProductRows] = React.useState([]);

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

  const [currentData, setCurrentData] = React.useState([]);

  const location = useLocation();
  const { id } = location.state;

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
        setProductGroupRows(array);
      });
    return array;
  };
  const getProductData = async (id) => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/service/get-by-group", { id: id })
      .then((res) => {
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
    return array;
  };
  const getAllProducts = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/service/get", {})
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
              label: res.data.list[i].vProduct,
              id: res.data.list[i].iProductID,
              groupId: res.data.list[i].iCategoryID,
            });
          }
        }
        setAllProductRows(array);
      });
    return array;
  };
  const getCompanyData = async () => {
    var array = [];
    await axios
      .post("http://localhost:3001/api/company/get", {})
      .then((res) => {
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
          });
        }
      }
      setPartyRows(array);
    });
    return array;
  };

  const getDealerData = async () => {
    var array = [];
    await axios.post("http://localhost:3001/api/dealer/get", {}).then((res) => {
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
    return array;
  };

  const getRenewalData = async () => {
    var array = [];
    var prodcutGroupDataRows = await getProductGroupData();
    var productDataRows = await getAllProducts();
    var partyDataRows = await getPartyData();
    var companyDataRows = await getCompanyData();
    var dealerDataRows = await getDealerData();
    await axios
      .post("http://localhost:3001/api/renewals/get-specific", { id: id })
      .then((res) => {
        for (var i = 0; i < res.data.list.length; i++) {
          if (res.data.list[i].isDeleted == "No") {
            array.push({
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
              dtRegister: res.data.list[i].dtRegister,
              dtExpiry: res.data.list[i].dtExpiry,
              isActive: res.data.list[i].eStatus == "Active" ? true : false,
              productType: res.data.list[i].vType,
              remarks: res.data.list[i].tRemarks,
              quantity: res.data.list[i].iQty,
              rate: res.data.list[i].dRate,
              amount: res.data.list[i].dTotalAmount,
              taxType: res.data.list[i].eTaxType,
              tax: res.data.list[i].dTax,
              id: res.data.list[i].iRenewalID,
            });
          }
        }
      });
    setValues(array[0]);
    return array;
  };

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const setValues = (object) => {
    console.log(object);
    setCompany(object.companyData.label);
    setCompanyID(object.companyData.id);

    setExpiryDate(dayjs(object.dtExpiry));
    setRegistrationDate(dayjs(object.dtRegister));

    setProduct(object.productData.label);
    setProductID(object.productData.id);

    setProductGroup(object.productGroupData.label);
    setProductGroupID(object.productGroupData.id);

    setProductType(object.productType);
    setRemarks(object.remarks);

    if (object.dealerData !== undefined) {
      setDealer(object.dealerData.label);
      setDealerID(object.dealerData.id);
    }

    setParty(object.partyData.label);
    setPartyID(object.partyData.id);

    setQuantity(object.quantity);
    setRate(object.rate);
    setTaxPercent(object.tax);
    setTotalAmt(object.amount);
    setAmount(object.quantity * object.rate);

    setRemarks(object.remarks);

    if (object.taxType == "Inclusive") {
      setIsInclusive(true);
    } else {
      setIsInclusive(false);
    }
  };

  async function clearMessage() {
    await timeout(1500);
    setResult("");
    setResult("");
  }

  const submit = async () => {
    var taxType = isInclusive ? "Inclusive" : "Exclusive";
    var data = {
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
      id,
    };
    axios
      .post("http://localhost:3001/api/renewals/edit", data)
      .then(async (res) => {
        if (res.data.affectedRows > 0) {
          setResult("success");
          setMessage("Data added successfully");
          await clearMessage();
          navigate("/renewals/");
        } else {
          setResult("error");
          setMessage("There was some error adding data to the table");
          await clearMessage();
        }
      });
  };

  useEffect(() => {
    getRenewalData();
  }, []);
  const { height, width } = useWindowDimensions();

  return (
    <>
      <DrawerComponent title="Edit Renewal Details">
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
            <h1>Edit Renewal Details</h1>

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
                    flexDirection: width > 1000 ? "row" : "column",
                    gap: width > 1000 ? "2rem" : "1rem",
                  }}
                >
                  <Autocomplete
                    disablePortal
                    disableClearable
                    options={productGroupRows}
                    label="label"
                    style={{ flex: "1" }}
                    value={productGroup}
                    onChange={(event, newInputValue) => {
                      setProductGroupID(newInputValue.id);
                      setProductGroup(newInputValue.label);
                      setProductRows([]);
                      getProductData(newInputValue.id);
                    }}
                    renderInput={(params) => (
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          {...params}
                          value={productGroup}
                          label="Group"
                          id="input-with-sx"
                          variant="outlined"
                        />
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
                      </Box>
                    )}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                    }}
                  >
                    <Autocomplete
                      key={productRows}
                      disablePortal
                      disableClearable
                      options={productRows}
                      label="label"
                      value={product}
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
                      disableClearable
                      options={companyRows}
                      value={company}
                      label="label"
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
                    label="Product Type"
                    style={{ flex: 1 }}
                    value={productType}
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
                    flexDirection: width > 1000 ? "row" : "column",
                    gap: width > 1000 ? "2rem" : "1rem",
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
                          style: {
                            minWidth: width > 1000 ? "10rem" : "100%",
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
                          style: {
                            minWidth: width > 1000 ? "10rem" : "100%",
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
                      options={partyRows}
                      value={party}
                      label="label"
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
                      disableClearable
                      options={dealerRows}
                      value={dealer}
                      label="label"
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
                    label="Rate"
                    value={rate}
                    onChange={(e) => {
                      var tax_amt = (quantity * rate * e.target.value) / 100;

                      setRate(e.target.value);
                      setTotalAmt(tax_amt + quantity * rate);
                    }}
                  />{" "}
                  <TextField
                    style={{ flex: "1" }}
                    label="Quantity"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setAmount(rate * quantity);
                      var tax_amt = (quantity * rate * e.target.value) / 100;
                      setTotalAmt(tax_amt + quantity * rate);
                    }}
                  />{" "}
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
                      label="Tax"
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
                  />{" "}
                  <TextField
                    style={{ flex: "1" }}
                    label="Final Amount"
                    value={totalAmt}
                    disabled
                  />{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    width: width > 1000 ? "50%" : "100%",
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
                    getRenewalData();
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
                    "Undo"
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
