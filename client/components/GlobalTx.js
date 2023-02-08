import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { Appstate } from "../pages";
import { useChainId, useContract } from "@thirdweb-dev/react";
import { CHAIN_ID_TO_NAME } from "@thirdweb-dev/sdk";

const GlobalTx = () => {
	const App = useContext(Appstate);
	const [data, setData] = useState([]);

	const [hash, sethash] = useState([]);

	const { contract, isLoading, error } = useContract(
		"0x73079dcA24Cb30D7720EA0e67F4C2De7D3A13C7D"
  );
  
  const chain = useChainId();

	// console.log();

	const transactionsdata = async () => {
		try {
			let temp = [];
			let hasharr = [];
			const dd = await contract.events.getEvents("transactions");
			console.log("transactions", dd);
			dd?.map((item, idx) => {
				// console.log(idx, item.data);
				hasharr.push(item.transaction.transactionHash);
				temp.push(item.data);
			});
			sethash(hasharr);
			setData(temp);
		} catch (error) {
			console.log(error);
			// toast.error(errors);
		}
	};

	setInterval(() => {
		transactionsdata();
	}, 5000);

	return (
		<div className="flex flex-col items-center justify-center p-3 text-white">
			{data.map((e, idx) => {
				return (
					<div
						key={idx + 1}
						className={`bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`}
					>
						<div className="flex w-full items-center justify-center rounded-t-lg">
							<div className="w-full py-2 px-2 pt-2">
								<p className="text-xl font-mono">
									Amount: {ethers.utils.formatEther(e.amount._hex)} {e.symbol}
								</p>
								<p className="text-xs font-mono my-1">to: {e.to}</p>
								<p className="text-xs font-mono">from: {e.from}</p>
							</div>
						</div>
						<a
							target={"_blank"}
							href={`${`https://${CHAIN_ID_TO_NAME[chain].toLowerCase()}.etherscan.io`}/tx/${hash[idx]}`}
						>
							<div className="font-mono w-full py-4 hover:text-[#DD13A4] rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
								View Transaction
							</div>
						</a>
					</div>
				);
			})}
		</div>
	);
};

export default GlobalTx;
