import { useQuery } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { BigNumber as EtherBigNumber } from "@ethersproject/bignumber";
import { useEffect } from "react";
import { SWAP_QUOTE_REFETCH_INTERVAL } from "../utils/consts";
import { TokenId, getTokenAddress } from "../utils/tokens";
import { NumberT, fromWeiRounded } from "../utils/amount";
import { useDebounce } from "../utils/debounce";

import { getMentoSdk } from "../utils/mento";
import { ChainId } from "../utils/chains";

export function useSwap(
  fromAmountWei: string,
  fromTokenId: TokenId,
  toTokenId: TokenId,
  chainId: ChainId
) {
  const debouncedFromAmountWei = useDebounce(fromAmountWei, 350);

  const { isLoading, isError, error, data } = useQuery(
    [debouncedFromAmountWei, fromTokenId, toTokenId],
    async () => {
      const fromAmountBN = EtherBigNumber.from(debouncedFromAmountWei);
      if (fromAmountBN.lte(0) || !fromTokenId || !toTokenId) return null;
      const mento = await getMentoSdk(chainId);
      const fromTokenAddr = getTokenAddress(fromTokenId, chainId);
      const toTokenAddr = getTokenAddress(toTokenId, chainId);
      const toAmountWei = (
        await mento.getAmountOut(
          fromTokenAddr,
          toTokenAddr,
          fromAmountBN.toNumber()
        )
      ).toString();
      return {
        toAmountWei: toAmountWei,
        toAmount: fromWeiRounded(toAmountWei),
        rate: calcExchangeRate(debouncedFromAmountWei, toAmountWei),
      };
    },
    {
      staleTime: SWAP_QUOTE_REFETCH_INTERVAL,
      refetchInterval: SWAP_QUOTE_REFETCH_INTERVAL,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return {
    isLoading,
    isError,
    toAmountWei: data?.toAmountWei || "0",
    toAmount: data?.toAmount || "0",
    rate: data?.rate,
  };
}

function calcExchangeRate(fromAmount: NumberT, toAmount: NumberT) {
  try {
    return new BigNumber(fromAmount)
      .dividedBy(toAmount)
      .toFixed(2, BigNumber.ROUND_DOWN);
  } catch (error) {
    //logger.warn("Error computing exchange values", error);
    return "0";
  }
}
