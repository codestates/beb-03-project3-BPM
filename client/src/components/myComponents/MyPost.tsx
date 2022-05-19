import {} from "@mui/x-data-grid";
import {
	ListItem,
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
import { Indexed } from "ethers/lib/utils";

export default function MyPost() {
	async function Posts() {
		const post = await axios.get("http://localhost:4000/mypage/posts", {
			withCredentials: true,
		});
		return post.data.data;
	}

	return (
		<>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">번호</TableCell>
							<TableCell align="center">제목</TableCell>
							<TableCell align="center">작성일</TableCell>
							<TableCell align="center">추천수</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<Async promiseFn={Posts}>
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
										{data.map((post: any, index: number) => {
											return (
												<>
													<TableRow
														component={Link}
														to={`/community/${post.boards_id}/${post._id}`}
														sx={{ textDecoration: "none" }}
													>
														<TableCell align="center">{index + 1}</TableCell>
														<TableCell align="left">{post.title}</TableCell>
														<TableCell align="center">
															{post.createdAt.slice(0, 10)}
														</TableCell>
														<TableCell align="center">
															{post.likes.length}
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
