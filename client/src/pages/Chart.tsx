import { Link } from "react-router-dom";
import {
	Button,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Typography,
	Grid,
	Box,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import axios from "axios";
import { Async } from "react-async";
import { borderTop } from "@mui/system";

export default function Chart() {
	async function getOurChart() {
		const ourChart = await axios.get("http://localhost:4000/main/ourchart");
		return ourChart.data.data;
	}

	async function getAllChart() {
		const allChart = await axios.get("http://localhost:4000/main/allchart");
		return allChart.data.data;
	}
	return (
		<>
			<Grid container p={5} spacing={5}>
				<Grid item lg={7} md={12}>
					{/* 우리 차트 */}
					<Typography
						textAlign="center"
						variant="h3"
						my={10}
						// fontFamily="Copperplate"
						// fontFamily="Papyrus"
						// fontFamily="Lucida Handwriting"
						// fontFamily="Monaco"
						// fontFamily="cursive"
						// fontFamily="fantasy"
						// fontFamily="Tahoma"
						// fontFamily="Teko"
						fontFamily="Play"
						// fontFamily="Great Vibes"
						// fontFamily="Sacramento"
					>
						<span
							style={{
								fontFamily: "Play",
								color: "lightcoral",
								fontWeight: 600,
							}}
						>
							BPM
						</span>{" "}
						Chart
					</Typography>
					<TableContainer
						sx={{
							border: "1px solid lightcoral",
							borderRadius: 20,
							p: 5,
						}}
					>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
										순위
									</TableCell>
									<TableCell align="center">곡정보</TableCell>
									<TableCell align="center">아티스트</TableCell>
									<TableCell align="center">별점</TableCell>
									<TableCell align="center">듣기</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<Async promiseFn={getOurChart}>
									{({ data, error, isPending }) => {
										if (isPending)
											return (
												<>
													<Typography m="100px">Loding....</Typography>
												</>
											);
										if (error) return `Something went wrong: ${error.message}`;
										return (
											<>
												{data.map((chartData: any, index: number) => {
													return (
														<>
															<TableRow>
																<TableCell>{index + 1}</TableCell>
																<TableCell>
																	<Box
																		component={Link}
																		to={`${chartData._id}`}
																		sx={{
																			textDecoration: "none",
																			display: "flex",
																			alignItems: "center",
																			fontWeight: "600",
																			color: "#333",
																			"&:hover": {
																				cursor: "pointer",
																				color: "purple",
																				transition: "color .2s",
																			},
																		}}
																	>
																		<img
																			src={chartData.image}
																			style={{
																				width: 40,
																				border: "1px solid #0002",
																				margin: "0 20px 0 30px",
																			}}
																		/>
																		{chartData.title}
																	</Box>
																</TableCell>
																<TableCell align="center">
																	{chartData.artist}
																</TableCell>
																<TableCell align="center">
																	{chartData.total}
																</TableCell>
																<TableCell align="center">
																	<Button
																		target="_blank"
																		href={`${chartData.src}`}
																		style={{ zIndex: 2000 }}
																	>
																		<PlayCircleOutlineIcon
																			sx={{ color: "#0009" }}
																		/>
																	</Button>
																</TableCell>
															</TableRow>
														</>
													);
												})}
											</>
										);
									}}
								</Async>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item lg={5} md={12}>
					{/* 멜론 차트 */}
					<Typography
						textAlign="center"
						variant="h3"
						my={10}
						fontFamily="Play"
						color="#666"
						sx={{
							mt: { md: 20, lg: 10 },
							pt: { md: 15, lg: 0 },
							borderTop: { md: "1px dashed lightgreen", lg: "none" },
						}}
					>
						<span
							style={{
								fontFamily: "Play",
								color: "#1fcf62",
							}}
						>
							Melon
						</span>
						&nbsp;Chart
					</Typography>
					<TableContainer
						sx={{
							border: "1px solid #1fcf62",
							borderRadius: 20,
							p: 5,
						}}
					>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
										순위
									</TableCell>
									<TableCell align="center">곡정보</TableCell>
									<TableCell align="center">아티스트</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<Async promiseFn={getAllChart}>
									{({ data, error, isPending }) => {
										if (isPending)
											return (
												<>
													<Typography m="100px">Loding....</Typography>
												</>
											);
										if (error) return `Something went wrong: ${error.message}`;
										return (
											<>
												{data.map((chartData: any, index: number) => {
													return (
														<>
															<TableRow>
																<TableCell>{index + 1}</TableCell>
																<TableCell>
																	<Box
																		component={Link}
																		to={`${chartData._id}`}
																		sx={{
																			fontWeight: "550",
																			color: "#333",
																			display: "flex",
																			alignItems: "center",
																			textDecoration: "none",
																		}}
																	>
																		<img
																			src={chartData.image}
																			style={{
																				width: 40,
																				border: "1px solid #0002",
																				margin: "0 20px 0 30px",
																			}}
																		/>
																		{chartData.title}
																	</Box>
																</TableCell>
																<TableCell align="center">
																	{chartData.artist}
																</TableCell>
															</TableRow>
														</>
													);
												})}
											</>
										);
									}}
								</Async>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</>
	);
}
