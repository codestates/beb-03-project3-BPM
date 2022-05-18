import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Typography,
} from "@mui/material";
import axios from "axios";
import { log } from "console";
import { Async } from "react-async";

export default function MyComment() {
	async function Comments() {
		const com = await axios.get("http://localhost:4000/mypage/comments");
		return com.data.data;
	}

	return (
		<>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell align="center">내용</TableCell>
							<TableCell align="center">작성일</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<Async promiseFn={Comments}>
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
										{data.map((comment: any) => {
											return (
												<>
													<TableRow>
														<TableCell align="center">
															{comment.comments.body}
														</TableCell>
														<TableCell align="center">
															{comment.comments.createdAt}
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
