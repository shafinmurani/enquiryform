import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Box } from "@mui/material";
import { Download } from "@mui/icons-material";
export default function FileUploadDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton
        color="primary"
        // style={{ height: "2.6rem" }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        <Download />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Import Data from an Excel File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Before uploading, please make sure your table headers are in this
            order
          </DialogContentText>
          <Box
            component="img"
            src={props.image}
            sx={{ width: "80%", display: "block", marginInline: "auto" }}
          />
          <TextField
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
            // className={classes.input}
            sx={{
              width: "80%",
              display: "block",
              marginInline: "auto",
              marginTop: "2rem",
            }}
            id="raised-button-file"
            multiple
            type="file"
          >
            <label htmlFor="raised-button-file">
              <Button
                type="submit"
                variant="raised"
                component="span"
                variant="contained"
              >
                Select File
              </Button>
            </label>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="raised"
            component="span"
            variant="contained"
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
