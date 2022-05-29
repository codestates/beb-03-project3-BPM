import React from "react";
import { Async } from "react-async";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Fab,
  Container,
  TableFooter,
  TablePagination,
} from "@mui/material";
import CommuNav from "../CommuNav";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { useState } from "react";
import TablePaginationActions from "../../TablePaginationActions";

export default function Column() {
  const userInfo = useSelector((state: any) => state.userReducer).data;
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

  async function getReview() {
    let res = await axios.get("http://localhost:4000/column");
    let columnData = res.data.data;
    return columnData;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box position="sticky">
          <CommuNav />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Container sx={{ textAlign: "center" }}>
            {userInfo !== null ? (
              <Link to={`/column/write`}>
                <Fab
                  color="secondary"
                  aria-label="edit"
                  sx={{
                    width: 65,
                    height: 65,
                    position: "fixed",
                    right: "45px",
                    bottom: "40px",
                  }}
                >
                  <EditIcon sx={{ fontSize: "2rem" }} />
                </Fab>
              </Link>
            ) : (
              <Fab
                color="secondary"
                aria-label="edit"
                sx={{
                  width: 65,
                  height: 65,
                  position: "fixed",
                  right: "45px",
                  bottom: "40px",
                }}
                onClick={() => {
                  alert("로그인 해주세요");
                }}
              >
                <EditIcon sx={{ fontSize: "2rem" }} />
              </Fab>
            )}
            <Async promiseFn={getReview}>
              {({ data, error, isPending }) => {
                if (isPending) return <CircularProgress color="inherit" />;
                if (error) return `Something went wrong: ${error.message}`;

                const tableHeadStyle = {
                  fontWeight: "700",
                  fontSize: "1rem",
                };
                return (
                  <>
                    <Typography
                      variant="h2"
                      m="80px 0 10px 0"
                      // fontFamily='Copperplate'
                      // fontFamily='Papyrus'
                      // fontFamily='Lucida Handwriting'
                      // fontFamily='Monaco'
                      // fontFamily='cursive'
                      // fontFamily='fantasy'
                      // fontFamily='Tahoma'
                      // fontFamily='Teko'
                      // fontFamily='Great Vibes'
                      // fontFamily='Tapestry'
                      fontFamily="Play"
                      textAlign="center"
                    >
                      Column Board
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      mb="100px"
                      fontFamily="Nanum Gothic"
                      textAlign="center"
                    >
                      Why So Serious?
                    </Typography>
                    <TableContainer>
                      <Table sx={{ fontFamily: "Nanum Gothic Coding" }}>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center" style={tableHeadStyle}>
                              제목 - 곡명
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
                        {data
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((reviewData: any, index: number) => {
                            return (
                              <>
                                <TableBody>
                                  <TableRow
                                    component={Link}
                                    to={`${reviewData._id}`}
                                    sx={{ textDecoration: "none" }}
                                  >
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
                                        src={reviewData.charts_id.image}
                                        style={{
                                          width: 35,
                                          border: "1px solid #ccc",

                                          margin: "0 20px 0 30px",
                                        }}
                                      />
                                      {/* FIXME:곡명 텍스트 색상 바꾸기  */}
                                      {`${reviewData.title} - ${reviewData.charts_id.title}`}
                                    </TableCell>
                                    <TableCell align="center">
                                      {reviewData.username}
                                    </TableCell>
                                    <TableCell align="center">
                                      {/* 이건 시간까지 {reviewData.createdAt.slice(0, 16)} */}
                                      {reviewData.updatedAt.slice(0, 10)}
                                    </TableCell>
                                    <TableCell align="center">
                                      {reviewData.likes.length}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </>
                            );
                          })}
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
                  </>
                );
              }}
            </Async>
          </Container>
        </Box>
      </Box>
    </>
  );
}
