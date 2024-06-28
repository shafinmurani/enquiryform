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
import BreadcrumbsComponent from "../../components/BreadcrumbsComponent";
import DialogBoxComponent from "../../components/DialogBoxComponent";

export default function ProductGroup() {
  const [rows, setRows] = React.useState([]);
  const getData = async () => {
    await axios
      .post("http://localhost:3001/api/product-group/get", {})
      .then((res) => {
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
      return rows.filter((row) => row.vCategory.includes(keyword));
    }
  }
  const handleDelete = async () => {
    //TODO : IMPLEMENT BACK END LOGIC
    axios
      .post("http://localhost:3001/api/product-group/delete", {
        id: deleteId,
      })
      .then(async (res) => {
        console.log(res.data);
        if (res.data.result) {
          await setAlertMessage(res.data.message);
          await setResult("success");
          await setRows([]);
          await getData();
          await handleClose();
        } else {
          setAlertMessage(res.data.message);
          setResult("error");
        }
      });
  };
  return (
    <>
      <DrawerComponent title="Services List">
        <BreadcrumbsComponent />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Services</h1>
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
          <Link to="/product-group/add">
            <Button startIcon={<Add />} variant="contained">
              Add
            </Button>
          </Link>
          <TextField
            style={{ minWidth: "20rem" }}
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
                <TableCell>ID</TableCell>
                <TableCell align="right">Services</TableCell>
                {/* <TableCell align="right">Is Deleted</TableCell> */}
                <TableCell align="right">Date Created</TableCell>
                <TableCell align="right">Date Modified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filter(search).map((row) => {
                if (row.isDeleted === "Yes") {
                  return null;
                } else {
                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.iCategoryID}
                      </TableCell>
                      <TableCell align="right">{row.vCategory}</TableCell>
                      {/* <TableCell align="right">{row.isDeleted}</TableCell> */}
                      <TableCell align="right">{row.dtCreated}</TableCell>
                      <TableCell align="right">{row.dtModified}</TableCell>
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
                              `You want to delete "${row.vCategory}" product group?`,
                              row.iCategoryID
                            );
                          }}
                        >
                          <Delete />
                        </Button>
                        <Link
                          to={`/product-group/edit/`}
                          state={{ id: row.iCategoryID }}
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
