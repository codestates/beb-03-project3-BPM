import React from 'react';
import {
  Grid,
  InputBase,
  IconButton,
  AppBar,
  Toolbar,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import { Link } from 'react-router-dom';

// icons
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Nav() {
  return (
    <>
      <AppBar position='sticky' sx={{ bgcolor: '#333' }}>
        <Toolbar>
          <Grid container alignItems='center'>
            <Grid color={'#fff'} xs={2}>
              <Link to='/'>
                <p style={{ color: '#fff' }}>Logo</p>
              </Link>
            </Grid>
            <Grid item xs={7} textAlign='center'>
              <InputBase
                placeholder='검색어를 입력하세요'
                sx={{
                  color: '#eee',
                  padding: '0.5em 2em',
                  bgcolor: '#222',
                  mr: '10px',
                  width: '20vw',
                }}
              />
              <IconButton type='submit' aria-label='search'>
                <SearchIcon sx={{ color: '#fff', fontSize: '1.2em' }} />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              <IconButton sx={{ color: '#fff' }}>
                <InsertChartIcon />
              </IconButton>
              <Link to='/community'>
                <IconButton>
                  <GroupsIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Link>
              <IconButton>
                <AccountBalanceWalletIcon sx={{ color: '#fff' }} />
              </IconButton>
              <Link to='/mypage'>
                <IconButton>
                  <AccountBoxIcon sx={{ color: '#fff' }} />
                </IconButton>
              </Link>

              {/* 
              버튼 누르는 효과 더 잘보이고 아래 버튼 명 나오는거
              > 대신 모바일 버전은 따로 만들어야 될 듯
              위에거를 모바일 아래를 풀화면 으로 사용해도 괜찮을 듯 하지만
              우선은 이렇게,,
              <BottomNavigation showLabels sx={{ bgcolor: '#333' }}>
                <BottomNavigationAction
                  sx={{ color: '#fff' }}
                  label='chart'
                  icon={<InsertChartIcon />}
                ></BottomNavigationAction>
                <BottomNavigationAction
                  sx={{ color: '#fff' }}
                  label='community'
                  icon={<GroupsIcon />}
                ></BottomNavigationAction>
                <BottomNavigationAction
                  sx={{ color: '#fff' }}
                  label='wallet'
                  icon={<AccountBalanceWalletIcon />}
                ></BottomNavigationAction>
                <BottomNavigationAction
                  sx={{ color: '#fff' }}
                  label='my'
                  icon={<AccountBoxIcon />}
                ></BottomNavigationAction>
              </BottomNavigation> */}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
