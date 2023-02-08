import { ConnectWallet, useAddress, useSDK } from "@thirdweb-dev/react";
import React, { useContext, useEffect, useState } from "react";
import { Appstate } from "../pages";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
const Login = () => {
	const navi = useRouter();
	const sdk = useSDK();
	const add = useAddress();

	const App = useContext(Appstate);
	const LoginWallet = async () => {
		try {
			// const accounts = await window.ethereum.request({
			// 	method: "eth_requestAccounts",
			// });
			// const address = await sdk.wallet.getAddress();
			// const balance = await sdk.wallet.balance();
			// const isConnected = await sdk.wallet.isConnected();
			// console.log(address)
			if (add) {
				App.setlogin(true);
			} else {
				// toast.error("Wallet Not Connected");
				App.setlogin(false);
			}
		} catch (err) {
			console.log(err.message);
			toast.error("Wallet Not Connected");
		}
	};

	useEffect(() => {
		LoginWallet();
	}, [add]);

	return (
		<main className={styles.main}>
			<Toaster
				position="top-center"
				reverseOrder={false}
				gutter={8}
				containerClassName=""
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: "",
					duration: 5000,
					style: {
						background: "#363636",
						color: "#fff",
					},

					// Default options for specific types
					success: {
						duration: 3000,
						theme: {
							primary: "green",
							secondary: "black",
						},
					},
				}}
			/>
			<h1 className={styles.title}>
				Welcome to <a href="#">ThirdPay!</a>
			</h1>
			<p className={styles.description}>
				Unleash the Power of Decentralized Payments with Web3!!!
			</p>
			<div>
				<div className={styles.grid}>
					<div className={styles.card}>
						<h2>Login &rarr;</h2>
						<p>
							Guides, references and resources that will help you build with
							Thirdpay.
						</p>
						<div className="mt-8 flex justify-center">
							<div className={styles.connect}>
								<ConnectWallet />
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Login;
