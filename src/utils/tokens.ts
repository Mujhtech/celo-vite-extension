import { areAddressesEqual } from "./addresses";

import { ChainId } from "./chains";

export interface Token {
  id: string;
  symbol: string; // The same as id for now
  name: string;

  decimals: number;
}

export enum TokenId {
  CELO = "CELO",
  cUSD = "cUSD",
  cEUR = "cEUR",
  cREAL = "cREAL",
}

export const StableTokenIds = [TokenId.cUSD, TokenId.cEUR, TokenId.cREAL];

export const CELO: Token = {
  id: TokenId.CELO,
  symbol: TokenId.CELO,
  name: "Celo Native",

  decimals: 18,
};
export const cUSD: Token = {
  id: TokenId.cUSD,
  symbol: TokenId.cUSD,
  name: "Celo Dollar",

  decimals: 18,
};
export const cEUR: Token = {
  id: TokenId.cEUR,
  symbol: TokenId.cEUR,
  name: "Celo Euro",

  decimals: 18,
};
export const cREAL: Token = {
  id: TokenId.cREAL,
  symbol: TokenId.cREAL,
  name: "Celo Real",
  decimals: 18,
};

export const Tokens: Record<TokenId, Token> = {
  CELO,
  cUSD,
  cEUR,
  cREAL,
};

export const TokenAddresses: Record<ChainId, Record<TokenId, string>> = {
  [ChainId.Alfajores]: {
    [TokenId.CELO]: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
    [TokenId.cUSD]: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    [TokenId.cEUR]: "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F",
    [TokenId.cREAL]: "0xE4D517785D091D3c54818832dB6094bcc2744545",
  },
  [ChainId.Baklava]: {
    [TokenId.CELO]: "0xdDc9bE57f553fe75752D61606B94CBD7e0264eF8",
    [TokenId.cUSD]: "0x62492A644A588FD904270BeD06ad52B9abfEA1aE",
    [TokenId.cEUR]: "0xf9ecE301247aD2CE21894941830A2470f4E774ca",
    [TokenId.cREAL]: "0x6a0EEf2bed4C30Dc2CB42fe6c5f01F80f7EF16d1",
  },
  [ChainId.Celo]: {
    [TokenId.CELO]: "0x471EcE3750Da237f93B8E339c536989b8978a438",
    [TokenId.cUSD]: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
    [TokenId.cEUR]: "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73",
    [TokenId.cREAL]: "0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787",
  },
};

export function isNativeToken(tokenId: string) {
  return Object.keys(Tokens).includes(tokenId);
}

export function isStableToken(tokenId: string) {
  return StableTokenIds.includes(tokenId as TokenId);
}

export function getTokenById(id: string): Token | null {
  return Tokens[id as TokenId] || null;
}

export function getTokenAddress(id: TokenId, chainId: ChainId): string {
  const addr = TokenAddresses[chainId][id];
  if (!addr)
    throw new Error(`No address found for token ${id} on chain ${chainId}`);
  return addr;
}

export function getTokenByAddress(address: string): Token {
  const idAddressTuples = Object.values(TokenAddresses)
    .map((idToAddress) => Object.entries(idToAddress))
    .flat();
  // This assumes no clashes btwn different tokens on diff chains
  for (const [id, tokenAddr] of idAddressTuples) {
    if (areAddressesEqual(address, tokenAddr)) {
      return Tokens[id as TokenId];
    }
  }
  throw new Error(`No token found for address ${address}`);
}
