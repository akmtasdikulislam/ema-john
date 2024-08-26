export function generateOrderID() {
  /*
   * Description: This function generates a random order ID consisting of uppercase letters and numbers.
   * Task list:
   * - Define the character set for the order ID
   * - Initialize an empty string for the order ID
   * - Generate a 20-character ID using a loop
   * - Return the generated order ID
   */

  // Define the character set for the order ID (uppercase letters and numbers)
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // Initialize an empty string to store the generated order ID
  let orderID = "";

  // Loop 20 times to create a 20-character order ID
  for (let i = 0; i < 20; i++) {
    // Generate a random index within the range of the characters string
    const randomIndex = Math.floor(Math.random() * characters.length);

    // Append a randomly selected character to the order ID
    orderID += characters.charAt(randomIndex);
  }

  // Return the final generated order ID
  return orderID;
}
