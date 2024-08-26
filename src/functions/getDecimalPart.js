export function getDecimalPart(price) {
  /*
   * Description: This function extracts the decimal part of a given price.
   * Task list:
   * - Convert the input price to a string
   * - Find the position of the decimal point
   * - Handle cases where there is no decimal point
   * - Extract and return the decimal part
   */

  // Convert the price to a string to handle both number and string inputs
  const priceStr = price.toString(); // Ensure the input is a string for consistent processing

  // Find the position of the decimal point in the price string
  const decimalIndex = priceStr.indexOf("."); // Locate the decimal point

  // If there is no decimal point, return "00" by default
  if (decimalIndex === -1) {
    return "00"; // Return "00" for whole numbers or invalid inputs
  }

  // Extract and return the part of the string after the decimal point
  return priceStr.substring(decimalIndex + 1); // Return all characters after the decimal point
}
