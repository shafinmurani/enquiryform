import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AddCircleRounded, Close } from "@mui/icons-material";

export default function DialogComponent(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen("paper")}>
        <AddCircleRounded />
      </Button>
      <Dialog
        PaperProps={{
          sx: {
            width: "80%",
          },
        }}
        style={{ minWidth: "80%" }}
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth
        // fullScreen
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Add {props.title}
            <Button color="inherit" onClick={handleClose}>
              <Close />
            </Button>
          </div>
        </DialogTitle>
        <DialogContent style={{ width: "100%" }} dividers={scroll === "paper"}>
          {props.component}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
