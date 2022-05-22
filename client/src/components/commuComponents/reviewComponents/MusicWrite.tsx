import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Rating,
  tableCellClasses,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function MusicWrite() {
  const handlePost = () => {};

  return (
    <>
      <Box p={5} mt={5} textAlign="center">
        <Typography variant="h6">리뷰 작성</Typography>
        <TextField
          autoFocus
          id="title"
          // label="제목"
          type="title"
          variant="standard"
          placeholder="가수 - 곡명 형태로 작성!"
          InputProps={{
            style: {
              fontSize: 25,
              paddingLeft: 10,
              textAlign: "center",
              justifyContent: "center",
            },
          }}
          InputLabelProps={{
            style: {
              fontSize: 25,
              paddingLeft: 10,
              textAlign: "center",
              justifyContent: "center",
            },
          }}
          sx={{ m: "40px auto" }}
        />

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
                <TableCell align="center">평가 항목 별 점수</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">중독성</TableCell>
                <TableCell align="center">
                  <Rating name="half-rating-read" precision={0.1} />
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">예술성</TableCell>
                <TableCell align="center">
                  <Rating name="half-rating-read" precision={0.1} />
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">대중성</TableCell>
                <TableCell align="center">
                  <Rating name="half-rating-read" precision={0.1} />
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">개성</TableCell>
                <TableCell align="center">
                  <Rating name="half-rating-read" precision={0.1} />
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">가사</TableCell>
                <TableCell align="center">
                  <Rating name="half-rating-read" precision={0.1} />
                </TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TextField
          placeholder="리뷰를 작성해주세요"
          sx={{ width: "400px", mt: 5 }}
        />
      </Box>
      <Box textAlign="right" mr={5}>
        <Link to="/review" style={{ textDecoration: "none" }}>
          <Button size="large">취소</Button>
        </Link>
        <Button size="large" onClick={handlePost}>
          발행
        </Button>
      </Box>
    </>
  );
}
