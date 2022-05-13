import React from 'react';
import {
  Typography,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

export default function FreeBoard() {
  return (
    <>
      <Container sx={{ textAlign: 'center' }}>
        <Typography
          variant='h2'
          m='80px 0 10px 0'
          // fontFamily='Copperplate'
          fontFamily='Papyrus'
          // fontFamily='Lucida Handwriting'
          // fontFamily='Monaco'
          // fontFamily='cursive'
          // fontFamily='fantasy'
          // fontFamily: 'Tahoma'
        >
          Free Board
        </Typography>
        <Typography variant='subtitle1' mb='100px' fontFamily=''>
          자유로운 우리를 봐 자유로워
        </Typography>
        <TableContainer>
          <Table sx={{ fontFamily: 'Nanum Gothic Coding' }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>제목</TableCell>
                <TableCell align='center'>작성일</TableCell>
                <TableCell align='center'>작성자</TableCell>
                <TableCell align='center'>추천수</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* <TableRow key={data.id}>
                map 돌고 data.id ~ recommend 까지 다 출력!
                <TableCell scope='row'>{data.id}</TableCell>
                <TableCell>{data.topic}</TableCell>
                <TableCell>{data.userName}</TableCell>
                <TableCell>{data.createAt}</TableCell>
                <TableCell>{data.recommend}</TableCell>
              </TableRow> */}
              Hello Free Board
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
