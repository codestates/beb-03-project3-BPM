import {
  IconButton,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  CssBaseline,
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import StoreIcon from '@mui/icons-material/LocalGroceryStore';

export default function CommuNav() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event as KeyboardEvent).key === 'Tab'
      ) {
        return;
      }
      setOpen(open);
      // setOpen(!open)
    };
  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        edge='start'
        // onClick={toggleDrawer}
        // sx={{ [theme.breakpoints.up('md')]: { display: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <CssBaseline />
      <Drawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        anchor='left'
        open={open}
        onClose={toggleDrawer}
      >
        <List sx={{ mt: 10, p: 3 }}>
          <Button fullWidth>게시판 만들기</Button>
          <Divider sx={{ mt: 2, mb: 2 }} />

          {['자유게시판', '음악 리뷰'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {/* 음악리뷰만 별 나머지는 키보드 아이콘으로 해놓음! 필요하면 바꿀 수 있는 부부누누우우눈 */}
                {index === 1 ? <StarIcon /> : <KeyboardIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <Divider sx={{ mt: 2, mb: 2 }} />

          <ListItem button>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary={'Music Market'} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
