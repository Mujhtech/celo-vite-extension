import { providers } from "ethers";
import { ChainId, chainIdToChain } from "./chains";

const cache: Record<number, providers.JsonRpcProvider> = {};

export function getProvider(chainId: ChainId): providers.JsonRpcProvider {
  if (cache[chainId]) return cache[chainId];
  const chain = chainIdToChain[chainId];
  const provider = new providers.JsonRpcProvider(chain.rpcUrl, chainId);
  cache[chainId] = provider;
  return provider;
}
