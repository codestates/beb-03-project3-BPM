import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
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
} from '@mui/material';
import { Async } from 'react-async';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function PostDetail(title: any) {
  let params = useParams();
  const getDetail = async () =>
    await axios
      .get(`http://localhost:4000/post/${params.boardid}/${params.postid}`)
      .then((res) => {
        let postDetailData = res.data.data;
        console.log('postdata>>', postDetailData);
        return postDetailData;
      });
  let writeComment = async () => {
    await axios.post(
      `http://localhost:4000/post/${params.boardid}/${params.postid}/comment`,
      { content: 'hello', userid: '1234' },
      {
        withCredentials: true,
      }
    );
    console.log('comments>>', writeComment);
  };
  const deleteComment = async () => {
    await axios.delete(
      `http://localhost:4000/post/${params.boardid}/${params.postid}/comment`
    );
  };

  return (
    <>
      <Container sx={{ textAlign: 'center' }}>
        <Async promiseFn={getDetail}>
          {({ data, error, isPending }) => {
            if (isPending) return 'Loding....';
            if (error) return;

            return (
              <>
                {data.map((item: any) => {
                  let comments = item.comments;
                  console.log(comments);
                  return (
                    <>
                      <Typography
                        variant='h2'
                        m='80px 0 10px 0'
                        fontSize='1.8rem'
                        // fontFamily='Copperplate'
                        // fontFamily='Papyrus'
                        fontFamily='Lucida Handwriting'
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
                        mb='100px'
                        fontFamily='Nanum Gothic'
                        color='coral'
                      >
                        {item.username}
                      </Typography>
                      <Divider />
                      <Typography pt={20} pb={20}>
                        {item.body}
                      </Typography>
                      <Divider />

                      <Box width='100%'>
                        <TableContainer>
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell align='center'>댓글 내용</TableCell>
                                <TableCell align='center'>작성자</TableCell>
                                <TableCell align='center'>작성일</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {comments.length !== 0
                                ? comments.map((comments: any) => {
                                    return (
                                      <>
                                        <TableRow>
                                          <TableCell>{comments.body}</TableCell>
                                          <TableCell align='center'>
                                            {comments.username}
                                          </TableCell>
                                          <TableCell align='center'>
                                            {comments.createdAt.slice(0, 10)}
                                          </TableCell>
                                          <TableCell
                                            sx={{
                                              cursor: 'pointer',
                                              color: '#888',
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
                          <Typography mt={10} mb={10} textAlign='center'>
                            댓글이 없습니다
                          </Typography>
                        ) : null}

                        <TextField
                          variant='outlined'
                          placeholder='댓글을 작성해주세요'
                          fullWidth
                          sx={{ mt: 5 }}
                        ></TextField>
                        <Button
                          variant='outlined'
                          onClick={writeComment}
                          fullWidth
                        >
                          작성
                        </Button>
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
