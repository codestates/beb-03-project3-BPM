<<<<<<< HEAD
import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Nav from './components/Nav';
import Chart from './pages/Chart';
import Community from './pages/Community';
import Mypage from './pages/Mypage';
import SignUp from './pages/SignUp';
import MusicReview from './components/commuComponents/reviewComponents/MusicReview';
import MusicDetail from './components/commuComponents/reviewComponents/MusicDetail';
import SignIn from './pages/SignIn';
import { CssBaseline } from '@mui/material';
import Footer from './components/Footer';
=======
import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Chart from "./pages/Chart";
import Community from "./pages/Community";
import Mypage from "./pages/Mypage";
import SignUp from "./pages/SignUp";
import MusicReview from "./components/commuComponents/reviewComponents/MusicReview";
import SignIn from "./pages/SignIn";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
>>>>>>> 341155d024d3c9220e316d214ff7a9e237cffb4f

function App() {
  const [account, setAccount] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <div>
        <CssBaseline />
        <Nav />
        <Routes>
<<<<<<< HEAD
          <Route path='/*' element={<Home />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/community/*' element={<Community />} />
          <Route path='/review/' element={<MusicReview />} />
          <Route path='/review/:reviewid' element={<MusicDetail />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
=======
          <Route path="/*" element={<Home />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/community/*" element={<Community />} />
          <Route path="/review/*" element={<MusicReview />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route
            path="/signin"
            element={
              <SignIn
                setAccount={setAccount}
                setIsLogin={setIsLogin}
                account={account}
                isLogin={isLogin}
              />
            }
          />
          <Route
            path="/signup"
            element={<SignUp setIsLogin={setIsLogin} account={account} />}
          />
>>>>>>> 341155d024d3c9220e316d214ff7a9e237cffb4f
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
