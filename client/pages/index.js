import Login from "../components/Login";
import styles from "../styles/Home.module.css";
import { useState, createContext } from "react";
import Head from "next/head"
import Landing from "../components/Landing";


const Appstate = createContext();
export default function Home() {
	const [login, setlogin] = useState(false);
	return (
		<div className={styles.container}>
			<Head>
				<title>Thirdpay | Decentralised Payments Made Easy</title>
				<link rel="shortcut icon" href="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600" type="image/x-icon" />
			</Head>
			<Appstate.Provider value={{ login, setlogin }}>
				{!login ? (
					<Login />
				) : (
					<Landing />
				)}
			</Appstate.Provider>
		</div>
	);
}

export { Appstate };
