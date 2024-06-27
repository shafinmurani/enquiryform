import React, { useEffect } from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Button } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function ProductGroup() {
  const [rows, setRows] = React.useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:3001/api/product-group/get", {})
      .then((res) => {
        setRows(res.data.list);
      });
  }, []);
  return (
    <>
      <DrawerComponent>
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
                <TableCell align="right">Is Deleted</TableCell>
                <TableCell align="right">Date Created</TableCell>
                <TableCell align="right">Date Modified</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.iCategoryID}
                  </TableCell>
                  <TableCell align="right">{row.vCategory}</TableCell>
                  <TableCell align="right">{row.isDeleted}</TableCell>
                  <TableCell align="right">{row.dtCreated}</TableCell>
                  <TableCell align="right">{row.dtModified}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      style={{ width: "60%" }}
                      variant="contained"
                      color="error"
                    >
                      <Delete />
                    </Button>
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
