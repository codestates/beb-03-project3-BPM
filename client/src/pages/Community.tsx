import React from 'react';
import Boards from '../components/commuComponents/Boards';
import CommuNav from '../components/commuComponents/CommuNav';
import { Box } from '@mui/material';
import { Route, Routes } from 'react-router';
import MusicReview from '../components/commuComponents/reviewComponents/MusicReview';

export default function Community() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box position='sticky'>
          <CommuNav />
        </Box>
        {/* 링크에 따라서 여기서 board가 바뀌어서 보여짐 */}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path=':boardid' element={<Boards />} />
            {/* <Route path='/review' element={<MusicReview />} /> */}
          </Routes>
        </Box>
      </Box>
    </>
  );
}
