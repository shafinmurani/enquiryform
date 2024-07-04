import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Alert, Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";

import "../../styles/AddProductGroup.css";
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddRenewals() {
  //Text Editing controllers
  const [productType, setProductType] = React.useState("");
  const [quantity, setQuantity] = React.useState("0");
  const [tax, setTax] = React.useState("0");
  const [amount, setAmount] = React.useState("0");
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

  const [productGroupID, setProductGroupID] = React.useState("");
  const [productID, setProductID] = React.useState("");
  const [companyID, setCompanyID] = React.useState("");

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
                marginTop: "1rem",
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
