import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Autocomplete,
	Box,
	TextField,
	Typography,
	Button,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Rating,
	tableCellClasses,
} from "@mui/material";
import axios from "axios";
import { log } from "console";
declare let window: any;

export default function MusicWrite() {
	const nav = useNavigate();
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [chartUnit, setChartUnit] = useState<any[]>([]);

	const [popularity, setPopularity] = useState("");
	const [artistry, setArtistry] = useState("");
	const [lyrics, setLyrics] = useState("");
	const [individuality, setIndividuality] = useState("");
	const [Addictive, setAddictive] = useState("");

	function handleTitle(event: any) {
		setTitle(event.target.innerHTML.split(" - ")[0]);
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

	// 평가 항목
	function getPopularity(event: any) {
		setPopularity(event.target.value);
	}
	function getArtistry(event: any) {
		setArtistry(event.target.value);
	}
	function getLylics(event: any) {
		setLyrics(event.target.value);
	}
	function getIndividuality(event: any) {
		setIndividuality(event.target.value);
	}
	function getAddictive(event: any) {
		setAddictive(event.target.value);
	}

	const handlePost = async () => {
		await axios
			.post(
				`http://localhost:4000/review`,
				{
					title,
					body,
					evaluation: {
						popularity,
						artistry,
						lyrics,
						individuality,
						Addictive,
					},
				},
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				if (res.data.message === "성공, 토큰 지급") {
					window.alert("40토큰이 지급되었습니다.");
				} else if (res.data.message === "성공, 토큰 미지급") {
					window.alert("이미 토큰을 받았습니다.");
				}
			});
		nav(`/review`);
	};

	return (
		<>
			<Box p={5} mt={5} textAlign="center">
				<Typography variant="h6">리뷰 작성</Typography>
				{/* <TextField
					autoFocus
					id="title"
					// label="제목"
					type="title"
					variant="standard"
					placeholder="가수 - 곡명 형태로 작성!"
					InputProps={{
						style: {
							fontSize: 25,
							paddingLeft: 10,
							textAlign: "center",
							justifyContent: "center",
						},
					}}
					InputLabelProps={{
						style: {
							fontSize: 25,
							paddingLeft: 10,
							textAlign: "center",
							justifyContent: "center",
						},
					}}
					sx={{ m: "40px auto" }}
					onChange={handleTitle}
				/> */}
				{/* autocomplete */}
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
					onChange={handleTitle}
				/>

				{/* 별점 부분 */}
				<TableContainer
					sx={{
						width: "400px",
						m: "0 auto",
						border: "1px solid #ccc",
						borderRadius: "10px",
					}}
				>
					<Table
						sx={{
							[`& .${tableCellClasses.root}`]: {
								borderBottom: "none",
							},
						}}
					>
						<TableHead>
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell align="center">평가 항목 별 점수</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell align="center">중독성</TableCell>
								<TableCell align="center">
									<Rating
										name="half-rating-read"
										precision={0.1}
										onChange={getAddictive}
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="center">예술성</TableCell>
								<TableCell align="center">
									<Rating
										name="half-rating-read"
										precision={0.1}
										onChange={getArtistry}
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="center">대중성</TableCell>
								<TableCell align="center">
									<Rating
										name="half-rating-read"
										precision={0.1}
										onChange={getPopularity}
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="center">개성</TableCell>
								<TableCell align="center">
									<Rating
										name="half-rating-read"
										precision={0.1}
										onChange={getIndividuality}
									/>
								</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="center">가사</TableCell>
								<TableCell align="center">
									<Rating
										name="half-rating-read"
										precision={0.1}
										onChange={getLylics}
									/>
								</TableCell>
								<TableCell align="center"> </TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<TextField
					placeholder="리뷰를 작성해주세요"
					sx={{ width: "400px", mt: 5 }}
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
					BPM은 블록체인 인센티브 기반 커뮤니티로 작성된 글은 삭제가
					불가능합니다.
					<br />글 작성은 신중하게 부탁드립니다.
				</Typography>
				<Link to="/review" style={{ textDecoration: "none" }}>
					<Button size="large">취소</Button>
				</Link>
				<Button size="large" onClick={handlePost}>
					발행
				</Button>
			</Box>
		</>
	);
}
