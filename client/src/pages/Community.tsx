import React from 'react';
import FreeBoard from '../components/commuComponents/FreeBoard';
import CommuNav from '../components/commuComponents/CommuNav';
import { Grid } from '@mui/material';

export default function Community() {
  return (
    <>
      <Grid container sx={{ fontFamily: 'Nanum Gothic Coding' }}>
        <Grid item xs={2}>
          <CommuNav />
        </Grid>
        <Grid item xs={8}>
          <FreeBoard />
        </Grid>
      </Grid>
    </>
  );
}
