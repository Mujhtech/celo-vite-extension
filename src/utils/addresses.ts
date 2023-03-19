import { getAddress, isAddress } from "@ethersproject/address";
export type { getAddress };

export function validateAddress(address: string, context: string) {
  if (!address || !isAddress(address)) {
    const errorMsg = `Invalid addresses for ${context}: ${address}`;
    //logger.error(errorMsg);
    throw new Error(errorMsg);
  }
}

export function areAddressesEqual(a1: string, a2: string) {
  validateAddress(a1, "compare");
  validateAddress(a2, "compare");
  return getAddress(a1) === getAddress(a2);
}
