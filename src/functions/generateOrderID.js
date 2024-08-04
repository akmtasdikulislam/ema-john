export function generateOrderID() {
  // Define the characters to be used in the order ID
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  // Initialize an empty string to store the order ID
  let orderID = "";
  // Loop 20 times to generate a 20-character ID
  for (let i = 0; i < 20; i++) {
    // Select a random character from the characters string
    const randomIndex = Math.floor(Math.random() * characters.length);
    // Append the selected character to the order ID
    orderID += characters.charAt(randomIndex);
  }
  // Return the generated order ID
  return orderID;
}
