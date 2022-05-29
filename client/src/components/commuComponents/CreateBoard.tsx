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
import { useSelector } from "react-redux";

declare let window: any;

export default function CreateBoard() {
	const navigate = useNavigate();
	const userInfo = useSelector((state: any) => state.userReducer).data;
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
			"0x0d5Ba334df6Df1b8c7D1C650e7D43Cef5077c50b",
			tempoabi,
			signer
		);

		contract
			.transfer(
				"0x6e8894086eEE0a251aC1Fe32e686ccb4685E91B4",
				ethers.utils.parseUnits("1500", 18)
			)
			.then((res: any) => {
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
							navigate("/community/62903268742075468af6996c");
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
			{userInfo === null ? (
				<Button
					fullWidth
					onClick={() => {
						alert("로그인 해주세요");
					}}
				>
					게시판 만들기
				</Button>
			) : (
				<Button fullWidth onClick={() => setOpen(!open)}>
					게시판 만들기
				</Button>
			)}

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
