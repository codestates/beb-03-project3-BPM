import { Button } from '@mui/material';
import React, { useState } from 'react';

export default function CommuNav() {
  const [mobile, setMobile] = useState(false);
  const [toggle, setToggle] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event as KeyboardEvent).key === 'Tab'
      ) {
        return;
      }
      setToggle(open);
    };
  return (
    <>
      <Button>Click here!</Button>
    </>
  );
}
