export function generateRandomRating() {
  // Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
  const randomFloat = Math.random();

  // Scale the random floating-point number to the range 0 to 5
  const scaledRandomFloat = randomFloat * 6;

  // Round down the scaled random number to the nearest integer
  const randomInteger = Math.floor(scaledRandomFloat);

  // Return the generated random integer
  return randomInteger;
}
