import { Dialog, DialogTitle } from "@mui/material";

export default function DialogBoxComponent(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog style={props.style} onClose={handleClose} open={open}>
      <DialogTitle style={{ color: "green" }}>{props.title}</DialogTitle>
      <p style={{ margin: 20 }}>{props.content}</p>
      {props.children}
    </Dialog>
  );
}
