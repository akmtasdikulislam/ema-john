export function getDecimalPart(price) {
  // Convert the price to a string to handle both number and string inputs
  const priceStr = price.toString();

  // Find the position of the decimal point in the price string
  const decimalIndex = priceStr.indexOf(".");

  // If there is no decimal point, return "00" by default
  if (decimalIndex === -1) {
    return "00";
  }

  // Extract and return the part of the string after the decimal point
  return priceStr.substring(decimalIndex + 1);
}
