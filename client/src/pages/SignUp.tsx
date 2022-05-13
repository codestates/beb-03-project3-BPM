import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    event.preventDefault();
  };
  return (
    <>
      <Box
        sx={{
          bgcolor: '#111',
          height: '100vh',
        }}
      >
        metamask login 만약 없는 유저면 이 회원가입 페이지로 오는데 닉네임이랑
        이메일 입력하는 칸 만들고 SignUp sumbmit!
        <Container sx={{ bgcolor: '#111' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h5'
            sx={{ fontFamily: 'Nanum Gothic' }}
          >
            회원가입
          </Typography> */}
            <Typography
              component='h1'
              variant='h2'
              sx={{
                fontFamily: 'cursive',
                // fontFamily: 'Tahoma',
                color: '#fff',
                textAlign: 'center',
              }}
              mb={10}
            >
              Better Paricipation in Music
            </Typography>
            <Box component='form' noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='nickName'
                    required
                    fullWidth
                    id='nickName'
                    label='닉네임'
                    autoFocus
                    sx={{ bgcolor: '#fff', borderRadius: '0' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='이메일'
                    name='email'
                    autoComplete='email'
                    sx={{ bgcolor: '#fff', borderRadius: '0' }}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  mb: 2,
                  p: 2,
                  fontSize: '1.2rem',
                  bgcolor: 'darkviolet',
                }}
              >
                회원가입
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
