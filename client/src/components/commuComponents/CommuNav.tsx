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
} from '@mui/material';
import React, { useState } from 'react';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import StoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link } from 'react-router-dom';
import axios from 'axios';

async function getBoard() {
  let res = await axios.get('http://localhost:4000/post/readAll');
  console.log(res);
}
getBoard();
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
      setOpen(!open);
      // setOpen(!open)
    };
  return (
    <>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={() => toggleDrawer}
        sx={{
          p: 2,
          // [theme.breakpoints.up('md')]: { display: 'none' },
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        anchor='left'
        open={open}
        onClose={toggleDrawer}
      >
        <List sx={{ mt: 10, p: 3 }}>
          <Button fullWidth>게시판 만들기</Button>
          <Divider sx={{ mt: 2, mb: 2 }} />

          <ListItem button>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary={'Music Market'} />
          </ListItem>

          {['자유게시판', '아무개 게시판'].map((text, index) => (
            <Link to={`/:${text}`}>
              <ListItem button key={index}>
                <ListItemIcon>
                  <KeyboardIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </Link>
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
