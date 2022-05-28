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
            BPM은 기존의 음원 차트 순위와 BPM 커뮤니티 평가가 반영된 차트 모두를
            제공합니다.
            <br /> 두 가지 차트를 모두 제공함으로써, 커뮤니티 참여자가
            만들어가는 음원 차트와 기존의 음원 차트를 직접 비교해 볼 수
            있습니다.
            <br /> 그리고 어떤 근거로 구성원들이 이런 평가를 했는 지에 대해 직접
            확인해볼 수 있는 사용자 경험을 제공합니다.
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
              <br /> BPM이 제공하는 차트는 다음과 같은 방식으로 평가가 집계
              됩니다.
              <br /> 참여자는 각 음악을 다음 다섯 가지 항목으로 평가합니다.
              <Typography
                variant="h6"
                fontFamily="Nanum Gothic"
                fontWeight={600}
                mt={5}
                mx="auto"
                width="80%"
              >
                평가 항목
              </Typography>
              <br /> - 중독성
              <br /> - 예술성
              <br /> - 대중성
              <br /> - 개성
              <br /> - 가사
              <br />
              <br /> 각 항목에 대한 평가는 최저 0.5점에서 최고 5.0점까지
              가능합니다.
              <br /> 참여자들의 평가는 리뷰 개수에 따른 가중치가 적용되어 차트
              집계에 반영됩니다.
              <br />
              <Typography
                variant="h6"
                fontFamily="Nanum Gothic"
                fontWeight={600}
                mt={5}
                mx="auto"
                width="80%"
              >
                평균 이용자 100명 기준 적용 가중치
              </Typography>
              <br /> 2개 미만 - 0.2
              <br /> 5개 미만 - 0.4
              <br /> 7개 미만 - 0.6
              <br /> 10개 미만 - 0.9
              <br /> 10개 이상 - 1.0
              <br />
              <br /> 가중치와 집계 방식은 거버넌스를 통해 지속적으로 업데이트
              됩니다.
              <br /> 좋은 안건을 제공한 참여자에게는 Treasury를 통해 인센티브
              토큰을 제공할 예정입니다.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
