import { useRef, useEffect, useCallback, UIEvent } from 'react';
import { Box, Container, useScrollTrigger, Grow } from '@mui/material';
import practiceSvg from '../asset/Frame 2.svg';
import { Theme } from '@mui/material/styles';

export default function Home() {
  // interface UseScrollTriggerOptions {
  //   disableHysteresis?: boolean;
  //   target?: Node | Window;
  //   threshold?: number;
  // }

  /** 
   * 우선 첫번째로 scrollY 값을 구할 수 있어야되고
   * strokeDashoffset이 react에서도 사용할 수 있는지 확인해야됨
   * function calcDashoffset(scrollY, element, length) { scrollY는 구해야되고
   * element = ref.current
   * length = offsetHeight
  //   const ratio = (scrollY - element.offsetTop) / element.offsetHeight
  //   const value = length - (length * ratio)
  //   return value < 0 ? 0 : value > length ? length : value
  // }

  // function scrollHandler() {
  //   const scrollY = window.scrollY + (window.innerHeight * 0.8) innerHeight = vh
  //   path1.style.strokeDashoffset = calcDashoffset(scrollY, content1, path1Length)
  //   path2.style.strokeDashoffset = calcDashoffset(scrollY, content2, path2Length)
  //   path3.style.strokeDashoffset = calcDashoffset(scrollY, content3, path3Length)
  // }

  // window.addEventListener('scroll', scrollHandler) */

  // scroll에 따라 dash offset 의 값이 바뀌어야됨! 0 ~ img height까지@
  // calc dash offset은 스크롤 길이에 따라 바꿔주려고 하는거
  // innerHeignt = vh
  // scrollY 는 전체 화면에서 얼마나 스크롤이 내려왔는지
  // scroll Top

  const ref = useRef();
  const scrollTrigger = useScrollTrigger();
  // const handleScroll = useCallback((): void => {
  // // 내용 구현
  // }, [])
  console.log('===>>>', ref);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {};

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

        <Grow
          className='path1'
          ref={ref}
          mountOnEnter
          in={scrollTrigger}
          // timeout={1000}
          onScroll={handleScroll}
        >
          <img src={practiceSvg} stroke-dashoffset='50px' />
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
