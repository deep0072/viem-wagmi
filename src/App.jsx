import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

// // create client that responsible to talk to ethereum

// const client = createPublicClient({
//   chain: mainnet,
//   transport: http(), // it means we are using http method to connect to ethereum
// });

// // we can use tanstack query here just to get the whethere data we are getting is loading or not . handling error
// function App() {
//   async function getBalance() {
//     const res = await client.getBalance({
//       address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
//     });

//     console.log(res);
//   }
//   return (
//     <>
//       <button onClick={getBalance}>getBalance </button>
//     </>
//   );
// }

// export default App;

//---------------- example using tanstack query------------------------

async function getBalance() {
  // create client that responsible to talk to ethereum
  const client = createPublicClient({
    chain: mainnet,
    transport: http(), // it means we are using http method to connect to ethereum
  });
  const balance = await client.getBalance({
    address: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
  });
  return balance.toString();
}

// we can use tanstack query here just to get the whethere data we are getting is loading or not . handling error

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Balance />
    </QueryClientProvider>
  );
}

export default App;

function useBalance() {
  // useQuery responsible for calling getBalance function that is furthur responsible for getting balance
  return useQuery({
    query: ["getBalance"],
    queryFn: getBalance,
  });
}
function Balance() {
  const { data, isLoading } = useBalance();
  // useQuery responsible for calling getBalance function that is furthur responsible for getting balance
  return <>{isLoading ? <> isloading...</> : data}</>;
}
