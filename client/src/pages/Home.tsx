import { useRef, useEffect } from 'react';
import { Box, Container, useScrollTrigger, Grow } from '@mui/material';
import practiceSvg from '../Frame 2.svg';
import { Theme } from '@mui/material/styles';

export default function Home() {
  // interface UseScrollTriggerOptions {
  //   disableHysteresis?: boolean;
  //   target?: Node | Window;
  //   threshold?: number;
  // }

  const ref = useRef(null);
  const scrollTrigger = useScrollTrigger();
  const path1 = document.querySelector('.path1');
  // path1.style.strokeDasharry;
  console.log(path1);
  return (
    <>
      <Container
        sx={{
          height: '2500px',
          bgcolor: 'black',
          fontFamily: 'Nanum Gothic',
          color: '#fff',
        }}
      >
        <Box>Hello Home!</Box>

        <Grow className='path1' mountOnEnter in={scrollTrigger} timeout={1000}>
          <img src={practiceSvg} stroke-dasharray='50' />
        </Grow>
        <svg viewBox='0 0 30 10' xmlns='http://www.w3.org/2000/svg'>
          <line x1='0' y1='1' x2='30' y2='1' stroke='red' />

          <line
            x1='0'
            y1='3'
            x2='30'
            y2='3'
            stroke='red'
            stroke-dasharray='4'
          />

          <line
            x1='0'
            y1='5'
            x2='30'
            y2='5'
            stroke='red'
            stroke-dasharray='4 1'
          />

          <line
            x1='0'
            y1='7'
            x2='30'
            y2='7'
            stroke='red'
            stroke-dasharray='4 1 2'
          />

          <line
            x1='0'
            y1='9'
            x2='30'
            y2='9'
            stroke='red'
            stroke-dasharray='4 1 2 3'
          />
        </svg>

        {/* <Box component='svg' 
            sx={{
              fill: (theme: Theme) => theme.palette.common.white,
              stroke: (theme) => theme.palette.divider,
              strokeWidth: 1,
            }}
            points='0,100 50,00, 100,100'
          />
        </Box> */}
      </Container>
    </>
  );
}
