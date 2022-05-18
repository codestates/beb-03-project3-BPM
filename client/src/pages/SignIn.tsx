<<<<<<< HEAD
import { Box, Button, CssBaseline, Typography, Grid } from '@mui/material';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';

import { ReactComponent as Meatamask } from '../asset/metamask-logo1.svg';
import { ReactComponent as Klaytn } from '../asset/klaytn-logo1.svg';
=======
import { Box, Button, CssBaseline, Typography, Grid } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ethers } from "ethers";

import { ReactComponent as Meatamask } from "../asset/metamask-logo1.svg";
import { ReactComponent as Klaytn } from "../asset/klaytn-logo1.svg";
declare let window: any;
>>>>>>> 341155d024d3c9220e316d214ff7a9e237cffb4f

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
<<<<<<< HEAD
  const [balance, setBalance] = useState('');
=======
  let provider: any;
>>>>>>> 341155d024d3c9220e316d214ff7a9e237cffb4f

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

  const disconnet = async () => {
    provider = null;
    setIsLogin(false);
    setAccount("");
  };

  const onSign = (address: string) => {
    axios
<<<<<<< HEAD
      .post('http://localhost:4000/user/signin', {
        address: account,
      })
      .then(function (res) {
        console.log('res==>>', res);
        if (res.data.message === '계정 생성') {
          // alert('가입된 계정이 없습니다. 회원가입 페이지로 이동합니다.');
          navigate('/signup');
        } else if (res.data.message === '로그인 성공') {
          console.log('account>>', account);
          console.log('data===>>', res.data);
=======
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
          console.log("account>>", account);
          console.log("data===>>", res.data);
          setIsLogin(true);
>>>>>>> 341155d024d3c9220e316d214ff7a9e237cffb4f
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <>
      <Box>
        <CssBaseline />
        <Box mt={8}>
          <Typography
            component='h1'
            fontSize='5rem'
            fontFamily='Sacramento'
            sx={{
              textAlign: 'center',
            }}
            mb={10}
          >
            Better Paricipation in Music
          </Typography>
        </Box>

        <Box
          textAlign='center'
          display='grid'
          sx={{ justifyContent: 'center' }}
        >
<<<<<<< HEAD
          <Grid container m='0 auto'>
            <Box border='1px solid #999' pt={5} pb={7}>
              {active ? (
                <>
                  <Typography variant='h5'>Wallet Information</Typography>
                  <Grid item p={5} textAlign='left'>
                    <Typography variant='h6'>ChainId: {chainId}</Typography>
                    <Typography variant='h6'>Account: {account}</Typography>
                    <Typography variant='h6'>Balance: {balance}</Typography>
                  </Grid>
                  <Button onClick={deactivate}>
                    <Typography variant='h6'>Disconnect</Typography>
=======
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
>>>>>>> 341155d024d3c9220e316d214ff7a9e237cffb4f
                  </Button>
                </>
              ) : (
                <Grid
                  item
                  display='grid'
                  justifyContent='center'
                  textAlign='left'
                  width={500}
                >
                  <Typography
                    // fontFamily='Teko'
                    component='h2'
                    textAlign='center'
                    fontSize='1rem'
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
                      <Typography variant='h4' color='#333' ml={2}>
                        Metamask
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid>
                    <Button sx={{ height: 50 }}>
                      <Klaytn />
                      <Typography variant='h4' color='#333' ml={2}>
                        Klaytn
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
