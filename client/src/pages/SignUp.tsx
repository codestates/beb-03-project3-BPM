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
import axios from 'axios';

interface propstype {
  account: string;
  setIsLogin: any;
}

export default function SignUp({ account, setIsLogin }: propstype) {
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    axios
      .post('http://localhost:4000/user/signup', {
        address: account,
        username: formData.get('username'),
        email: formData.get('email'),
      })
      .then(() => {
        setIsLogin(true);
        navigate('/signin');
      })
      .catch((e) => {
        console.log(e);
      });
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
              fontSize='5rem'
              // fontFamily='Copperplate'
              // fontFamily='Papyrus'
              // fontFamily='Lucida Handwriting'
              // fontFamily='Monaco'
              // fontFamily='cursive'
              // fontFamily='fantasy'
              // fontFamily='Tahoma'
              // fontFamily='Teko'
              // fontFamily='Play'
              // fontFamily='Great Vibes'
              fontFamily='Sacramento'
              sx={{
                color: '#fff',
                textAlign: 'center',
              }}
              mb={10}
            >
              Better Paricipation in Music
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete='given-name'
                    name='username'
                    required
                    fullWidth
                    id='username'
                    label='닉네임'
                    autoFocus
                    sx={{
                      bgcolor: 'darkviolet',
                      '& label.Mui-focused': {
                        color: 'yellow',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'yellow',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          // borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'yellow',
                        },
                      },
                    }}
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
                    sx={{
                      bgcolor: 'darkviolet',
                      '& label.Mui-focused': {
                        color: 'yellow',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottomColor: 'yellow',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          // borderColor: 'white',
                        },
                        '&:hover fieldset': {
                          borderColor: 'white',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'yellow',
                        },
                      },
                    }}
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
                  '&: hover': {
                    bgcolor: 'white',
                    color: '#000',
                  },
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
