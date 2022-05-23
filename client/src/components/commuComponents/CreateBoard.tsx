import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router";
import { ethers } from "ethers";
import { tempoabi } from "../../contract/tempoabi";

declare let window: any;

export default function CreateBoard() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const createBoard = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xaEEbEC725C00df0c12Ded95568C345952cf50fC0",
      tempoabi,
      signer
    );

    contract
      .transfer(
        "0x49A01bCDa61a14a1Be34881AE04eCe7c5CD228c2",
        ethers.utils.parseUnits("1500", 18)
      )
      .then((res: any) => {
        console.log(res);
        axios
          .post("http://localhost:4000/board/create", {
            title: title,
            subtitle: subtitle,
          })
          .then((res) => {
            if (
              res.data.message === "요청하신 게시판은 검토를 통해 생성됩니다."
            ) {
              alert("게시판 생성 성공");
              setOpen(!open);
              navigate("/community/627b5e9dd6b52cc4fe03a75d");
            }
          });
      })
      .catch((e: Error) => {
        console.log("error : ", e);
        alert("토큰이 부족합니다.");
        setOpen(!open);
      });
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
            * 1500 tempo토큰이 사용됩니다
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="게시판 제목"
            type="title"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="subtitle"
            label="게시판 소제목"
            type="subtitle"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setSubtitle(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={createBoard}>제작</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
