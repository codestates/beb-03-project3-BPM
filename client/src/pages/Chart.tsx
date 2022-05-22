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
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import axios from "axios";
import { log } from "console";
import { Async } from "react-async";

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
			<TableContainer sx={{ display: "flex" }}>
				<Table sx={{ mr: 10 }}>
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
													<TableRow
														component={Link}
														to={chartData._id}
														sx={{ textDecoration: "none" }}
													>
														<TableCell>{index + 1}</TableCell>
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
															<img
																src={chartData.image}
																style={{
																	width: 40,
																	border: "1px solid #0002",

																	margin: "0 20px 0 30px",
																}}
															/>

															{chartData.title}
														</TableCell>
														<TableCell align="center">
															{chartData.artist}
														</TableCell>
														<TableCell align="center">
															{chartData.total}
														</TableCell>
														<TableCell align="center">
															<Button href={`${chartData.src}`}>
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
														<TableCell
															scope="row"
															sx={{
																fontWeight: "550",
																color: "#333",

																display: "flex",
																alignItems: "center",
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
														</TableCell>
														<TableCell align="center">
															{chartData.artist}
														</TableCell>
														<TableCell align="center"></TableCell>
														<TableCell align="center">
															{chartData.likes}
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
		</>
	);
}
