import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Divider,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

import axios from "axios";
import React from "react";
import { Async } from "react-async";
import { useParams } from "react-router";
import CommuNav from "../CommuNav";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function MusicDetail() {
  const params = useParams();

  const getMusicPost = async () =>
    await axios
      .get(`http://localhost:4000/review/${params.reviewid}`)
      .then((res) => {
        let musicDetailData = res.data.data;
        return musicDetailData;
      });
  return (
    <>
      <Box display="flex" mr={2}>
        <Box position="sticky">
          <CommuNav />
        </Box>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Async promiseFn={getMusicPost}>
            {({ data, error, isPending }) => {
              if (isPending) return "Loding...";
              if (error) return `Something went wrong: ${error.message}`;

              let comments = data.comments;

              return (
                <>
                  <Typography
                    variant="h2"
                    m="80px 0 10px 0"
                    fontSize="1.8rem"
                    // fontFamily='Copperplate'
                    // fontFamily='Papyrus'
                    fontFamily="Lucida Handwriting"
                    // fontFamily='Monaco'
                    // fontFamily='cursive'
                    // fontFamily='fantasy'
                    // fontFamily='Tahoma'
                    // fontFamily='Play'
                    // fontFamily='Great Vibes'
                    // fontFamily='Tapestry'
                    // fontFamily='Teko'
                  >
                    {data.chart.artist} - {data.title}
                  </Typography>
                  <Typography mb="25px" fontFamily="Nanum Gothic" color="coral">
                    {data.username}
                  </Typography>
                  <Typography mb="100px">여기에 좋아요</Typography>

                  {/* 별점 부분 */}
                  <TableContainer
                    sx={{
                      width: "400px",
                      m: "0 auto",
                      border: "1px solid #ccc",
                      borderRadius: "10px",
                    }}
                  >
                    <Table
                      sx={{
                        [`& .${tableCellClasses.root}`]: {
                          borderBottom: "none",
                        },
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center">
                            평가 항목 별 점수
                          </TableCell>
                          <TableCell align="center"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">중독성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data.chart.AddictiveAvg}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data.chart.AddictiveAvg}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">예술성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data.chart.artistryAvg}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data.chart.artistryAvg}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">대중성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data.chart.popularityAvg}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data.chart.popularityAvg}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">개성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data.chart.individualityAvg}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data.chart.individualityAvg}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">가사</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data.chart.lyricsAvg}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data.chart.lyricsAvg}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Typography
                    pt={10}
                    pb={20}
                    fontSize="1.2rem"
                    fontFamily="Nanum Gothic"
                  >
                    "{data.body}"
                  </Typography>
                  <Divider />

                  {/* 댓글 부분 */}
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">댓글 내용</TableCell>
                          <TableCell align="center">작성자</TableCell>
                          <TableCell align="center">작성일</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {comments.length !== 0
                          ? comments.map((commentData: any) => {
                              return (
                                <>
                                  <TableRow>
                                    <TableCell>{commentData.body}</TableCell>
                                    <TableCell align="center">
                                      {commentData.username}
                                    </TableCell>
                                    <TableCell align="center">
                                      {commentData.createdAt.slice(0, 10)}
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        cursor: "pointer",
                                        color: "#888",
                                      }}
                                    >
                                      <DeleteOutlineIcon />
                                    </TableCell>
                                  </TableRow>
                                </>
                              );
                            })
                          : null}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {comments.length === 0 ? (
                    <Typography mt={10} mb={10} textAlign="center">
                      댓글이 없습니다
                    </Typography>
                  ) : null}

                  {/* 댓글 작성 부분 */}
                  <Box m={3}>
                    <TextField
                      variant="outlined"
                      placeholder="댓글을 작성해주세요"
                      fullWidth
                      id="comment"
                      name="comment"
                      sx={{ mt: 5 }}
                    />
                    <Button variant="outlined" type="submit" fullWidth>
                      작성
                    </Button>
                  </Box>
                </>
              );
            }}
          </Async>
        </Box>
      </Box>
    </>
  );
}
