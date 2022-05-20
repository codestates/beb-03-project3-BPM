import {
  Box,
  Button,
  CssBaseline,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ethers } from "ethers";
import { ReactComponent as Meatamask } from "../asset/metamask-logo1.svg";
import { ReactComponent as Klaytn } from "../asset/klaytn-logo1.svg";

declare let window: any;

interface propstype {
  setAccount: any;
  setIsLogin: any;
  isLogin: boolean;
  account: string;
}

export default function SignIn({
  setAccount,
  setIsLogin,
  isLogin,
  account,
}: propstype) {
  const navigate = useNavigate();
  let provider: any;

  const onLogin = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []).then(() => {
      const signer = provider.getSigner();
      signer.getAddress().then((res: string) => {
        setAccount(res);
        onSign(res);
      });
    });
  };

  const disconnet = () => {
    provider = null;
    setIsLogin(false);
    setAccount("");
    axios
      .post("http://localhost:4000/user/logout", { withCredentials: true })
      .then(() => {
        console.log("로그아웃");
      });
  };

  const onSign = (address: string) => {
    axios
      .post(
        "http://localhost:4000/user/signin",
        {
          address: address,
        },
        {
          withCredentials: true,
        }
      )
      .then(function (res) {
        if (res.data.message === "계정 생성") {
          navigate("/signup");
        } else if (res.data.message === "로그인 성공") {
          setIsLogin(true);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <Stack>
      <CssBaseline />
      <Box mt={8}>
        <Typography
          component="h1"
          fontSize="5rem"
          fontFamily="Sacramento"
          sx={{
            textAlign: "center",
          }}
          mb={10}
        >
          Better Paricipation in Music
        </Typography>
      </Box>

      <Box textAlign="center" display="grid" sx={{ justifyContent: "center" }}>
        <Grid container m="0 auto">
          <Box border="1px solid #999" pt={5} pb={7}>
            {isLogin ? (
              <>
                <Typography variant="h5">Wallet Information</Typography>
                <Grid item p={5} textAlign="left">
                  <Typography variant="h6">ChainId: ethereum</Typography>
                  <Typography variant="h6">Account: {account}</Typography>
                </Grid>
                <Button onClick={disconnet}>
                  <Typography variant="h6">Disconnect</Typography>
                </Button>
              </>
            ) : (
              <Grid
                item
                display="grid"
                justifyContent="center"
                textAlign="left"
                width={500}
              >
                <Typography
                  // fontFamily='Teko'
                  component="h2"
                  textAlign="center"
                  fontSize="1rem"
                  mb={6}
                >
                  CONNECT YOUR WALLET
                </Typography>
                <Grid>
                  <Button
                    // variant='outlined'
                    onClick={onLogin}
                    sx={{ height: 50, mb: 1 }}
                  >
                    <Meatamask />
                    <Typography variant="h4" color="#333" ml={2}>
                      Metamask
                    </Typography>
                  </Button>
                </Grid>
                <Grid>
                  <Button sx={{ height: 50 }}>
                    <Klaytn />
                    <Typography variant="h4" color="#333" ml={2}>
                      Kaikas
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
      </Box>
    </Stack>
  );
}
