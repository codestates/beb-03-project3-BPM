import { Box } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import CommuNav from '../CommuNav';

export default function PostDetail() {
  let params = useParams();
  console.log(params);
  async function getMusicPost() {
    let res = await axios.get(
      `http://localhost:4000/post/review/${params._id}`
    );
    console.log('musicres>>', res);
  }
  getMusicPost();
  return (
    <>
      <Box display='flex'>
        <Box position='sticky'>
          <CommuNav />
        </Box>
        <Box sx={{ flexGrow: 1 }}>Hello Music detail</Box>
      </Box>
    </>
  );
}
