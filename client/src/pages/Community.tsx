import React from "react";
import Boards from "../components/commuComponents/Boards";
import CommuNav from "../components/commuComponents/CommuNav";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router";
import PostDetail from "../components/commuComponents/PostDetail";
import PostWrite from "../components/commuComponents/PostWrite";

interface propstype {
  username: string;
}

export default function Community({ username }: propstype) {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box position="sticky">
          <CommuNav />
        </Box>
        {/* 링크에 따라서 여기서 board가 바뀌어서 보여짐 */}
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path=":boardid/" element={<Boards />} />
            <Route
              path=":boardid/:postid"
              element={<PostDetail username={username} />}
            />
            <Route path=":boardid/write" element={<PostWrite />} />
            <Route
              path=":boardid/:postid/:commentid"
              element={<PostDetail username={username} />}
            />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
