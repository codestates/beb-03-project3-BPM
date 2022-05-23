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
  CircularProgress,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import axios from "axios";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Async } from "react-async";
import { useParams } from "react-router";
import CommuNav from "../CommuNav";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function MusicDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(`/review/${params.reviewid}`);
  };

  const getMusicPost = async () =>
    await axios
      .get(`http://localhost:4000/review/${params.reviewid}`)
      .then((res) => {
        let musicDetailData = res.data.data;
        return musicDetailData;
      });

  // 댓글 작성
  const writeComment = async (event: any) => {
    const formData = new FormData(event.currentTarget);
    console.log(formData.get("comment"));
    await axios.post(
      `http://localhost:4000/review/${params.reviewid}/comment`,
      {
        content: formData.get("comment"),
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
        `http://localhost:4000/review/${params.reviewid}/comment/${params.commentid}`,
        {
          content: formData.get("comment"),
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

  // 좋아요
  const handleLike = (like: string) => {
    if (like === "like") {
      axios
        .post(
          `http://localhost:4000/review/${params.reviewid}/like`,
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
          `http://localhost:4000/review/${params.reviewid}/unlike`,
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
      <Box display="flex">
        <Box position="sticky">
          <CommuNav />
        </Box>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Async promiseFn={getMusicPost}>
            {({ data, error, isPending }) => {
              if (isPending) return <CircularProgress color="inherit" />;
              if (error) return `Something went wrong: ${error.message}`;

              let comments = data[0].comments;

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
                    {data[0].chart.artist} - {data[0].title}
                  </Typography>
                  <Typography mb="25px" fontFamily="Nanum Gothic" color="coral">
                    {data[0].username}
                  </Typography>
                  {like ? (
                    <Button
                      sx={{ mb: 3 }}
                      onClick={() => {
                        handleLike("unlike");
                      }}
                    >
                      <ThumbUpAltIcon />
                      {data[0].likes}
                    </Button>
                  ) : (
                    <Button
                      sx={{ mb: 3 }}
                      onClick={() => {
                        handleLike("like");
                      }}
                    >
                      <ThumbUpOffAltIcon />
                      {data[0].likes}
                    </Button>
                  )}

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
                              defaultValue={data[0].evaluation.Addictive}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data[0].evaluation.Addictive}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">예술성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data[0].evaluation.artistry}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data[0].evaluation.artistry}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">대중성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data[0].evaluation.popularity}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data[0].evaluation.popularity}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">개성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data[0].evaluation.individuality}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data[0].evaluation.individuality}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">가사</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={data[0].evaluation.lyrics}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {data[0].evaluation.lyrics}
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
                    "{data[0].body}"
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
                                    <TableCell>{commentData.comment}</TableCell>
                                    <TableCell align="center">
                                      {commentData.username}
                                    </TableCell>
                                    <TableCell align="center">
                                      {commentData.createdAt.slice(0, 10)}
                                    </TableCell>

                                    <TableCell>
                                      <Link
                                        to={`${commentData._id}`}
                                        style={{
                                          textDecoration: "none",
                                          color: "coral",
                                        }}
                                        onClick={handleOpen}
                                      >
                                        수정
                                      </Link>
                                    </TableCell>
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

                  {/* 댓글 작성 부분 */}
                  <Box m={3} component="form" onSubmit={writeComment}>
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
