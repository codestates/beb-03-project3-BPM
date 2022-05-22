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

export default function MyComment() {
  async function Comments() {
    const comment = await axios.get("http://localhost:4000/mypage/comments", {
      withCredentials: true,
    });
    return comment.data.data;
  }

  return (
    <>
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
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">번호</TableCell>
                      <TableCell align="center">내용</TableCell>
                      <TableCell align="center">작성일</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.length !== 0
                      ? data.map((comment: any, index: number) => {
                          return (
                            <>
                              <TableRow
                                component={Link}
                                to={`/community/${comment.boards_id}/${comment._id}`}
                                sx={{ textDecoration: "none" }}
                              >
                                <TableCell align="center">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="left">
                                  {comment.comments.body}
                                </TableCell>
                                <TableCell align="center">
                                  {comment.comments.createdAt.slice(0, 10)}
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
                <Typography mt={10} textAlign="center">
                  작성한 댓글이 없습니다.
                </Typography>
              ) : null}
            </>
          );
        }}
      </Async>
    </>
  );
}
