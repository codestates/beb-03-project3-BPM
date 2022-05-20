import * as React from "react";
import { useParams } from "react-router";
import {
	Box,
	Button,
	Link,
	Modal,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from "@mui/material";
import axios from "axios";
import { log } from "console";
import { Async } from "react-async";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function ChartModal() {
	const params = useParams();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	async function getDetail() {
		const detail = await axios.get(
			`http://localhost:4000/chart/${params.chartid}`
		);
		console.log("><><><><><", detail.data.data.songInfo);
		console.log("><><><><><@#@##", detail.data.data.columns);
		return detail.data.data;
	}

	return (
		<div>
			<Button onClick={handleOpen}>detail</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Async promiseFn={getDetail}>
						{({ data, error, isPending }) => {
							if (isPending) return "Loding...";
							if (error) return `Something went wrong: ${error.message}`;

							console.log(data);
							const tableHeadStyle = {
								fontWeight: "700",
								fontSize: "1rem",
							};
							return (
								<>
									<TableContainer>
										<Table sx={{ fontFamily: "Nanum Gothic Coding" }}>
											<TableHead>
												<TableRow>
													<TableCell align="center" style={tableHeadStyle}>
														가수 - 곡명
													</TableCell>
													<TableCell align="center" style={tableHeadStyle}>
														작성자
													</TableCell>
													<TableCell align="center" style={tableHeadStyle}>
														작성일
													</TableCell>
													<TableCell align="center" style={tableHeadStyle}>
														추천수
													</TableCell>
												</TableRow>
											</TableHead>
											{data.map((detail: any, index: number) => {
												return (
													<>
														<Typography
															id="modal-modal-title"
															variant="h6"
															component="h2"
														>
															{detail.songInfo.title}
														</Typography>
														<TableBody>
															<TableRow>
																<TableCell
																	scope="row"
																	sx={{
																		fontWeight: "550",
																		color: "#333",
																		"&:hover": {
																			cursor: "pointer",
																			color: "purple",
																			transition: "color .2s",
																		},
																		display: "flex",
																		alignItems: "center",
																	}}
																>
																	{/* <img
																		src={datail._id.image}
																		style={{
																			width: 35,
																			border: "1px solid #333",

																			margin: "0 20px 0 30px",
																		}}
																	/> */}
																	{`${detail.charts_id.artist} - ${detail.charts_id.title}`}
																</TableCell>
																<TableCell align="center">
																	{detail.username}
																</TableCell>
																<TableCell align="center">
																	{/* 이건 시간까지 {reviewData.createdAt.slice(0, 16)} */}
																	{detail.updatedAt.slice(0, 10)}
																</TableCell>
																<TableCell align="center">
																	{detail.likes.length}
																</TableCell>
															</TableRow>
														</TableBody>
													</>
												);
											})}
										</Table>
									</TableContainer>
								</>
							);
						}}
					</Async>
				</Box>
			</Modal>
		</div>
	);
}
