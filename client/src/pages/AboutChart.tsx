import * as React from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import {
  motion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import benner from "../img/fullbener.png";
import fullLogo from "../img/bpm-full2.png";

export default function AboutChart() {
  const goToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [imageHeight, getImageHeight] = React.useState<number>(0);
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    const image = (ref.current && ref.current.height) || 0;
    getImageHeight(image);
  }, [imageHeight]);

  const offsetHeight = 50;
  const { scrollY } = useViewportScroll();
  const yRange = useTransform(scrollY, [imageHeight - offsetHeight, 0], [0, 1]);
  const opacity = useSpring(yRange, { stiffness: 400, damping: 40 });

  return (
    <>
      <motion.img
        ref={ref}
        src="https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774"
        alt="gradient"
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: -1,
          opacity,
        }}
      />

      <Container sx={{ bgcolor: "#fff", borderRadius: "70px" }}>
        <Box
          aria-label="edit"
          sx={{
            width: 100,
            height: 110,
            position: "fixed",
            right: "60px",
            bottom: "65px",
            background: `no-repeat center center url(${fullLogo})`,
            backgroundSize: "contain",
            cursor: "pointer",
          }}
          onClick={goToTop}
        ></Box>
        <Typography width="400px" m="80px auto 0">
          <img
            src={benner}
            style={{ width: "100%", marginTop: 120, border: "1px solid #000" }}
          />
        </Typography>
        <Box py={5} textAlign="center">
          <Typography
            variant="h3"
            fontFamily="Nanum Gothic"
            fontWeight={900}
            letterSpacing="4px"
            mt={8}
            mb={10}
            mx="auto"
            width="80%"
          >
            Chart Evaluation System
          </Typography>
          <Typography
            fontFamily="Nanum Gothic"
            sx={{
              wordSpacing: 3,
              letterSpacing: 2,
              lineHeight: 2,
              width: "80%",
              m: "0 auto",
            }}
          >
            BPM??? ????????? ?????? ?????? ????????? BPM ???????????? ????????? ????????? ?????? ?????????
            ???????????????.
            <br /> ??? ?????? ????????? ?????? ??????????????????, ???????????? ????????????
            ??????????????? ?????? ????????? ????????? ?????? ????????? ?????? ????????? ??? ???
            ????????????.
            <br /> ????????? ?????? ????????? ??????????????? ?????? ????????? ?????? ?????? ?????? ??????
            ???????????? ??? ?????? ????????? ????????? ???????????????.
          </Typography>
        </Box>
        <Divider sx={{ mt: 5, mb: 15, borderColor: "lightcoral" }} />
        <Box p={5} textAlign="center">
          <Typography variant="h4" fontFamily="Nanum Gothic" fontWeight={600}>
            HOW REVIEWS ARE REFLECTED
          </Typography>
          <Box py={10}>
            <Typography
              fontFamily="Nanum Gothic"
              sx={{
                wordSpacing: 3,
                letterSpacing: 2,
                lineHeight: 2,
                width: "80%",
                m: "0 auto",
              }}
            >
              <br /> BPM??? ???????????? ????????? ????????? ?????? ???????????? ????????? ??????
              ?????????.
              <br /> ???????????? ??? ????????? ?????? ?????? ?????? ???????????? ???????????????.
              <Typography
                variant="h6"
                fontFamily="Nanum Gothic"
                fontWeight={600}
                mt={5}
                mx="auto"
                width="80%"
              >
                ?????? ??????
              </Typography>
              <br /> - ?????????
              <br /> - ?????????
              <br /> - ?????????
              <br /> - ??????
              <br /> - ??????
              <br />
              <br /> ??? ????????? ?????? ????????? ?????? 0.5????????? ?????? 5.0?????????
              ???????????????.
              <br /> ??????????????? ????????? ?????? ????????? ?????? ???????????? ???????????? ??????
              ????????? ???????????????.
              <br />
              <Typography
                variant="h6"
                fontFamily="Nanum Gothic"
                fontWeight={600}
                mt={5}
                mx="auto"
                width="80%"
              >
                ?????? ????????? 100??? ?????? ?????? ?????????
              </Typography>
              <br /> 2??? ?????? - 0.2
              <br /> 5??? ?????? - 0.4
              <br /> 7??? ?????? - 0.6
              <br /> 10??? ?????? - 0.9
              <br /> 10??? ?????? - 1.0
              <br />
              <br /> ???????????? ?????? ????????? ??????????????? ?????? ??????????????? ????????????
              ?????????.
              <br /> ?????? ????????? ????????? ?????????????????? Treasury??? ?????? ????????????
              ????????? ????????? ???????????????.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
