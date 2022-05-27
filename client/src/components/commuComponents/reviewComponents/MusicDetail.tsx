import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TableFooter,
  TablePagination,
  Divider,
  Button,
  TextField,
  Rating,
  Container,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useParams } from "react-router";
import CommuNav from "../CommuNav";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { unsetUser } from "../../../modules/userReducer";
import TablePaginationActions from "../../TablePaginationActions";

export default function MusicDetail() {
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [commentEventFlag, setCommentEventFlag] = useState(false);
  const [validation, setValidation] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(`/review/${params.reviewid}`);
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/review/${params.reviewid}`).then((res) => {
      let musicDetailData = res.data.data;
      setData(musicDetailData);
    });
  }, [like, commentEventFlag]);

  useEffect(() => {
    if (userInfo !== null) {
      axios
        .get(`http://localhost:4000/review/${params.reviewid}/checklike`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "ok") {
            setLike(true);
          } else if (res.data.message === "no") {
            setLike(false);
          }
        })
        .catch((e) => {
          if (e.message === "Request failed with status code 400") {
            alert("로그인 만료");
            dispatch(unsetUser());
          }
        });
    }
  }, []);

  // 댓글 작성
  const writeComment = () => {
    if (userInfo === null) {
      alert("로그인 해주세요");
    } else {
      if (comment.length < 10) {
        setValidation(true);
      } else {
        axios
          .post(
            `http://localhost:4000/review/${params.reviewid}/comment`,
            {
              content: comment,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            setCommentEventFlag(!commentEventFlag);
            setComment("");
            setValidation(false);
          })
          .catch((e) => {
            if (e.message === "Request failed with status code 400") {
              alert("로그인 만료");
              dispatch(unsetUser());
            }
          });
      }
    }
  };

  const updateComment = (event: any) => {
    if (comment.length < 10) {
      setValidation(true);
    } else {
      axios
        .patch(
          `http://localhost:4000/review/${params.reviewid}/comment/${params.commentid}`,
          {
            content: comment,
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
          } else if (e.message === "Request failed with status code 400") {
            alert("로그인 만료");
            dispatch(unsetUser());
          }
        });
    }
  };

  // 좋아요
  const handleLike = (like: string) => {
    if (userInfo === null) {
      alert("로그인 해주세요");
    } else {
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
          })
          .catch((e) => {
            if (e.message === "Request failed with status code 400") {
              alert("로그인 만료");
              dispatch(unsetUser());
            }
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
          })
          .catch((e) => {
            if (e.message === "Request failed with status code 400") {
              alert("로그인 만료");
              dispatch(unsetUser());
            }
          });
      }
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
          <Container>
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
                    {item.chart.artist} - {item.title}
                  </Typography>
                  <Typography mb="25px" fontFamily="Nanum Gothic" color="coral">
                    {item.username}
                  </Typography>
                  <Box display="flex" justifyContent="space-between">
                    <Box>&nbsp;</Box>
                    <Box ml={8}>
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
                    </Box>
                    <Box>
                      {item.username === userInfo?.username ? (
                        <Button
                          component={Link}
                          to={`/review/write`}
                          state={{
                            id: item.id,
                            body: item.body,
                          }}
                        >
                          수정
                        </Button>
                      ) : (
                        <Button></Button>
                      )}
                    </Box>
                  </Box>
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
                              defaultValue={item.evaluation.Addictive}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {item.evaluation.Addictive}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">예술성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={item.evaluation.artistry}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {item.evaluation.artistry}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">대중성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={item.evaluation.popularity}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {item.evaluation.popularity}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">개성</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={item.evaluation.individuality}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {item.evaluation.individuality}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">가사</TableCell>
                          <TableCell align="center">
                            <Rating
                              name="half-rating-read"
                              defaultValue={item.evaluation.lyrics}
                              precision={0.1}
                              readOnly
                            />
                          </TableCell>
                          <TableCell align="center">
                            {item.evaluation.lyrics}
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
                    "{item.body}"
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
                          ? comments
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((commentData: any) => {
                                return (
                                  <>
                                    <TableRow>
                                      <TableCell>
                                        {commentData.comment}
                                      </TableCell>
                                      <TableCell align="center">
                                        {commentData.username}
                                      </TableCell>
                                      <TableCell align="center">
                                        {commentData.createdAt.slice(0, 10)}
                                      </TableCell>
                                      {commentData.username ===
                                      userInfo?.username ? (
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
                            count={comments.length}
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

                  {comments.length === 0 ? (
                    <Typography mt={10} mb={10} textAlign="center">
                      댓글이 없습니다
                    </Typography>
                  ) : null}

                  {/* 댓글 작성 부분 */}
                  <Box>
                    <TextField
                      variant="outlined"
                      placeholder="댓글을 작성해주세요 (댓글은 삭제가 불가합니다.)"
                      fullWidth
                      defaultValue=""
                      value={comment}
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
                </>
              );
            })}
          </Container>
        </Box>
      </Box>
    </>
  );
}
