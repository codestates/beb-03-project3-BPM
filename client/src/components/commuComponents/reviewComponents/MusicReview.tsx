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
} from "@mui/material";
import CommuNav from "../CommuNav";
import axios from "axios";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

export default function MusicReview() {
  async function getReview() {
    let res = await axios.get("http://localhost:4000/review");
    let reviewPostData = res.data.data;
    return reviewPostData;
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box position="sticky">
          <CommuNav />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Link to={`/review/write`}>
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
                    Music Review
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    mb="100px"
                    fontFamily="Nanum Gothic"
                    textAlign="center"
                  >
                    Music is my life
                  </Typography>
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
                      {data.map((reviewData: any, index: number) => {
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
                                  {`${reviewData.charts_id.artist} - ${reviewData.charts_id.title}`}
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
                    </Table>
                  </TableContainer>
                </>
              );
            }}
          </Async>
        </Box>
      </Box>
    </>
  );
}
