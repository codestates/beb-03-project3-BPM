import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function MyNFTs() {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">곡명</TableCell>
              <TableCell align="center">구매일</TableCell>
              <TableCell align="center">다운로드</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Typography mt={10} textAlign="center">
        보유한 NFT가 없습니다.
      </Typography>
    </>
  );
}
