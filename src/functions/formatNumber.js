export function formatNumber(number) {
  return number.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
