import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function PostWrite() {
  const handlePost = () => {};

  return (
    <>
      <Box p={5} mt={5} textAlign="center">
        <Typography variant="h6">글 작성</Typography>
        <TextField
          autoFocus
          id="title"
          label="제목"
          type="title"
          fullWidth
          variant="standard"
          placeholder="글 제목을 작성해주세요"
          InputProps={{ style: { fontSize: 25, paddingLeft: 10 } }}
          InputLabelProps={{ style: { fontSize: 25, paddingLeft: 10 } }}
          sx={{ m: "40px auto" }}
        />
        <TextareaAutosize
          minRows={20}
          style={{ width: "100%", fontSize: "20px", padding: 20 }}
        />
      </Box>
      <Box textAlign="right" mr={5}>
        <Link
          to="/community/627b5e9dd6b52cc4fe03a75d"
          style={{ textDecoration: "none" }}
        >
          <Button size="large">취소</Button>
        </Link>
        <Button size="large" onClick={handlePost}>
          발행
        </Button>
      </Box>
    </>
  );
}
