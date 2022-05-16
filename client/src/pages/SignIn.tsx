import {
	Box,
	Button,
	CssBaseline,
	TextField,
	Typography,
	Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

import { ReactComponent as Meatamask } from "../asset/metamask-logo.svg";
import { ReactComponent as Klaytn } from "../asset/klaytn-logo.svg";

export default function SignIn() {
	const navigate = useNavigate();
	const [balance, setBalance] = useState("");

	const injectedConnector = new InjectedConnector({
		supportedChainIds: [1, 3, 4, 5, 42],
	});
	const { chainId, account, activate, active, library } =
		useWeb3React<Web3Provider>();
	const onLogin = async () => {
		activate(injectedConnector);
		// alert('login Success');
		// navigate('/mypage');
		// try {
		//   const res = await axios.post('http://localhost:4000/user/signin', {
		//     address: account,
		//   });
		//   console.log(res);
		// } catch (err) {
		//   console.log(err);
		// }
	};
	const onLogout = () => {};

	// useEffect(() => {
	// 	console.log(chainId, account, active);
	// 	library?.getBalance(account).then((result) => {
	// 		// setBalance(result / 1e18);
	// 	});
	// });

	async function onSignIn() {
		let res = await axios.post("http://localhost:4000/user/signin", {
			address: account,
		});
		console.log("===>>>>", res);
	}
	onSignIn();
	return (
		<>
			<Box>
				<CssBaseline />
				<Box mt={8}>
					<Typography
						component="h1"
						fontSize="5rem"
						fontFamily="Sacramento"
						sx={{
							color: "#000",
							textAlign: "center",
						}}
						mb={10}
					>
						Better Paricipation in Music
					</Typography>
				</Box>

				<Box
					textAlign="center"
					display="grid"
					sx={{ justifyContent: "center" }}
				>
					<Typography component="h2" variant="h5">
						로그인할 지갑을 선택해주세요
					</Typography>
					<Box>
						<Box>ChainId: {chainId}</Box>
						<Box>Account: {account}</Box>
						<Box>Balance: {balance}</Box>
						{active ? (
							<Typography>login success ✅</Typography>
						) : (
							<Button onClick={onLogin}>Connect</Button>
						)}
					</Box>
					<Grid container m="0 auto" textAlign="left" md={6}>
						<Grid item>
							<Button sx={{ height: 80 }} onClick={onLogin}>
								<Meatamask />
							</Button>
							<Button sx={{ height: 80 }}>
								<Klaytn />
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</>
	);
}
