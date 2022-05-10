import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';

export default function MyComment() {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>내용</TableCell>
              <TableCell align='center'>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>Hello My Comment!</TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
