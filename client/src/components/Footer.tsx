import { Container, Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <>
      <Container sx={{ bgcolor: "", p: 5, textAlign: "center", mt: 10 }}>
        <Box>
          <Typography variant="h2" fontFamily="Great Vibes">
            Better Participation in Music
          </Typography>
          <Typography mt={2}>
            기존 음원 순위에 대한 평가 검증 시스템을 갖춘 뮤지션들의 커뮤니티
          </Typography>
          <Box display="flex" justifyContent="center">
            <Typography color="coral" mr={1}>
              기획 |{" "}
            </Typography>
            <Typography>
              <a
                href="https://velog.io/@dappfer_eth"
                target="_blank"
                style={{ textDecoration: "none", color: "#111" }}
              >
                김민성
              </a>
            </Typography>
            <Typography color="lightcoral" ml={3} mr={1}>
              개발 |
            </Typography>
            <Typography>
              <a
                href="https://yoon-asha.tistory.com/"
                target="_blank"
                style={{ textDecoration: "none", color: "#111" }}
              >
                윤다미
              </a>{" "}
              <a
                href="https://github.com/journiyoon"
                target="_blank"
                style={{ textDecoration: "none", color: "#111" }}
              >
                윤지연
              </a>{" "}
              <a
                href="https://github.com/sujin96"
                target="_blank"
                style={{ textDecoration: "none", color: "#111" }}
              >
                이수진
              </a>
            </Typography>
          </Box>
        </Box>
        <IconButton href="https://github.com/codestates/beb-03-project3-BPM.git">
          <GitHubIcon sx={{ color: "#333" }} />
        </IconButton>
        <IconButton
          sx={{ width: 43 }}
          target="_blank"
          href="https://www.notion.so/Better-Participation-in-Music-777081791ad945c5ad036c32d56ad6f8"
        >
          <img
            src="https://img.icons8.com/color/48/000000/notion--v1.png"
            style={{ width: "100%" }}
          />
        </IconButton>
        <IconButton
          sx={{ width: 45 }}
          href="
        https://discord.gg/TH8UYGja"
          target="_blank"
        >
          <img
            style={{ width: "100%" }}
            src="https://img.icons8.com/ios-filled/50/000000/discord-logo.png"
          />
        </IconButton>
        <Typography>Design by 2022.Asha</Typography>
      </Container>
    </>
  );
}
