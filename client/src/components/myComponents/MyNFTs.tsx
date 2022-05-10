import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';

export default function MyNFTs() {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>곡명</TableCell>
              <TableCell align='center'>구매일</TableCell>
              <TableCell align='center'>다운로드</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* <TableCell></TableCell> */}
              Hello My NFT!
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
