import React from 'react';
import { Box, Container } from '@mui/material';

export default function Home() {
  return (
    <>
      <Container
        sx={{
          height: '2500px',
          bgcolor: 'lightblue',
          fontFamily: 'Nanum Gothic Coding',
        }}
      >
        <Box>Hello Home!</Box>
      </Container>
    </>
  );
}
