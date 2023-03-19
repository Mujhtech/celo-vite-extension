import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import celoLogo from "./assets/celo.svg";
import { useSwap } from "./hooks/useSwap";
import { Alfajores, Celo } from "./utils/chains";
import { TokenId } from "./utils/tokens";

function App() {
  const [toToken, setToToken] = useState<TokenId>(TokenId.cUSD);

  const { isLoading, toAmount, rate } = useSwap(
    BigNumber(1).toString(),
    TokenId.CELO,
    toToken,
    Alfajores.chainId
  );

  console.log(rate);

  useEffect(() => {});

  return (
    <div className="min-w-[320px] min-h-[250px] m-0 flex bg-bg p-0">
      <div className="h-2/3 w-full my-auto flex flex-col">
        <div className="w-full flex items-center justify-center">
          <img src={celoLogo} width={100} height={50} alt="Celo" />
        </div>
        <div className="flex flex-col items-center justify-center my-10">
          <h1 className="text-3xl font-extrabold">
            {rate ?? 1}
            <span className="ml-2 text-xs font-normal">
              {toToken.toString()}
            </span>
          </h1>
          <p className=" text-black text-xs">~ 1 CELO</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button
            className={`btn ${toToken == TokenId.cUSD ? "!bg-primary" : ""}`}
            type="button"
            onClick={() => setToToken(TokenId.cUSD)}
          >
            cUSD
          </button>
          <button
            className={`btn ${toToken == TokenId.cEUR ? "!bg-primary" : ""}`}
            type="button"
            onClick={() => setToToken(TokenId.cEUR)}
          >
            cEUR
          </button>
          <button
            className={`btn ${toToken == TokenId.cREAL ? "!bg-primary" : ""}`}
            type="button"
            onClick={() => setToToken(TokenId.cREAL)}
          >
            cREAL
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
