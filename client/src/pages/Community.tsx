import React from 'react';
import FreeBoard from '../components/commuComponents/FreeBoard';
import CommuNav from '../components/commuComponents/CommuNav';
import { Grid } from '@mui/material';
import { Route, Routes } from 'react-router';
import MusicReview from '../components/commuComponents/reviewComponents/MusicReview';

export default function Community() {
  return (
    <>
      <Grid container sx={{ fontFamily: 'Nanum Gothic Coding' }}>
        <Grid item xs={2}>
          <CommuNav />
        </Grid>
        <Grid item xs={8}>
          // 링크에 따라서 여기서 board가 바뀌어서 보여짐
          <Routes>
            <Route path='/community/:boardid' element={<FreeBoard />} />
            <Route path='/community/musicreview' element={<MusicReview />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
}
