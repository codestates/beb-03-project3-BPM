import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import * as React from "react";

export default function CreateBoard() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button fullWidth onClick={() => setOpen(!open)}>
        게시판 만들기
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          fontFamily="Nanum Gothic"
          fontWeight="600"
          variant="h5"
          mt={2}
          textAlign="center"
        >
          게시판 만들기
        </DialogTitle>
        <DialogContent sx={{ p: 5 }}>
          <DialogContentText mb={2} fontFamily="Nanum Gothic" color="red">
            * 토큰이 사용됩니다
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="게시판 제목"
            type="title"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="subtitle"
            label="게시판 소제목"
            type="subtitle"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button
            onClick={() => {
              setOpen(!open);
              alert("게시판 제작에 성공했습니다!");
            }}
          >
            제작
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
