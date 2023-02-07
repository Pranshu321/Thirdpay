import React, {useContext, useState, useEffect} from 'react'
import {ethers} from 'ethers';
import { Appstate } from '../pages';

const RecentTx = () => {
  const App = useContext(Appstate);
  const [data, setData] = useState([1]);

//   useEffect(() => {
//     async function getData() {
//       const tx = await App.paypalContract.filters.transactions(App.address)
//       const txData = await App.paypalContract.queryFilter(tx);
//       setData(txData)
//     }

//     getData();
//   })

  return (
    <div className='flex flex-col items-center justify-center p-3 text-white'>
    {data.map((e) => { 
      return (
      <div className={`bg-black rounded-lg bg-opacity-60 border-2 border-blue-900 border-opacity-80 w-4/5 mt-2`}> 
        <div className="flex w-full items-center justify-center rounded-t-lg">
          <div className="w-full py-2 px-2">
            <p className="text-xl font-mono">Amount: {344} {"ETH"}</p>
            <p className="text-xs font-mono">to: {"er"}</p>
          </div>
        </div>
        <a target={'_blank'} href={`${"fd"}/tx/${"fdg"}`}>
          <div className="font-mono w-full py-4 hover:text-[#DD13A4] rounded-b-lg bg-gray-900 text-center cursor-pointer text-opacity-30">
            View Transaction
          </div>
        </a>
      </div>
    )})}
    </div>
  )
}

export default RecentTx