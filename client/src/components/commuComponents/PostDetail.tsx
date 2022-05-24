import axios from "axios";
import React, { useEffect, useState } from "react";
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
import Modal from "@mui/material/Modal";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

interface propstype {
  username: string;
}

export default function PostDetail({ username }: propstype) {
  let params = useParams();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [commentEventFlag, setCommentEventFlag] = useState(false);
  const [comment, setComment] = useState("");
  const [validation, setValidation] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setComment("");
    setValidation(false);
    navigate(`/community/${params.boardid}/${params.postid}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${params.boardid}/${params.postid}`)
      .then((res) => {
        let postDetailData = res.data.data;
        setData(postDetailData);
      });
  }, [commentEventFlag, like]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/post/${params.boardid}/${params.postid}/checklike`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.message === "ok") {
          setLike(true);
        } else if (res.data.message === "no") {
          setLike(false);
        }
      });
  }, []);

  // 댓글 작성
  let writeComment = () => {
    if (comment.length < 10) {
      setValidation(true);
    } else {
      axios
        .post(
          `http://localhost:4000/post/${params.boardid}/${params.postid}/comment`,
          {
            body: comment,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setCommentEventFlag(!commentEventFlag);
          setComment("");
          setValidation(false);
          if (res.data.message === "댓글 작성 성공, 토큰 지급") {
            alert("5BPM 지급");
          } else if (res.data.message === "댓글 작성 성공, 토큰 미지급") {
            alert("하루 댓글 3회를 초과하여 토큰이 미지급되었습니다.");
          }
        });
    }
  };

  const updateComment = () => {
    if (comment.length < 10) {
      setValidation(true);
    } else {
      axios
        .patch(
          `http://localhost:4000/post/${params.boardid}/${params.postid}/comment/${params.commentid}`,
          {
            body: comment,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          handleClose();
          setCommentEventFlag(!commentEventFlag);
          setComment("");
          setValidation(false);
        })
        .catch((e) => {
          if (e.message === "Request failed with status code 403") {
            alert("자신이 작성한 댓글만 수정 가능합니다.");
            handleClose();
            setCommentEventFlag(!commentEventFlag);
            setComment("");
            setValidation(false);
          }
        });
    }
  };

  const handleLike = (like: string) => {
    if (like === "like") {
      axios
        .post(
          `http://localhost:4000/post/${params.boardid}/${params.postid}/like`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setLike(true);
        })
        .catch((e) => {
          if (e.message === "Request failed with status code 400") {
            alert("로그인 해주세요");
          }
        });
    } else if (like === "unlike") {
      axios
        .post(
          `http://localhost:4000/post/${params.boardid}/${params.postid}/unlike`,
          {},
          {
            withCredentials: true,
          }
        )
        .then(() => {
          setLike(false);
        });
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <>
        {data.map((item: any) => {
          let comments = item.comments;
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
              <Typography mb="25px" fontFamily="Nanum Gothic" color="coral">
                {item.username}
              </Typography>

              {like ? (
                <Button
                  sx={{ mb: 3 }}
                  onClick={() => {
                    handleLike("unlike");
                  }}
                >
                  <ThumbUpAltIcon />
                  {item.likes}
                </Button>
              ) : (
                <Button
                  sx={{ mb: 3 }}
                  onClick={() => {
                    handleLike("like");
                  }}
                >
                  <ThumbUpOffAltIcon />
                  {item.likes}
                </Button>
              )}

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
                                  <TableCell>{commentsData.body}</TableCell>
                                  <TableCell align="center">
                                    {commentsData.username}
                                  </TableCell>
                                  <TableCell align="center">
                                    {commentsData.createdAt.slice(0, 10)}
                                  </TableCell>
                                  {commentsData.username === username ? (
                                    <TableCell>
                                      <Link
                                        to={`${commentsData._id}`}
                                        style={{
                                          textDecoration: "none",
                                          color: "coral",
                                        }}
                                        onClick={handleOpen}
                                      >
                                        수정
                                      </Link>
                                    </TableCell>
                                  ) : (
                                    <TableCell></TableCell>
                                  )}
                                </TableRow>

                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <Typography
                                      id="modal-modal-title"
                                      variant="h6"
                                      component="h2"
                                    >
                                      댓글 수정
                                    </Typography>
                                    <Typography
                                      id="modal-modal-description"
                                      sx={{ color: "red" }}
                                    >
                                      10자 이상 입력해주세요
                                    </Typography>
                                    <Box>
                                      <TextField
                                        variant="outlined"
                                        placeholder="수정할 댓글을 작성해주세요"
                                        fullWidth
                                        rows={10}
                                        sx={{ mt: 3 }}
                                        onChange={(e) => {
                                          setComment(e.target.value);
                                        }}
                                      />
                                      <Button
                                        variant="outlined"
                                        fullWidth
                                        onClick={updateComment}
                                      >
                                        작성
                                      </Button>
                                      {validation ? (
                                        <Typography
                                          sx={{
                                            color: "red",
                                            mt: 2,
                                            fontWeight: "bold",
                                          }}
                                        >
                                          댓글은 10자 이상 작성해주세요
                                        </Typography>
                                      ) : null}
                                    </Box>
                                  </Box>
                                </Modal>
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

                <Box>
                  <TextField
                    variant="outlined"
                    placeholder="댓글을 작성해주세요 (댓글은 삭제가 불가합니다.)"
                    fullWidth
                    defaultValue={comment}
                    sx={{ mt: 5 }}
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  />
                  <Button variant="outlined" fullWidth onClick={writeComment}>
                    작성
                  </Button>
                  {validation ? (
                    <Typography
                      sx={{ color: "red", mt: 2, fontWeight: "bold" }}
                    >
                      댓글은 10자 이상 작성해주세요
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </>
          );
        })}
      </>
    </Container>
  );
}
