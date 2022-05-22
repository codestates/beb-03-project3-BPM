import React, { useState } from "react";
import { Box, Container, Tabs, Tab } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

import MyReview from "../components/myComponents/MyReview";
import MyPost from "../components/myComponents/MyPost";
import MyComment from "../components/myComponents/MyComment";
import MyNFTs from "../components/myComponents/MyNFTs";
import Profile from "../components/myComponents/Profile";

export default function Mypage() {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Container sx={{ fontFamily: "Nanum Gothic Coding" }}>
        <Profile />
        <TabContext value={value}>
          <Box display="flex" justifyContent="center">
            <Tabs variant="scrollable" value={value} onChange={handleChange}>
              <Tab value="1" label="내가 쓴 리뷰 보기" />
              <Tab value="2" label="내가 쓴 글 보기" />
              <Tab value="3" label="내가 쓴 댓글 보기" />
              <Tab value="4" label="내 NFT 보기" />
            </Tabs>
          </Box>
          <TabPanel value="1">
            <MyReview />
          </TabPanel>
          <TabPanel value="2">
            <MyPost />
          </TabPanel>
          <TabPanel value="3">
            <MyComment />
          </TabPanel>
          <TabPanel value="4">
            <MyNFTs />
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}
