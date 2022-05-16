import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Nav from './components/Nav';
import Chart from './pages/Chart';
import Community from './pages/Community';
import Mypage from './pages/Mypage';
import SignUp from './pages/SignUp';
import MusicReview from './components/commuComponents/reviewComponents/MusicReview';
import SignIn from './pages/SignIn';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <div>
        <CssBaseline />
        <Nav />
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/community/*' element={<Community />} />
          <Route path='/review/*' element={<MusicReview />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
