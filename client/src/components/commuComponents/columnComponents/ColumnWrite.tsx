import * as React from "react";
import {
  Box,
  TextField,
  Typography,
  TextareaAutosize,
  Button,
  Autocomplete,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function ColumnWrite() {
  const handlePost = () => {};

  return (
    <>
      <Box p={5} mt={5} textAlign="center">
        <Typography variant="h5" fontWeight={700} fontFamily="serif">
          칼럼 작성
        </Typography>
        <TextField
          autoFocus
          id="title"
          label="제목"
          type="title"
          fullWidth
          variant="standard"
          placeholder="글 제목을 작성해주세요"
          InputProps={{
            style: {
              fontSize: 20,
              fontFamily: "serif",
              paddingLeft: 10,
              textAlign: "center",
              justifyContent: "center",
            },
          }}
          InputLabelProps={{
            style: {
              fontSize: 20,
              fontFamily: "serif",
              paddingLeft: 10,
              textAlign: "center",
              justifyContent: "center",
            },
          }}
          sx={{ m: "40px auto" }}
        />
        {/*
        이 부분이 노래 검색 데이터
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable 
          //  미리보기 뜨는 부분 노래데이터.map해서 title 가져올 수 있음
           options={data.map((option) => option.title)}
           renderInput={(params) => (
             <TextField
              {...params}
               label="Search input"
             InputProps={{
                ...params.InputProps,
                type: "search",
               }}
            />
           )}
         /> */}
        <TextareaAutosize
          minRows={20}
          style={{
            width: "100%",
            fontSize: "20px",
            padding: 20,
            fontFamily: "serif",
          }}
        />
      </Box>
      <Box textAlign="right" mr={5}>
        <Link to="/column" style={{ textDecoration: "none" }}>
          <Button size="large">취소</Button>
        </Link>
        <Button size="large" onClick={handlePost}>
          발행
        </Button>
      </Box>
    </>
  );
}
