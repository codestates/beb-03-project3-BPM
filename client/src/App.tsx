import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Chart from "./pages/Chart";
import ChartDetail from "./components/chartComponents/index";
import Community from "./pages/Community";
import Mypage from "./pages/Mypage";
import SignUp from "./pages/SignUp";
import MusicReview from "./components/commuComponents/reviewComponents/MusicReview";
import MusicDetail from "./components/commuComponents/reviewComponents/MusicDetail";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import { CssBaseline } from "@mui/material";
import Column from "./components/commuComponents/columnComponents/Column";
import ColumnDetail from "./components/commuComponents/columnComponents/ColumnDetail";
import ColumnWrite from "./components/commuComponents/columnComponents/ColumnWrite";
import MusicWrite from "./components/commuComponents/reviewComponents/MusicWrite";
import AboutUs from "./pages/AboutUs";
import RoadMap from "./pages/RoadMap";
import AboutChart from "./pages/AboutChart";

function App() {
  return (
    <>
      <div>
        <CssBaseline />
        <Nav />
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/aboutchart" element={<AboutChart />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/chart/:chartid" element={<ChartDetail />} />
          <Route path="/community/*" element={<Community />} />
          <Route path="/review" element={<MusicReview />} />
          <Route path="/review/:reviewid" element={<MusicDetail />} />
          <Route
            path="/review/:reviewid/:commentid"
            element={<MusicDetail />}
          />
          <Route path="/review/write" element={<MusicWrite />} />
          <Route path="/column" element={<Column />} />
          <Route path="/column/:columnid" element={<ColumnDetail />} />
          <Route path="/column/write" element={<ColumnWrite />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
