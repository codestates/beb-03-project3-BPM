import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';

export default function MyReview() {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>곡명</TableCell>
              <TableCell align='center'>작성일</TableCell>
              <TableCell align='center'>추천수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* <TableCell align=''></TableCell> */}
              Hello My Review!
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
