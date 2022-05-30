# BPM : Better Participation in Music
![https://media.discordapp.net/attachments/965881435196129302/979638592139825172/fullbener.png?width=785&height=294](https://media.discordapp.net/attachments/965881435196129302/979638592139825172/fullbener.png?width=785&height=294)  
## 팀 소개

- 팀 명: BPM
- 프로젝트 명: Better Participation in Music
- 팀원: 김민성(팀장), 윤지연, 윤다미, 이수진
- Github 링크: https://github.com/codestates/beb-03-project3-BPM
- Discord 링크: [Team communication discord](https://discord.gg/xE8vx5jk) / [BPM Community discord](https://discord.gg/TH8UYGja)
- 배포 링크: [better participation in music](https://www.betterparticipationmusic.cf/)

## 프로젝트 소개
### 1. 📔 Story of Better Participation in Music(BPM)

Better Participation in Music(BPM)은 기존의 판매량 / 스트리밍, 다운로드 수 위주의 일괄적인 집계 방식으로 산정된 음원 순위에 대한 신뢰도 하락 및 불만에서 시작됐습니다. 

단순 재생 수와 다운로드 수 줄 세우기가 음악을 실제로 듣는 리스너들의 의견을 충분히 반영하지 못한다고 생각했고, 그에 대한 실망감과 끝없이 재기 되는 음원 순위에 대한 수 많은 의혹들을 통해 단순 순위 매기기 방식에 대한 불신 뿐만 아니라, 한국 음원 시장 전체에 대한 불신으로 확산될 수 있다고 생각했습니다. 

그래서 저희 BPM은 이런 일괄적인 방식의 집계가 아닌, 참여자들의 의견과 평가가 반영되는 방식의 음원 평가/검증 시스템을 고려하게 되었습니다. 이 활동에 대한 보상으로 생태계를 확장할 수 있는 토크노믹스를 고안하여 열정적으로 참여하는 구성원들 간의 자유로운 커뮤니티 플랫폼을 제공하고, 건전한 음원 시장과 리스너 및 아티스트들의 자유로운 소통 창구 역할을 하는 형태의 생태계를 목표로 합니다.
#### 1-1. 🤔 So why BPM?

국내에도 개인적으로 음악 평가를 하고 그것을 공유하는 평론가들이나 블로그 글은 많이 존재하지만, 정작 이런 양질의 평론이나 개인적인 감상 등을 공유하고 나눌 수 있는 형태의 커뮤니티나 플랫폼은 존재하지 않았습니다. 최대의 음악 커뮤니티라고 불리는 큐오넷 조차도 단순 게시판 형태의 글을 공유할 뿐, 이것에 대해 중점적으로 공유하는 시스템은 찾아볼 수 없었습니다.

특정 장르(힙합, 락 등)를 빼면, 음악에 대한 의견을 공유하고 자유로운 대화를 할 수 있는 커뮤니티는 커녕 작은 공간 조차도 존재하지 않으며, 그나마 특정 장르에서 조차도 페이스 북이나 오픈 카카오톡 등을 이용해 폐쇄적으로 대화를 주고 받을 수 있는 소규모 커뮤니티가 전부였습니다.

BPM은 음원 평가와 검증 뿐만 아니라 한국 음악 시장 전체에 팽배해 있는 폐쇄적이고, 높은 진입장벽을 요구하는 이런 시스템과 커뮤니티에 대해 보다 효율적이고, 자유로운 공간을 제공합니다. 그리고 구성원들의 “왜 BPM 커뮤니티에 참여해야 하는가?”에 대한 답변으로 BPM의 Tokenomics를 제안합니다.

#### 1-2. 🧐 **How evaluate?**

BPM은 기존의 음원 차트 순위와 BPM 커뮤니티 평가가 반영된 차트 모두를 제공합니다. 
두 가지 차트를 모두 제공함으로써, 커뮤니티 참여자가 만들어가는 음원 차트와 기존의 음원 차트에 어떤 차이가 있는지, 그리고 어떤 근거로 구성원들이 이런 평가를 했는 지에 대해 직접 확인해볼 수 있는 사용자 경험을 제공합니다. 

BPM자체 차트는 다음과 같은 방식으로 평가 집계 됩니다.

- 중독성 / 예술성 / 대중성 / 개성 / 가사 로 구분된 5가지 항목에 대한 별점(0.5~5.0)을 기반으로 한 리뷰 점수의 평균을 내어 1차 통계 점수를 저장합니다.
- 리뷰 점수의 평균을 기반으로 한 1차 통계 점수에 리뷰의 개수 마다 부과되는 가중치를 적용하여, 리뷰가 적은데 높은 평가를 받은 음원과 리뷰도 많으면서, 높은 평가를 받은 음원을 구분하고 좀 더 정확한 결과를 도출합니다.
    - 평균 이용자 100명 기준 적용 가중치 : 2개 미만 - 0.2, 5개 미만 - 0.4, 7개 미만 - 0.6, 10개 미만 - 0.9
- 가중치와 집계 방식은 거버 넌스를 통해 지속적으로 업데이트 되며 좋은 안건을 제공한 참여자들에게는 Treasury를 통해 인센티브 토큰을 제공할 예정입니다.

---

### 2. 🪙 Tokenomics

- **BPM token**
- **TEMPO token**

#### 2-1. 🎛️ BPM token

##### ❓What is BPM?

BPM 토큰은 BPM 커뮤니티의 활동에 대한 보상으로 지급되는 토큰 입니다. BPM 토큰은 평가 글이나 칼럼 작성이 아닌, 커뮤니티에서 게시글을 작성하거나, 댓글을 작성함으로써 커뮤니티 활성화에 기여한 보상으로 지급되는 토큰입니다. BPM 토큰은 평가나 칼럼에 대한 추천 / 비추천 시에 소모되고 소각 되며, BPM 커뮤니티의 활성화와 내부 컨텐츠 이용에 있어 핵심적인 역할을 하게 될 토큰 입니다. 


##### 📄토큰 정보

- 토큰명: Better Participation in Music
- 티커명: BPM
- 컨트랙트 주소: ETH [0xfAe5f06cd7851555Eb91f92Fe5B2a8b2cC0d5722]
- 체인: 이더리움(ETH)
- 총 발행량: 100,000,000개
- 커뮤니티 보상 물량: 30,000,000개 (베스트 게시글 상금 풀: 3,000,000개)
- 락업 물량: 40,000,000개 (스테이킹 보상물량)
- 팀 물량: 6,000,000개
- Treasury: 24,000,000개
- 초기 유통 물량: 30,000,000개


##### 🔄BPM 토큰 분배

- BPM 토큰의 초기 유통량의 50%는 커뮤니티 활동(평가, 칼럼 또한 포함) 인원들에게 분배합니다. 활동 기간 / 활동 참여도 에 따라 배분 되며, 부정 행위 정황이 포착되어 물수된 토큰은 Treasury로 귀속 되며, 부정행위 계정은 정지됩니다.
- BPM의 커뮤니티와 생태계를 온전하게 즐기기 위해서는 BPM 토큰과 TEMPO 토큰풀에 원활한 유동성이 공급되어야 합니다. 따라서, 총 BPM 토큰의 40% 물량에 해당하는 락업 물량은 BPM-TEMPO 토큰풀의 유동성 공급자와 스테이킹한 구성원들에게 돌아갑니다.
- Treasury 물량은 BPM 토큰의 유동성에 문제가 생기거나, 갑작스런 공격에 의해 정상적인 토큰 이코노미가 구동 되지 않았을 때를 대비하여 거버넌스를 통해, 긴급 조치를 하기 위한 물량 입니다. 기초적인 거버넌스를 통해, 토큰의 비정상적인 흐름이나 공격에 대한 기초적인 방어 프로토콜을 제공합니다.


##### 🏛️거버넌스 운영

- BPM 토큰은 자율적인 커뮤니티 운영에 대한 거버넌스 참여권입니다. BPM 토큰을 원하는 풀에 스테이킹 함으로써 누구나 원하는 DAO 커뮤니티 거버넌스에 참여할 수 있습니다.
- 스테이킹 풀에 원하는 DAO 풀을 생성하거나 참여하고, DAO 커뮤니티 내에서 의결권을 가지고 권리를 행사할 수 있으며, DAO 스테이킹 풀의 보상량은 풀의 크기가 증가할수록 할당량이 커집니다.


#### 2-2. 🎼 TEMPO token

##### ❓What is TEMPO?

TEMPO 토큰이란 BPM 커뮤니티 내에서 상위 컨텐츠 이용 및 상위 거버넌스에 참여하기 위한 토큰으로, 단순 커뮤니티 활동이 아닌 음원 평가에 참여하거나 음원 평가 칼럼을 작성했을 때, 생태계 발전에 기여한 보상으로 제공되는 토큰 입니다. TEMPO 토큰은 게시판 생성 및 스테이킹 DAO풀 오픈 시에 사용되며, STAGE가 진행될수록 사용처가 확대될 예정입니다.


##### 📄토큰 정보

- 토큰명: TEMPO
- 티커명: TEMPO
- 컨트랙트 주소: ETH [0x0d5Ba334df6Df1b8c7D1C650e7D43Cef5077c50b]
- 체인: 이더리움(ETH)
- 총 발행량: 6,000,000,000개
- 커뮤니티 보상 물량: 3,000,000,000개 (베스트 리뷰 상금 풀: 100,000,000개 /  
                                 베스트 칼럼 상금 풀: 200,000,000개)
- 락업 물량: 2,000,000,000개 (스테이킹 보상물량)
- 팀 물량: 600,000,000개
- Treasury: 400,000,000개
- 초기 유통 물량: 3,000,000,000개


##### 🔄TEMPO 토큰 분배

- TEMPO 토큰의 초기 유통 물량 100%가 상위 커뮤니티 활동(음원 평가 참여, 음원 평가 칼럼 작성) 인원들에게 분배 됩니다. 커뮤니티 구성 초기에 TEMPO 토큰을 얻을 수 있는 방법은 직접 상위 커뮤니티 활동에 참여하거나, 구매하는 방법 뿐입니다.
- BPM의 커뮤니티와 생태계를 온전하게 즐기기 위해서는 TEMPO 토큰과 BPM 토큰풀에 원활한 유동성이 공급되어야 합니다. 따라서, TEMPO 토큰의 약 33% 물량에 해당하는 락업 물량이 BPM-TEMPO 토큰풀의 유동성 공급자와 스테이킹한 구성원들에게 돌아갑니다.
- Treasury 물량은 TEMPO 토큰의 유동성에 문제가 생기거나, 갑작스런 공격에 의해 정상적인 토큰 이코노미가 구동 되지 않았을 때를 대비하여 거버넌스를 통해, 긴급 조치를 하기 위한 물량 입니다. 거버넌스를 통해, 토큰의 비정상적인 흐름이나 공격에 대한 기초적인 방어 프로토콜을 제공합니다.


##### 🏛️거버넌스 운영

- TEMPO 토큰은 음원 평가와 칼럼, 검증에 대한 기준이나 운영에 대한 거버넌스 참여 권한을 부여하는 토큰입니다. TEMPO 토큰을 원하는 풀에 스테이킹 함으로써 거버넌스에 참여하는 구성원은 누구나 원하는 DAO 거버넌스에 참여할 수 있습니다.
- 스테이킹 풀에 원하는 DAO 풀을 생성하거나 참여하고, DAO 커뮤니티 내에서 의결권을 가지고 권리를 행사할 수 있으며, DAO 스테이킹 풀의 보상량은 풀의 크기가 증가할수록 할당량이 커집니다.

---

### 3. 🛣️ Road map

Better Participation in Music은 단순 커뮤니티를 넘어, 다양한 아티스트와 평론가, 음악 관련 종사자들의 소통 및 폐쇄적으로 이루어지고 있는 다양한 음악 인프라의 보급 플랫폼 및 P2P 마켓 플레이스로 계속해서 확장하며, 성장할 것입니다. 아래 로드 맵은 향후 프로젝트 진행으로 확장될 컨텐츠에 대한 이정표를 나타냅니다.

- STAGE 0 - 커뮤니티 빌딩
- STAGE 1 - 음악 사용권 거래 플랫폼
- STAGE 2 - 음악 스트리밍 서비스 제공
- STAGE 3 - Music Launch Pad


#### 🫂 STAGE 0 - 커뮤니티 빌딩

커뮤니티 빌딩은 BPM 프로젝트의 첫 번째 핵심 과업 입니다. 

현재 운영되고 있는 다수의 폐쇄적이고, 높은 진입 장벽이 존재하는 음악 커뮤니티와는 다르게 BPM은 BPM 내에서 활동을 한 보상으로 받은 토큰을 verify 하여 구성원임을 증명하고, 웹사이트의 게시판 뿐만 아니라 다양한 플랫폼(디스 코드, 텔레그램, 트위터 등)을 통해 커뮤니티 관리자와 커뮤니티 참여자들 간의 긴밀한 네트워크를 형성합니다.

뿐만 아니라, 활동을 통해 얻은 TEMPO 토큰을 통해 원하는 성격의 게시판을 만들고 보상으로 받은 토큰을 원하는 풀에 예치 함으로써, 같은 풀에 소속된 구성원들과 거버 넌스를 통해 DAO 형태로 발전해나갈 수 있습니다. 

BPM은 이런 활동에 대한 지원을 계속할 것이며, 최대한 많은 구성원들이 원하는 음악적, 커뮤니티적 활동에 대한 지원에 최선을 다할 것입니다.  


#### 🏦 STAGE 1 - 음원 사용권 거래 플랫폼

열악한 커뮤니티 뿐만 아니라, 계속해서 발생하는 창작자 - 사용자 간의 음원 사용에 대한 분쟁들은 단순히, 창작자, 사용자 간의 문제만이 아닌 심각한 사회문제로 까지 대두 되고 있습니다. 이런 문제들의 핵심은 과연 어떻게 창작자가 사용권을 음원 사용자에게 저작권이 아닌 사용권을 제공했느냐 “증명”하는 것이었습니다. 

BPM은 이런 증명에 대한 솔루션으로, NFT로 음원 사용권 거래를 증명하는 솔루션을 제시합니다. NFT 메타 데이터에 음원 파일을 업로드 하여  사용자는 다운로드 받을 수 있고, NFT로 소유권이 증명된 거래자만이 ‘사용권’이 허가된 음원을 사용할 수 있는 형태의 증명 솔루션을 제공합니다. 

이 거래 플랫폼에서, 결제 수단에 TEMPO 토큰과 BPM 토큰을 지원합니다. 물론 다른 암호 화폐로 결제가 가능하지만, BPM토큰과 TEMPO토큰을 사용한 거래에는 수수료 할인 인센티브를 제공할 예정입니다.


#### 🎧 STAGE 2 - 음악 스트리밍 컨텐츠 제공

BPM의 비전은 단순 음악 평가 및 검증 뿐만 아니라, 커뮤니티에서 활동하고 소통하는 다양한 아티스트들과 이런 음악적 네트워크와 접촉하고 싶은 기업들과의 협업을 통해, 그리고 기존 음악 스트리밍 서비스와의 제휴를 통해 다양한 음악에 대한 스트리밍을 제공할 계획입니다.

 커뮤니티 참여로 얻은 BPM 토큰과 TEMPO토큰을 소모하여 스트리밍 서비스에 대한 할인 및 구매 인센티브를 제공할 예정입니다. 

BPM은 이를 통해, 통합 음악 커뮤니티 플랫폼으로의 방향성을 제시하고 비전을 확장해 나갑니다. 


#### 🎚️ STAGE 3 - Music Launch Pad

BPM은 합리적인 통합 음악 커뮤니티 플랫폼을 지향하기에, 아티스트와 창작자들에게 보다 투명한 기회를 제공하기 위해 음악 창작물에 대한 Launch Pad를 구성합니다. 

BPM에서 활동하고 있는 창작자들과 아티스트들을 후원하고 싶거나, 투자하고 싶은 BPM 커뮤니티 참여자들은 Launch Pad를 구성할 수 있으며, 아티스트와 창작자는 이에 대해 원하는 펀딩 방식을 선택하여 진행할 수 있습니다.

커뮤니티 참여자 간의 자유로운 소통과 펀딩을 위해 BPM은 이런 Music Launch Pad 플랫폼을 구상하고, 더 나아가 BPM 커뮤니티 아티스트와 창작자들에게 관심이 있는 기업과의 협업 또한 진행할 수 있습니다.

이를 통해, BPM은 단순한 구성원 끼리의 단방향 커뮤니티가 아닌, 모든 구성원들이 참여하고 그 안에서 새로운 가치를 창출할 수 있는 새로운 구조의 커뮤니티 플랫폼으로 거듭날 것 입니다.

---

### DB Schema
<img src="https://user-images.githubusercontent.com/93569041/170910421-39e9ad3b-d59f-49ee-8dea-2fa901a711ed.png" width="700" height="700"/>

### 기술 스택
<h3 align="center"> Collaboration Tools </h3>
<p align="center">
  <img src="https://img.shields.io/badge/Notion-000000.svg?style=flat-square&logo=Notion&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/Discord-5865F2.svg?style=flat-square&logo=Discord&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/github-181717?style=flat-square&logo=Github&logoColor=white"/></a>&nbsp 
  <br>

</p>
<h3 align="center"> Front End </h3>
<p align="center">
  <img src="https://img.shields.io/badge/Figma-F24E1E.svg?style=flat-square&logo=Figma&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white"/></a>&nbsp
  <img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/Redux-764abc.svg?style=flat-square&logo=Redux&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/MUI-007FFF.svg?style=flat-square&logo=MUI&logoColor=white"/></a>&nbsp 
</p>
<h3 align="center"> Back End </h3>
<p align="center">
  <img src="https://img.shields.io/badge/Postman-ff6c37.svg?style=flat-square&logo=Postman&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/MongoDB-47a248.svg?style=flat-square&logo=MongoDB&logoColor=white"/></a>&nbsp  
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/Express-000000.svg?style=flat-square&logo=Express&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/Ethers-3c3c3d.svg?style=flat-square&logo=Ethereum&logoColor=white"/></a>&nbsp 
</p>
<h3 align="center"> Smart Contract </h3>
<p align="center">
  <img src="https://img.shields.io/badge/Solidity-363636.svg?style=flat-square&logo=Solidity&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/Ethereum-3c3c3d.svg?style=flat-square&logo=Ethereum&logoColor=white"/></a>&nbsp  
  <img src="https://img.shields.io/badge/Rinkeby-ffcc33.svg?style=flat-square&logo=Rinkeby.js&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/Remix-000000.svg?style=flat-square&logo=Remix&logoColor=white"/></a>&nbsp  
</p>
<h3 align="center"> Deployment </h3>
<p align="center">
  <img src="https://img.shields.io/badge/Vercel-000000.svg?style=flat-square&logo=Vercel&logoColor=white"/></a>&nbsp 
  <img src="https://img.shields.io/badge/Amazon AWS-232F3E.svg?style=flat-square&logo=Amazon AWS&logoColor=white"/></a>&nbsp  
</p>
