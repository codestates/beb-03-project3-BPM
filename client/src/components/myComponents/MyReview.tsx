import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Async } from "react-async";
import { useState } from "react";
import TablePaginationActions from "../TablePaginationActions";

export default function MyReview() {
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

  async function Reviews() {
    const review = await axios.get("http://localhost:4000/mypage/reviews", {
      withCredentials: true,
    });
    console.log(review.data.data);
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
                      ? data
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((post: any, index: number) => {
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
