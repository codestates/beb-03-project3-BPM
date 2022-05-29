import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Tab, Typography } from "@mui/material";
import {
  motion,
  useViewportScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import * as React from "react";
import fullLogo from "../img/bpm-full2.png";

export default function RoadMap() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
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
        src="https://images.unsplash.com/photo-1478059299873-f047d8c5fe1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
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
      <Container
        sx={{
          textAlign: "center",
          py: 5,
          bgcolor: "#fff",
          // borderRadius: "70px",
          // mt: 5,
        }}
      >
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
        <Typography
          variant="h3"
          fontFamily="Nanum Gothic"
          fontWeight={600}
          mt={5}
          mb={10}
          mx="auto"
          width="80%"
        >
          Road Map
        </Typography>

        <TabContext value={value}>
          <Box>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs"
              centered
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label="🫂 STAGE 0" value="1" />
              <Tab label="🏦 STAGE 1" value="2" />
              <Tab label="🎧 STAGE 2" value="3" />
              <Tab label="🎚️ STAGE 3" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Typography
              variant="h5"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={7}
              mx="auto"
              width="80%"
            >
              커뮤니티 빌딩
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
              커뮤니티 빌딩은 BPM 프로젝트의 첫 번째 핵심 과업 입니다. <br />
              <br />
              현재 운영되고 있는 다수의 폐쇄적이고, 높은 진입 장벽이 존재하는
              음악 커뮤니티와는 다르게 <br />
              BPM은 BPM 내에서 활동을 한 보상으로 받은 토큰을 verify 하여
              구성원임을 증명하고, 웹사이트의 게시판 뿐만 아니라 다양한
              플랫폼(디스 코드, 텔레그램, 트위터 등)을 통해 커뮤니티 관리자와
              커뮤니티 참여자들 간의 긴밀한 네트워크를 형성합니다.
              <br />
              <br /> 뿐만 아니라, 활동을 통해 얻은 TEMPO 토큰을 통해 원하는
              성격의 게시판을 만들고 보상으로 받은 토큰을 원하는 풀에 예치
              함으로써, 같은 풀에 소속된 구성원들과 거버 넌스를 통해 DAO 형태로
              발전해나갈 수 있습니다.
              <br />
              <br /> BPM은 이런 활동에 대한 지원을 계속할 것이며, 최대한 많은
              구성원들이 원하는 음악적, 커뮤니티적 활동에 대한 지원에 최선을
              다할 것입니다.
            </Typography>
          </TabPanel>
          <TabPanel value="2">
            <Typography
              variant="h5"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={7}
              mx="auto"
              width="80%"
            >
              음원 사용권 거래 플랫폼
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
              열악한 커뮤니티 뿐만 아니라, 계속해서 발생하는 창작자 - 사용자
              간의 음원 사용에 대한 분쟁들은 단순히, 창작자, 사용자 간의
              문제만이 아닌 심각한 사회문제로 까지 대두 되고 있습니다.
              <br />
              <br /> 이런 문제들의 핵심은 과연 어떻게 창작자가 사용권을 음원
              사용자에게 저작권이 아닌 사용권을 제공했느냐 “증명”하는
              것이었습니다.
              <br /> BPM은 이런 증명에 대한 솔루션으로, NFT로 음원 사용권 거래를
              증명하는 솔루션을 제시합니다.
              <br /> NFT 메타 데이터에 음원 파일을 업로드 하여 사용자는 다운로드
              받을 수 있고, NFT로 소유권이 증명된 거래자만이 ‘사용권’이 허가된
              음원을 사용할 수 있는 형태의 증명 솔루션을 제공합니다.
              <br />
              <br /> 이 거래 플랫폼에서, 결제 수단에 TEMPO 토큰과 BPM 토큰을
              지원합니다.
              <br /> 물론 다른 암호 화폐로 결제가 가능하지만, BPM토큰과
              TEMPO토큰을 사용한 거래에는 수수료 할인 인센티브를 제공할
              예정입니다.
            </Typography>
          </TabPanel>
          <TabPanel value="3">
            <Typography
              variant="h5"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={7}
              mx="auto"
              width="80%"
            >
              음악 스트리밍 컨텐츠 제공
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
              BPM의 비전은 단순 음악 평가 및 검증 뿐만 아니라, 커뮤니티에서
              활동하고 소통하는 다양한 아티스트들과 이런 음악적 네트워크와
              접촉하고 싶은 기업들과의 협업을 통해, 그리고 기존 음악 스트리밍
              서비스와의 제휴를 통해 다양한 음악에 대한 스트리밍을 제공할
              계획입니다.
              <br />
              <br /> 커뮤니티 참여로 얻은 BPM 토큰과 TEMPO토큰을 소모하여
              스트리밍 서비스에 대한 할인 및 구매 인센티브를 제공할 예정입니다.
              <br />
              BPM은 이를 통해, 통합 음악 커뮤니티 플랫폼으로의 방향성을 제시하고
              비전을 확장해 나갑니다.
            </Typography>
          </TabPanel>
          <TabPanel value="4">
            <Typography
              variant="h5"
              fontFamily="Nanum Gothic"
              fontWeight={600}
              mt={3}
              mb={7}
              mx="auto"
              width="80%"
            >
              Music Launch Pad
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
              BPM은 합리적인 통합 음악 커뮤니티 플랫폼을 지향하기에, 아티스트와
              창작자들에게 보다 투명한 기회를 제공하기 위해 음악 창작물에 대한
              Launch Pad를 구성합니다.
              <br />
              <br /> BPM에서 활동하고 있는 창작자들과 아티스트들을 후원하고
              싶거나, 투자하고 싶은 BPM 커뮤니티 참여자들은 Launch Pad를 구성할
              수 있으며, 아티스트와 창작자는 이에 대해 원하는 펀딩 방식을
              선택하여 진행할 수 있습니다. <br />
              <br />
              커뮤니티 참여자 간의 자유로운 소통과 펀딩을 위해 BPM은 이런 Music
              Launch Pad 플랫폼을 구상하고, 더 나아가 BPM 커뮤니티 아티스트와
              창작자들에게 관심이 있는 기업과의 협업 또한 진행할 수 있습니다.
              <br />
              <br />
              이를 통해, BPM은 단순한 구성원 끼리의 단방향 커뮤니티가 아닌, 모든
              구성원들이 참여하고 그 안에서 새로운 가치를 창출할 수 있는 새로운
              구조의 커뮤니티 플랫폼으로 거듭날 것 입니다.
            </Typography>
          </TabPanel>
        </TabContext>
      </Container>
    </>
  );
}
