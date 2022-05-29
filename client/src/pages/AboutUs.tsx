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

export default function AboutUs() {
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
        src="https://images.unsplash.com/photo-1554189097-ffe88e998a2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
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
            variant="h4"
            fontFamily="Nanum Gothic"
            fontWeight={600}
            mt={8}
            mb={3}
            mx="auto"
            width="80%"
          >
            Story of Better Participation in Music(BPM)
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
            Better Participation in Music(BPM)은 기존의 판매량 / 스트리밍,
            다운로드 수 위주의 일괄적인 집계 방식으로 산정된 음원 순위에 대한
            신뢰도 하락 및 불만에서 시작됐습니다. 단순 재생 수와 다운로드 수 줄
            세우기가 음악을 실제로 듣는 리스너들의 의견을 충분히 반영하지
            못한다고 생각했고, 그에 대한 실망감과 끝없이 재기 되는 음원 순위에
            대한 수 많은 의혹들을 통해 단순 순위 매기기 방식에 대한 불신 뿐만
            아니라, 한국 음원 시장 전체에 대한 불신으로 확산될 수 있다고
            생각했습니다. 그래서 저희 BPM은 이런 일괄적인 방식의 집계가 아닌,
            참여자들의 의견과 평가가 반영되는 방식의 음원 평가/검증 시스템을
            고려하게 되었습니다. 이 활동에 대한 보상으로 생태계를 확장할 수 있는
            토크노믹스를 고안하여 열정적으로 참여하는 구성원들 간의 자유로운
            커뮤니티 플랫폼을 제공하고, 건전한 음원 시장과 리스너 및
            아티스트들의 자유로운 소통 창구 역할을 하는 형태의 생태계를 목표로
            합니다.
          </Typography>
          <Divider sx={{ mt: 15, mb: 5, borderColor: "#eee" }} />
          <Box py={10}>
            <Typography
              variant="h4"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={3}
              mx="auto"
              width="80%"
            >
              So why BPM?
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
              국내에도 개인적으로 음악 평가를 하고 그것을 공유하는 평론가들이나
              블로그 글은 많이 존재하지만, 정작 이런 양질의 평론이나 개인적인
              감상 등을 공유하고 나눌 수 있는 형태의 커뮤니티나 플랫폼은
              존재하지 않았습니다. 최대의 음악 커뮤니티라고 불리는 큐오넷 조차도
              단순 게시판 형태의 글을 공유할 뿐, 이것에 대해 중점적으로 공유하는
              시스템은 찾아볼 수 없었습니다. 특정 장르(힙합, 락 등)를 빼면,
              음악에 대한 의견을 공유하고 자유로운 대화를 할 수 있는 커뮤니티는
              커녕 작은 공간 조차도 존재하지 않으며, 그나마 특정 장르에서 조차도
              페이스 북이나 오픈 카카오톡 등을 이용해 폐쇄적으로 대화를 주고
              받을 수 있는 소규모 커뮤니티가 전부였습니다. BPM은 음원 평가와
              검증 뿐만 아니라 한국 음악 시장 전체에 팽배해 있는 폐쇄적이고,
              높은 진입장벽을 요구하는 이런 시스템과 커뮤니티에 대해 보다
              효율적이고, 자유로운 공간을 제공합니다. 그리고 구성원들의 “왜 BPM
              커뮤니티에 참여해야 하는가?”에 대한 답변으로 BPM의 Tokenomics를
              제안합니다.
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: 5, mb: 15, borderColor: "lightcoral" }} />
        <Box p={5} textAlign="center">
          <Typography variant="h3" fontFamily="Nanum Gothic" fontWeight={600}>
            Tokenomics
          </Typography>
          <Box py={10}>
            <Typography
              variant="h5"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={3}
              mx="auto"
              width="80%"
            >
              What is BPM token?
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
              BPM 토큰은 BPM 커뮤니티의 활동에 대한 보상으로 지급되는 토큰
              입니다. BPM 토큰은 평가 글이나 칼럼 작성이 아닌, 커뮤니티에서
              게시글을 작성하거나, 댓글을 작성함으로써 커뮤니티 활성화에 기여한
              보상으로 지급되는 토큰입니다. BPM 토큰은 평가나 칼럼에 대한 추천 /
              비추천 시에 소모되고 소각 되며, BPM 커뮤니티의 활성화와 내부
              컨텐츠 이용에 있어 핵심적인 역할을 하게 될 토큰 입니다.
            </Typography>
            <Typography
              variant="h6"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={3}
              mx="auto"
              width="80%"
            >
              거버넌스 운영
            </Typography>
            <Typography
              fontFamily="Nanum Gothic"
              sx={{
                wordSpacing: 3,
                letterSpacing: 2,
                lineHeight: 2,
                width: "80%",
                m: "0 auto",
                textAlign: "left",
              }}
            >
              •BPM 토큰은 자율적인 커뮤니티 운영에 대한 거버넌스 참여권입니다.
              BPM 토큰을 원하는 풀에 스테이킹 함으로써 누구나 원하는 DAO
              커뮤니티 거버넌스에 참여할 수 있습니다. <br />
              •스테이킹 풀에 원하는 DAO 풀을 생성하거나 참여하고, DAO 커뮤니티
              내에서 의결권을 가지고 권리를 행사할 수 있으며, DAO 스테이킹 풀의
              보상량은 풀의 크기가 증가할수록 할당량이 커집니다.
            </Typography>
          </Box>
          <Box py={10}>
            <Typography
              variant="h5"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={3}
              mx="auto"
              width="80%"
            >
              What is TEMPO token?
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
              TEMPO 토큰이란 BPM 커뮤니티 내에서 상위 컨텐츠 이용 및 상위
              거버넌스에 참여하기 위한 토큰으로, 단순 커뮤니티 활동이 아닌 음원
              평가에 참여하거나 음원 평가 칼럼을 작성했을 때, 생태계 발전에
              기여한 보상으로 제공되는 토큰 입니다. TEMPO 토큰은 게시판 생성 및
              스테이킹 DAO풀 오픈 시에 사용되며, STAGE가 진행될수록 사용처가
              확대될 예정입니다.
            </Typography>
            <Typography
              variant="h6"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={3}
              mx="auto"
              width="80%"
            >
              거버넌스 운영
            </Typography>
            <Typography
              fontFamily="Nanum Gothic"
              sx={{
                wordSpacing: 3,
                letterSpacing: 2,
                lineHeight: 2,
                width: "80%",
                m: "0 auto",
                textAlign: "left",
              }}
            >
              •TEMPO 토큰은 음원 평가와 칼럼, 검증에 대한 기준이나 운영에 대한
              거버넌스 참여 권한을 부여하는 토큰입니다. TEMPO 토큰을 원하는 풀에
              스테이킹 함으로써 거버넌스에 참여하는 구성원은 누구나 원하는 DAO
              거버넌스에 참여할 수 있습니다. <br />
              •스테이킹 풀에 원하는 DAO 풀을 생성하거나 참여하고, DAO 커뮤니티
              내에서 의결권을 가지고 권리를 행사할 수 있으며, DAO 스테이킹 풀의
              보상량은 풀의 크기가 증가할수록 할당량이 커집니다.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
