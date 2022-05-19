import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Async } from "react-async";
import { useParams } from "react-router";
import CommuNav from "../CommuNav";

export default function PostDetail() {
  let params = useParams();

  async function getMusicPost() {
    let res = await axios.get(
      `http://localhost:4000/post/review/${params._id}`
    );
  }

  return (
    <>
      <Box display="flex">
        <Box position="sticky">
          <CommuNav />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Async promiseFn={getMusicPost}>
            {({ data, error, isPending }) => {
              if (isPending) return "Loding...";
              if (error) return `Something went wrong: ${error.message}`;

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
                          <TableCell align="center">가수 - 곡명</TableCell>
                          <TableCell align="center">작성자</TableCell>
                          <TableCell align="center">작성일</TableCell>
                          <TableCell align="center">추천수</TableCell>
                        </TableRow>
                      </TableHead>
                      {/* {data.map((reviewData: any, index: number) => {
                        return (
                          <>
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  scope='row'
                                  sx={{
                                    fontWeight: '550',
                                    color: '#333',
                                    '&:hover': {
                                      cursor: 'pointer',
                                      color: 'purple',
                                      transition: 'color .2s',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <img
                                    src={reviewData.charts_id.image}
                                    style={{
                                      width: 35,
                                      border: '1px solid #333',

                                      margin: '0 20px 0 30px',
                                    }}
                                  />
                                  {`${reviewData.charts_id.artist} - ${reviewData.charts_id.title}`}
                                </TableCell>
                                <TableCell align='center'>
                                  {reviewData.username}
                                </TableCell>
                                <TableCell align='center'>
                                  {/* 이건 시간까지 {reviewData.createdAt.slice(0, 16)}
                                  {reviewData.updatedAt.slice(0, 10)}
                                </TableCell>
                                <TableCell align='center'>
                                  {reviewData.likes.length}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </>
                        );
                      })} */}
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
