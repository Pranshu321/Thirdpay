import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { Appstate } from "../pages";
import {
	useContract,
	useContractWrite,
	useContractRead,
} from "@thirdweb-dev/react";
import { Toaster, toast } from "react-hot-toast";

const Recipients = () => {
	const App = useContext(Appstate);

	const [recipientAddress, setRecipientAddress] = useState("");
	const [recipientName, setRecipientName] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setError] = useState("");
	const [data, setData] = useState([{}]);
	const [num, setNum] = useState(0);

	//   useEffect(() => {
	//     async function getData() {
	//       const recipients = await App.paypalContract.filters.recipeints(App.address)
	//       const recipentsData = await App.paypalContract.queryFilter(recipients);
	//       setData(recipentsData)
	//     }

	//     getData();
	//   }, [num])

	const { contract, isLoading, error } = useContract(
		"0x73079dcA24Cb30D7720EA0e67F4C2De7D3A13C7D"
	);
	const { mutateAsync: addRecipient } = useContractWrite(
		contract,
		"addRecipient"
	);

	const addresci = async () => {
		try {
			const data = await contract.call(
				"addRecipient",
				recipientAddress,
				recipientName
			);
			console.info("contract call successs", data);
			setRecipientAddress("");
			setRecipientName("");
			toast.success("Recipient Added");
		} catch (err) {
			toast.error("contract call failure");
			console.error("contract call failure", err);
		}
	};

	const addRecipientsss = async () => {
		try {
			let temp = [];
			const dd = await contract.events.getEvents("recipients");
			// console.log("Recipients", dd);
			dd?.map((item, idx) => {
				// console.log(idx, item.data);
				temp.push(item.data);
			});
			setData(temp);
		} catch (error) {
			// console.log(error);
			// toast.error(errors);
		}

		let nextnum = num + 1;
		setNum(nextnum);
	};
	const trans = async () => {
		try {
			let temp = [];
			const dd = await contract.events.getEvents("transactions");
			console.log("Recipients", dd);
			dd?.map((item, idx) => {
				// console.log(idx, item.data);
				temp.push(item.data);
			});
			// setData(temp);
		} catch (error) {
			// console.log(error);
			// toast.error(errors);
		}
	};

	setInterval(() => {
		addRecipientsss();
	}, 5000);

	const setRecipient = (address, name) => {
		App.setRecipientAddress(address);
		setMessage("Selected the " + name + "'s address");
	};

	return (
		<div className="flex flex-col items-center justify-center my-10 py-3 px-4 text-white">
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
			<input
				onChange={(e) => setRecipientAddress(e.target.value)}
				value={recipientAddress}
				className="w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
				placeholder="Paste Recipient Address"
			/>

			<input
				onChange={(e) => setRecipientName(e.target.value)}
				value={recipientName}
				onClick={trans}
				className="mt-4 w-3/4 p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
				placeholder="Paste Recipient Name"
			/>

			<div
				onClick={addresci}
				className="flex mt-4 w-3/4 cursor-pointer justify-center items-center p-2 bg-green-500 bg-opacity-70 border-2 border-blue-900 border-opacity-80 text-xl font-medium rounded-lg"
			>
				Add Recipient
			</div>

			{/* <p className="text-red-600 text-lg mt-2 px-3">{error}</p>
      <p className="text-green-600 text-lg mt-2 px-1">{message}</p> */}

			<div className="flex flex-col items-center justify-center mt-4 w-full">
				{data.map((e, idx) => {
					return (
						<div
							onClick={() => {}}
							key={idx + 1}
							className={`bg-black cursor-pointer rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-3/4 mt-2`}
						>
							<div className="flex w-full items-center justify-center rounded-t-lg">
								<div className="w-full py-2 px-2">
									<p className="text-xl font-mono">Name: {e.recipientName}</p>
									<p className="text-xs font-mono">address: {e.recipient}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Recipients;
