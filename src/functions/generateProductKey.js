export function generateProductKey() {
  // Define the characters to be used in the product key (capital letters and numbers)
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Initialize the product key with 'B' as the first character
  let productKey = "B";

  // Loop to generate the remaining 9 characters of the product key
  for (let i = 0; i < 9; i++) {
    // Generate a random index to pick a character from the 'characters' string
    const randomIndex = Math.floor(Math.random() * characters.length);

    // Append the randomly selected character to the product key
    productKey += characters[randomIndex];
  }

  // Return the generated product key
  return productKey;
}
