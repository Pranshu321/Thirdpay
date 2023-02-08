// var https = require("https");
import React, { useState, useContext } from "react";
import { Bars, TailSpin } from "react-loader-spinner";
import { ethers } from "ethers";
import { Appstate } from "../pages";
import {
	useAddress,
	useBalance,
	useChainId,
	useContract,
	useContractWrite,
} from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
import { CHAIN_ID_TO_NAME } from "@thirdweb-dev/sdk";
import { Toaster, toast } from "react-hot-toast";

const Send = () => {
	const App = useContext(Appstate);
	// const balance = useAccount();
	const bal = useBalance();
	const add = useAddress();

	const chain = useChainId();
	// const [transfer_to, settransfer_to] = useState("");
	const [amount_to, setamount] = useState("");
	// const { contract, isLoading, data } = useContract(tokenadress);
	const ERCABI = [
		"function balanceOf(address) view returns (uint)",
		"function transfer(address to, uint amount) returns (bool)",
		"function symbol() external view returns (string memory)",
		"function name() external view returns (string memory)",
	];

	// const provider = new ethers.providers.Web3Provider(window.ethereum);
	// const signer = provider.getSigner();
	// const ERCContract = new ethers.Contract(tokenadress, ERCABI, signer);
	// ERCContract.connect(signer);
	// console.log();
	// const [symbol, setSymbol] = useState("");
	// const [balance, setBalance] = useState("");
	// const [tokenChanged, setTokenChanged] = useState(false);
	// const [currency, setCurrency] = useState("");

	// req.end();

	// const selectToken = async () => {
	// 	try {
	// 		// const signer = await provider.getBalance(tokenadress);
	// 		// const signer = await provider.getFeeData(tokenadress);
	// 		// setErcLoading(true);
	// 		const name = await ERCContract.deployed().functions();
	// 		console.log(name);
	// 		// const balance = await ERCContract.balanceOf(address);
	// 		// const symbol = await ERCContract.symbol();
	// 		setBalance(ethers.utils.formatEther(balance));
	// 		setSymbol(symbol);
	// 		setCurrency(name);
	// 		setTokenChanged(true);
	// 		// setErcLoading(false);
	// 	} catch (error) {
	// 		//   setError(error.message)
	// 		//   setErcLoading(false);
	// 	}
	// };

	// console.log(balance[0].data.connector.chains , bal);

	// All Functions

	const { contract } = useContract(
		"0x73079dcA24Cb30D7720EA0e67F4C2De7D3A13C7D"
	);
	const { mutateAsync: _transfer, isLoading } = useContractWrite(
		contract,
		"_transfer"
	);

	const TransferAmount = async () => {
		// try {
		// 	const data = await contract.call(
		// 		"_transfer",
		// 		transfer_to,
		// 		CHAIN_NAME_TO_ID[chain],
		// 		{
		// 			value: ethers.utils.parseEther(amount_to),
		// 		}
		// 	);
		// 	console.info("contract call successs", data);
		// 	// setRecipientAddress("");
		// 	// setRecipientName("");
		// 	// toast.success("Amount Tranferred");
		// } catch (err) {
		// 	// toast.error("contract call failure");
		// 	console.error("contract call failure", err);
		// }
		try {
			const data = await _transfer([
				App.transfer_to,
				CHAIN_ID_TO_NAME[chain],
				{ value: ethers.utils.parseEther(amount_to) }
			]);
			console.info("contract call successs", data);
			App.settransfer_to("");
			setamount("");
			toast.success("Amount Transferred");
		} catch (err) {
			console.error("contract call failure", err);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center text-white">
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
			{/* Balance */}
			<div className="flex w-4/5 justify-around items-center mt-7">
				<div
					onClick={() => {}}
					className="flex cursor-pointer justify-center items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black bg-opacity-70 rounded-lg"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						className="bi bi-coin"
						viewBox="0 0 16 16"
					>
						<path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
						<path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
					</svg>
					<h1 onClick={() => selectToken} className="mx-2 text-lg font-medium">
						{CHAIN_ID_TO_NAME[chain]}
					</h1>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						className="bi bi-chevron-down"
						viewBox="0 0 16 16"
					>
						<path
							fillRule="evenodd"
							d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
						/>
					</svg>
				</div>
				<div className="flex items-center border-2 border-blue-900 border-opacity-60 p-3 bg-black rounded-lg bg-opacity-70">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="currentColor"
						className="ml-2 bi bi-wallet2"
						viewBox="0 0 16 16"
					>
						<path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
					</svg>
					<h1 className="ml-2 text-lg font-medium">Balance :</h1>
					<h1 className="ml-2 text-lg font-medium">
						{bal.data?.displayValue.slice(0, 5)} {bal.data?.name}
					</h1>
				</div>
			</div>

			{/* Erc20 Address */}
			{/* <div className={` flex w-4/5 justify-between items-center mt-5`}>
				<input
					onChange={(e) => {
						settokenaddress(e.target.value);
					}}
					className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
					placeholder="Paste ERC20 Token Address"
				/>
				{App.ercLoading ? (
					<div className="flex p-2 cursor-pointer justify-around items-center w-1/4 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg">
						<TailSpin width={28} height={28} color={"white"} />
					</div>
				) : false ? (
					<div
						onClick={() => {}}
						className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-red-600 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg"
					>
						Remove
					</div>
				) : (
					<div
						className="flex cursor-pointer justify-around items-center w-1/4 p-2 ml-4 bg-blue-800 bg-opacity-70 border-2 border-blue-900 border-opacity-60 text-xl font-medium rounded-lg"
					>
						Select
					</div>
				)}
			</div> */}

			{/* Transfer To */}
			<div className="flex w-4/5 justify-between items-center mt-5">
				<input
					onChange={(e) => {
						App.settransfer_to(e.target.value);
					}}
					value={App.transfer_to}
					className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
					placeholder="Paste Recipient Address"
				/>
				<input
					onChange={(e) => {
						setamount(e.target.value);
					}}
					// value={App.amount}
					type={"number"}
					className="w-1/4 ml-4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
					placeholder="Amount"
				/>
			</div>

			{/* Transfer Button */}
			{false ? (
				<div className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-500 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg">
					<Bars width={30} height={46} color={"white"} />
				</div>
			) : (
				<div
					onClick={TransferAmount}
					className="flex mt-4 w-4/5 cursor-pointer justify-center items-center p-2 bg-green-500 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg"
				>
					Transfer
				</div>
			)}

			{/* Recent Tx section */}

			{/* Error & Message */}
			{/* <p className="text-red-600 text-lg mt-2 px-3">{App.error}</p>
      <p className="text-green-600 text-lg mt-2 px-1">{App.message}</p> */}
		</div>
		// 	{/* <div
		// 		className={` bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`}
		// 	>
		// 		<div className="flex w-full items-center justify-center rounded-t-lg">
		// 			<div className="w-4/6 py-2 px-2">
		// 				<p className="text-xl font-mono">
		// 					Amount: {234} {"ETH"}
		// 				</p>
		// 				<p className="text-xs font-mono">to: {"sdsd"}</p>
		// 			</div>
		// 			{App.saveTxLoad ? (
		// 				<div className="flex justify-center bg-green-500 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md">
		// 					<TailSpin height={18} width={18} color={"white"} />
		// 				</div>
		// 			) : (
		// 				<button
		// 					onClick={() => {}}
		// 					className="bg-green-500 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md"
		// 				>
		// 					Save
		// 				</button>
		// 			)}
		// 			<button
		// 				onClick={() => {}}
		// 				className="bg-red-700 font-medium font-mono bg-opacity-80 h-full w-1/6 py-1 mr-2 rounded-md"
		// 			>
		// 				Ignore
		// 			</button>
		// 		</div>
		// 		{/* <a target={'_blank'} href={`${App.explorer}/tx/${App.recentTx.txhash}`}>
		//   <div className="font-mono w-full rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
		//     View Transaction
		//   </div>
		// </a> */}
		// 	</div> */}
	);
};

export default Send;
