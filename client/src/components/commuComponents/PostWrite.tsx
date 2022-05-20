import * as React from "react";
import { Box, Divider, TextField, Typography } from "@mui/material";

export default function PostWrite() {
  return (
    <>
      <Box p={5}>
        <Typography></Typography>
        <TextField
          autoFocus
          id="title"
          label="제목"
          type="title"
          fullWidth
          variant="standard"
          placeholder="글 제목을 작성해주세요"
          sx={{}}
        />

        <Divider />
        <TextField fullWidth />
      </Box>
    </>
  );
}
