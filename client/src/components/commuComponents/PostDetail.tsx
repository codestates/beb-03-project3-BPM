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
import Modal from "@mui/material/Modal";
import { Async } from "react-async";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export default function PostDetail() {
  let params = useParams();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(`/community/${params.boardid}/${params.postid}`);
  };

  // 상세페이지 불러오기
  const getDetail = () =>
    axios
      .get(`http://localhost:4000/post/${params.boardid}/${params.postid}`)
      .then((res) => {
        let postDetailData = res.data.data;
        return postDetailData;
      });

  // 댓글 작성
  let writeComment = async (event: any) => {
    const formData = new FormData(event.currentTarget);
    await axios.post(
      `http://localhost:4000/post/${params.boardid}/${params.postid}/comment`,
      {
        body: formData.get("comment"),
      },
      {
        withCredentials: true,
      }
    );
  };

  const updateComment = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    axios
      .patch(
        `http://localhost:4000/post/${params.boardid}/${params.postid}/comment/${params.commentid}`,
        {
          body: formData.get("comment"),
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        handleClose();
      })
      .catch((e) => {
        if (e.message === "Request failed with status code 403") {
          alert("자신이 작성한 댓글만 수정 가능합니다.");
          handleClose();
        }
      });
  };

  const handleLike = (like: string) => {
    if (like === "like") {
      console.log("dasdfsZfa");
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
                                          <Link to={`${commentsData._id}`}>
                                            <TableCell
                                              sx={{
                                                cursor: "pointer",
                                                color: "#888",
                                              }}
                                              onClick={handleOpen}
                                            >
                                              수정
                                            </TableCell>
                                          </Link>
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
                                            <Box
                                              component="form"
                                              onSubmit={updateComment}
                                            >
                                              <TextField
                                                variant="outlined"
                                                placeholder="댓글을 작성해주세요"
                                                fullWidth
                                                id="comment"
                                                name="comment"
                                                rows={10}
                                                sx={{ mt: 3 }}
                                              />
                                              <Button
                                                variant="outlined"
                                                type="submit"
                                                fullWidth
                                              >
                                                작성
                                              </Button>
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
