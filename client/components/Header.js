import { ConnectWallet, useAddress, useSDK } from "@thirdweb-dev/react";
import React, { useContext, useEffect, useState } from "react";
import { Appstate } from "../pages";

const Header = () => {
	const sdk = useSDK();
	const App = useContext(Appstate);
	const [address, setaddress] = useState("");
	const add = useAddress();
	const user = async () => {
		if (add) {
			const add = await sdk.wallet.getAddress();
			setaddress(add);
		}
	};

	useEffect(() => {
		LoginWallet();
		user();
	}, [add]);

	const LoginWallet = async () => {
		try {
			// const isConnected = await sdk.wallet.isConnected();
			if (!add) {
				App.setlogin(false);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<div className="relative bg-[#0F1318]">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
						<div className="hidden lg:flex justify-start lg:w-0 lg:flex-1">
							<a href="#" className="flex gap-x-2">
								<img
									className="h-8 w-auto sm:h-10"
									src="https://tailwindui.com/img/logos/mark.svg?color=pink&shade=600"
									alt=""
								/>
								<button
									type="button"
									className="text-[#fff] group inline-flex items-center rounded-md text-2xl font-medium"
									aria-expanded="false"
								>
									<span>Thirdpay</span>
								</button>
							</a>
						</div>
						<nav className="lg:hidden space-x-10 md:flex">
							<div className="relative">
								<button
									type="button"
									className="text-[#f213a4] group inline-flex items-center rounded-md text-2xl font-medium"
									aria-expanded="false"
								>
									<span>Thirdpay</span>
								</button>
							</div>
						</nav>
						<div className="items-center lg:ml-0 ml-12 justify-end md:flex md:flex-1 lg:w-max">
							<a
								href="#"
								className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
							>
								<ConnectWallet />
							</a>
							<a
								href="#"
								className="hidden ml-8 lg:inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
							>
								{address.slice(0, 10) + "..."}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
