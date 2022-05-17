import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
} from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

import MyReview from '../components/myComponents/MyReview';
import MyPost from '../components/myComponents/MyPost';
import MyComment from '../components/myComponents/MyComment';
import MyNFTs from '../components/myComponents/MyNFTs';

export default function Mypage() {
  const isTablet = useMediaQuery('(max-width: 1100px');
  const isMobile = useMediaQuery('(max-width: 750px');
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Container sx={{ fontFamily: 'Nanum Gothic Coding' }}>
        <Grid container justifyContent='center' p={5}>
          <Grid item xs={2}>
            <Box
              sx={{ width: '150px', height: '150px', bgcolor: 'lightblue' }}
            ></Box>
          </Grid>
          <Grid item xs={4}>
            <Box ml={3}>
              {/* 이 본인 닉네임 정보 있는 box 컴포넌트가 // isMobile에서는
              프로필사진의 하단으로 가게!
              프로필 사진 
              */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: '10px',
                }}
              >
                {/* <TextField
                  // placeholer 말고 label로 할 수도 있음 > value로 해도 될...듯?
                  placeholder='본인 닉네임'
                  size='small'
                  sx={{ p: '2px' }}
                /> */}
                <Typography>본인 닉네임</Typography>
                <Button
                  variant='outlined'
                  // size='large'
                  // sx={{ p: '6.5px', mt: '1px', ml: '5px' }}
                  size='small'
                  sx={{ ml: '15px' }}
                >
                  수정
                </Button>
              </Box>
              <Box
                sx={{
                  mt: '5px',
                  p: '10px',
                }}
              >
                <Typography mb={1}>지갑주소</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <TabContext value={value}>
          <Box display='flex' justifyContent='center'>
            <Tabs variant='scrollable' value={value} onChange={handleChange}>
              <Tab value='1' label='내가 쓴 리뷰 보기' />
              <Tab value='2' label='내가 쓴 글 보기' />
              <Tab value='3' label='내가 쓴 댓글 보기' />
              <Tab value='4' label='내 NFT 보기' />
            </Tabs>
          </Box>
          <TabPanel value='1'>
            <MyReview />
          </TabPanel>
          <TabPanel value='2'>
            <MyPost />
          </TabPanel>
          <TabPanel value='3'>
            <MyComment />
          </TabPanel>
          <TabPanel value='4'>
            <MyNFTs />
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}
