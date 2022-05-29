import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { log } from "console";
import { Async } from "react-async";
import { useState } from "react";
import TablePaginationActions from "../TablePaginationActions";

export default function MyComment() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
                      ? data
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((comment: any, index: number) => {
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
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        colSpan={4}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            "aria-label": "rows per page",
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
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
