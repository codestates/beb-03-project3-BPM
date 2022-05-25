import React from "react";
import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { log } from "console";
import { Async } from "react-async";

export default function MyReview() {
	async function Reviews() {
		const review = await axios.get("http://localhost:4000/mypage/reviews", {
			withCredentials: true,
		});
		return review.data.data;
	}
	return (
		<>
			<Async promiseFn={Reviews}>
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
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell align="center">번호</TableCell>
											<TableCell align="center">곡명 - 가수</TableCell>
											<TableCell align="center">작성일</TableCell>
											<TableCell align="center">추천수</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{data.length !== 0
											? data.map((post: any, index: number) => {
													return (
														<>
															<TableRow
																component={Link}
																to={`/review/${post._id}`}
																sx={{ textDecoration: "none" }}
															>
																<TableCell align="center">
																	{index + 1}
																</TableCell>
																<TableCell align="center">
																	{`${post.charts_id.title} - ${post.charts_id.artist}`}
																</TableCell>
																<TableCell align="center">
																	{post.createdAt.slice(0, 10)}
																</TableCell>
																<TableCell align="center">
																	{post.likes.length}
																</TableCell>
															</TableRow>
														</>
													);
											  })
											: null}
									</TableBody>
								</Table>
							</TableContainer>
							{data.length === 0 ? (
								<Typography m={10} textAlign="center">
									작성한 리뷰가 없습니다.
								</Typography>
							) : null}
						</>
					);
				}}
			</Async>
		</>
	);
}
