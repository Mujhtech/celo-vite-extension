import { formatUnits, parseUnits } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import { DISPLAY_DECIMALS, MIN_ROUNDED_VALUE } from "./consts";
// import { logger } from 'src/utils/logger'

export type NumberT = BigNumber.Value;

export function fromWei(value: NumberT | null | undefined): number {
  if (!value) return 0;
  const valueString = value.toString().trim();
  const flooredValue = new BigNumber(valueString).toFixed(
    0,
    BigNumber.ROUND_FLOOR
  );
  return parseFloat(formatUnits(flooredValue));
}

// Similar to fromWei above but rounds to set number of decimals
// with a minimum floor, configured per token
export function fromWeiRounded(
  value: NumberT | null | undefined,
  roundDownIfSmall = false
): string {
  if (!value) return "0";
  const flooredValue = new BigNumber(value).toFixed(0, BigNumber.ROUND_FLOOR);
  const amount = new BigNumber(formatUnits(flooredValue));
  if (amount.isZero()) return "0";

  // If amount is less than min value
  if (amount.lt(MIN_ROUNDED_VALUE)) {
    if (roundDownIfSmall) return "0";
    else return MIN_ROUNDED_VALUE.toString();
  }

  return amount.toFixed(DISPLAY_DECIMALS).toString();
}
