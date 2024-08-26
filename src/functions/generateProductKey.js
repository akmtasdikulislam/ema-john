export function generateProductKey() {
  /*
   * Description: This function generates a unique product key consisting of 10 characters.
   * The first character is always 'B', followed by 9 random alphanumeric characters.
   * 
   * Task list:
   * - Define the character set for the product key
   * - Initialize the product key with 'B'
   * - Generate 9 random characters
   * - Append the random characters to the product key
   * - Return the complete product key
   */

  // Define the character set for the product key (uppercase letters and numbers)
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Initialize the product key with 'B' as the first character
  let productKey = "B";

  // Generate and append 9 random characters to the product key
  for (let i = 0; i < 9; i++) {
    // Calculate a random index within the range of the character set
    const randomIndex = Math.floor(Math.random() * characters.length);

    // Select a random character from the character set and append it to the product key
    productKey += characters[randomIndex];
  }

  // Return the fully generated product key
  return productKey;
}
