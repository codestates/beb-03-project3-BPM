import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import Nav from './components/Nav';
import Community from './pages/Community';

function App() {
  return (
    <>
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/community' element={<Community />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
