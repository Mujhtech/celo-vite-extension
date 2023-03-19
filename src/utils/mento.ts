import { Mento } from "@mento-protocol/mento-sdk";
import { ChainId } from "./chains";
import { BrokerAddresses, MentoExchanges } from "./exchanges";
import { getProvider } from "./provider";

const cache: Record<number, Mento> = {};

export async function getMentoSdk(chainId: ChainId): Promise<Mento> {
  if (cache[chainId]) return cache[chainId];

  const provider = getProvider(chainId);
  const brokerAddr = BrokerAddresses[chainId];
  const exchanges = MentoExchanges[chainId];
  let mento: Mento;
  if (brokerAddr) {
    mento = Mento.createWithParams(provider, brokerAddr, exchanges);
  } else {
    mento = await Mento.create(provider);
  }
  cache[chainId] = mento;
  return mento;
}
