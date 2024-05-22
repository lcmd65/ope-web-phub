export function roundTo2Digits(num?: number) {
  let response = 0;

  if (!num) {
    return undefined;
  } else {
    response = Number(parseFloat(String(num)).toFixed(2));
  }
  return response;
}

export function decimalToPercent(num: number) {
  return roundTo2Digits(num * 100);
}
