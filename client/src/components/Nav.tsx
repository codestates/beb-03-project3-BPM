import * as React from "react";
import {
  Grid,
  InputBase,
  IconButton,
  AppBar,
  Toolbar,
  Tooltip,
  useTheme,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../img/1113.png";

// icons
import SearchIcon from "@mui/icons-material/Search";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export default function Nav() {
  const theme = useTheme();
  const userInfo = useSelector((state: any) => state.userReducer).data;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "#333", zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item color={"#fff"} xs={2}>
              <Link to="/">
                <img
                  src={Logo}
                  alt="logo"
                  style={{ width: 90, marginTop: 6 }}
                />
              </Link>
            </Grid>
            <Grid item xs={7} textAlign="center">
              <InputBase
                placeholder="검색어를 입력하세요"
                sx={{
                  color: "#eee",
                  padding: "0.5em 2em",
                  bgcolor: "#222",
                  mr: "10px",
                  width: "20vw",
                }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon sx={{ color: "#fff", fontSize: "1.2em" }} />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              {/* About 버튼 */}
              <Tooltip title="소개">
                <IconButton
                  id="about-button"
                  aria-controls={open ? "about-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{ color: "#fff" }}
                >
                  <HelpCenterIcon />
                </IconButton>
              </Tooltip>
              {/* About 팝업 */}
              <Menu
                id="about-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "about-button",
                }}
              >
                <Link to="/aboutus" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose} sx={{ color: "#333" }}>
                    About Us
                  </MenuItem>
                </Link>
                <Link to="/roadmap" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose} sx={{ color: "#333" }}>
                    Road Map
                  </MenuItem>
                </Link>
                <Link to="/aboutchart" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose} sx={{ color: "#333" }}>
                    About Chart
                  </MenuItem>
                </Link>
              </Menu>

              {/* chart 버튼 */}
              <Link to="/chart">
                <Tooltip title="차트">
                  <IconButton sx={{ color: "#fff" }}>
                    <InsertChartIcon />
                  </IconButton>
                </Tooltip>
              </Link>

              {/* community 버튼 */}
              <Link to="/community/62903268742075468af6996c">
                <Tooltip title="커뮤니티">
                  <IconButton>
                    <GroupsIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
              </Link>

              {/* wallet 버튼 */}
              <Tooltip title="로그인">
                <IconButton
                  id="wallet-button"
                  aria-controls={open2 ? "wallet-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open2 ? "true" : undefined}
                  onClick={handleClick2}
                  sx={{ color: "#fff" }}
                >
                  <AccountBalanceWalletIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Tooltip>
              {/* Wallet 팝업 */}
              <Menu
                id="wallet-menu"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                MenuListProps={{
                  "aria-labelledby": "wallet-button",
                }}
              >
                <Link to="/signin" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleClose2} sx={{ color: "#333" }}>
                    Sign In
                  </MenuItem>
                </Link>
                <a
                  href="https://app.uniswap.org/#/swap?inputCurrency=0x66595E934c056EF77c204A06Ea3FB8Bf6a92b5f6&use=v2&chain=mainnet"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <MenuItem onClick={handleClose2} sx={{ color: "#333" }}>
                    Token Swap
                  </MenuItem>
                </a>
              </Menu>

              {/* mypage 버튼 */}
              {userInfo !== null ? (
                <Link to="/mypage">
                  <Tooltip title="마이페이지">
                    <IconButton>
                      <AccountBoxIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  </Tooltip>
                </Link>
              ) : (
                <Tooltip title="마이페이지">
                  <IconButton
                    onClick={() => {
                      alert("로그인 해주세요");
                    }}
                  >
                    <AccountBoxIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
