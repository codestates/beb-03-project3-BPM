import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Nav from './components/Nav';
import Chart from './pages/Chart';
import Community from './pages/Community';
import Mypage from './pages/Mypage';
import { CssBaseline } from '@mui/material';

// export const Context = createContext();

function App() {
  return (
    <>
      <div>
        <CssBaseline />
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/community' element={<Community />} />
          <Route path='/mypage' element={<Mypage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
