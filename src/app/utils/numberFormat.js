'use strict';

import mnemonics from "@/app/utils/mnemonics";

export default (number, decimals = 0, decPoint = '.', thousandsSep = mnemonics.nbsp) => {
  if (number === null) {
    return mnemonics.mdash;
  }

  const sign = number < 0 ? '-' : '';

  const sNumber = Math.abs(parseInt(number = (+number || 0).toFixed(decimals))) + '';
  const len = sNumber.length;
  const tChunk = len > 3 ? len % 3 : 0;

  const chFirst = (tChunk ? sNumber.substr(0, tChunk) + thousandsSep : '');
  const chRest = sNumber.substr(tChunk).replace(/(\d\d\d)(?=\d)/g, '$1' + thousandsSep);
  const chLast = decimals
    ? decPoint + (Math.abs(number) - sNumber).toFixed(decimals).slice(2)
    : '';

  return sign + chFirst + chRest + chLast;
};
