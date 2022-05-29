import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
	Box,
	TextField,
	Typography,
	TextareaAutosize,
	Button,
	Autocomplete,
	Container,
} from "@mui/material";
import axios from "axios";
import CommuNav from "../CommuNav";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../../modules/userReducer";
declare let window: any;

export default function ColumnWrite() {
	const nav = useNavigate();
	const loc = useLocation();
	const dispatch = useDispatch();
	const state = loc.state as any;
	const [title, setTitle] = useState(state?.title || "");
	const [musictitle, setMusictitle] = useState("");
	const [body, setBody] = useState(state?.body || "");
	const [chartUnit, setChartUnit] = useState<any[]>([]);

	function handleTitle(event: any) {
		setTitle(event.target.value);
	}
	function handleMusicTitle(event: any) {
		setMusictitle(event.target.innerHTML.split(" - ")[0]);
	}
	function handleBody(event: any) {
		setBody(event.target.value);
	}
	const getChart = async () => {
		const chart = await axios.get("http://localhost:4000/main/allchart");
		return chart.data.data;
	};
	useEffect(() => {
		getChart().then((res) => setChartUnit(res));
	}, []);

	const handlePost = async () => {
		if (title.length > 0 && body.length >= 150) {
			if (state) {
				await axios
					.patch(
						`http://localhost:4000/column/${state.id}`,
						{
							title,
							body,
						},
						{ withCredentials: true }
					)
					.then((res) => {
						window.alert("글이 수정되었습니다.");
					})
					.catch((e) => {
						console.error(e);
						if (e.message === "Request failed with status code 400") {
							alert("로그인 만료");
							dispatch(unsetUser());
							nav(`/column`);
						}
					});
			} else {
				await axios
					.post(
						`http://localhost:4000/column/create`,
						{
							title,
							musictitle,
							body,
						},
						{
							withCredentials: true,
						}
					)
					.then((res) => {
						if (res.data.message === "성공, 토큰 지급") {
							window.alert("150토큰이 지급되었습니다.");
						} else if (res.data.message === "성공, 토큰 미지급") {
							window.alert("이미 토큰을 받았습니다.");
						}
					})
					.catch((e) => {
						if (e.message === "Request failed with status code 404") {
							alert("동일한 곡에 칼럼 작성은 한번만 가능합니다.");
						} else if (e.message === "Request failed with status code 400") {
							alert("로그인 만료");
							dispatch(unsetUser());
						}
						console.error(e);
					});
			}
			nav(`/column`);
		} else {
			window.alert("150자 이상 작성 부탁드립니다.");
		}
	};

	return (
		<>
			<Box display="flex">
				<Box position="sticky">
					<CommuNav />
				</Box>
				<Box sx={{ flexGrow: 1, textAlign: "center" }}>
					<Container>
						<Box p={5} mt={5} textAlign="center">
							{loc.state ? (
								<Typography variant="h5" fontWeight={700} fontFamily="serif">
									칼럼 수정
								</Typography>
							) : (
								<Typography variant="h5" fontWeight={700} fontFamily="serif">
									칼럼 작성
								</Typography>
							)}
							<TextField
								autoFocus
								id="title"
								label="제목"
								type="title"
								fullWidth
								variant="standard"
								placeholder="글 제목을 작성해주세요"
								InputProps={{
									style: {
										fontSize: 20,
										fontFamily: "serif",
										paddingLeft: 10,
										textAlign: "center",
										justifyContent: "center",
									},
								}}
								InputLabelProps={{
									style: {
										fontSize: 20,
										fontFamily: "serif",
										paddingLeft: 10,
										textAlign: "center",
										justifyContent: "center",
									},
								}}
								sx={{ m: "40px auto" }}
								defaultValue={title}
								onChange={handleTitle}
							/>
							{/* 이 부분이 노래 검색 데이터 */}
							{loc.state ? (
								<Box></Box>
							) : (
								<Autocomplete
									freeSolo
									id="free-solo-2-demo"
									disableClearable
									options={chartUnit.map((option) => ({
										label: `${option.title} - ${option.artist}`,
									}))}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Search input"
											InputProps={{
												...params.InputProps,
												type: "search",
											}}
										/>
									)}
									defaultValue={musictitle}
									onChange={handleMusicTitle}
								/>
							)}
							<TextareaAutosize
								minRows={20}
								style={{
									width: "100%",
									fontSize: "20px",
									padding: 20,
									fontFamily: "serif",
								}}
								defaultValue={body}
								onChange={handleBody}
							/>
						</Box>
						<Box textAlign="right" mr={5}>
							<Typography
								sx={{
									fontSize: 20,
									textAlign: "center",
									color: "#E02828",
									fontWeight: "bold",
								}}
							>
								동일한 곡에 칼럼 작성은 한번만 가능합니다.
								<br />
								BPM은 블록체인 인센티브 기반 커뮤니티로 작성된 글은 삭제가
								불가능합니다.
								<br />글 작성은 신중하게 부탁드립니다.
							</Typography>
							<Link to="/column" style={{ textDecoration: "none" }}>
								<Button size="large">취소</Button>
							</Link>
							{loc.state ? (
								<Button size="large" onClick={handlePost}>
									수정
								</Button>
							) : (
								<Button size="large" onClick={handlePost}>
									발행
								</Button>
							)}
						</Box>
					</Container>
				</Box>
			</Box>
		</>
	);
}
