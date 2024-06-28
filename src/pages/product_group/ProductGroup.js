import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
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
  useEffect(() => {
    axios
      .post("http://localhost:3001/api/product-group/get", {})
      .then((res) => {
        setRows(res.data.list);
      });
  }, []);
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleClickOpen = (title, message) => {
    setOpen(true);
    setMessage(message);
    setTitle(title);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setMessage("");
  };
  return (
    <>
      <DrawerComponent title="Product Group List">
        <BreadcrumbsComponent />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Product Group</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
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
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Product Group</TableCell>
                {/* <TableCell align="right">Is Deleted</TableCell> */}
                <TableCell align="right">Date Created</TableCell>
                <TableCell align="right">Date Modified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
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
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => {
                            handleClickOpen(
                              "Are you sure?",
                              `You want to delete "${row.vCategory}" product group?`
                            );
                          }}
                        >
                          <Delete />
                        </Button>
                        <Button size="small" variant="contained" color="info">
                          <Edit />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
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
            <Button size="small" variant="contained" color="error">
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
      </DrawerComponent>
    </>
  );
}
