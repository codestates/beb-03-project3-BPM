import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import {
  Container,
  Divider,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";
import { Async } from "react-async";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function PostDetail() {
  let params = useParams();

  // 상세페이지 불러오기
  const getDetail = async () =>
    await axios
      .get(`http://localhost:4000/post/${params.boardid}/${params.postid}`)
      .then((res) => {
        let postDetailData = res.data.data;
        return postDetailData;
      });

  //   const userInfo = useSelector;
  const [comment, setComment] = useState("");
  // 댓글 작성
  let writeComment = async (event: any) => {
    // const formData = new FormData(event.currentTarget);
    await axios.post(
      `http://localhost:4000/post/${params.boardid}/${params.postid}/comment`,
      {
        content: comment,
        //   userid: comments.users_id,
      },
      {
        withCredentials: true,
      }
    );
  };
  //   };

  const deleteComment = async () => {
    await axios.delete(
      `http://localhost:4000/post/${params.boardid}/${params.postid}/comment`,
      {}
    );
    setComment("");
  };

  return (
    <>
      <Container sx={{ textAlign: "center" }}>
        <Async promiseFn={getDetail}>
          {({ data, error, isPending }) => {
            if (isPending) return "Loding....";
            if (error) return;

            return (
              <>
                {data.map((item: any) => {
                  let comments = item.comments;
                  console.log("comments data>>>>>", comments);
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
                        {item.title}
                      </Typography>
                      <Typography
                        mb="25px"
                        fontFamily="Nanum Gothic"
                        color="coral"
                      >
                        {item.username}
                      </Typography>

                      <Typography mb="100px">여기에 좋아요</Typography>

                      <Divider />
                      <Typography pt={20} pb={20}>
                        {item.body}
                      </Typography>
                      <Divider />

                      <Box width="100%">
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
                                ? comments.map((commentsData: any) => {
                                    return (
                                      <>
                                        <TableRow>
                                          <TableCell>
                                            {commentsData.body}
                                          </TableCell>
                                          <TableCell align="center">
                                            {commentsData.username}
                                          </TableCell>
                                          <TableCell align="center">
                                            {commentsData.createdAt.slice(
                                              0,
                                              10
                                            )}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              cursor: "pointer",
                                              color: "#888",
                                            }}
                                            onClick={deleteComment}
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

                        <Box component="form" onSubmit={writeComment}>
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
                      </Box>
                    </>
                  );
                })}
              </>
            );
          }}
        </Async>
      </Container>
    </>
  );
}
