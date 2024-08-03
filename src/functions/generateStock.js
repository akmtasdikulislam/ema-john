export function generateStock() {
  // Define the minimum value for the random number
  const min = 0;

  // Define the maximum value for the random number
  const max = 200;

  // Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
  const randomFloat = Math.random();

  // Scale the random floating-point number to the range 0 to (max - min)
  const scaledRandomFloat = randomFloat * (max - min);

  // Shift the scaled random number to the desired range by adding the minimum value
  const randomNumber = Math.floor(scaledRandomFloat) + min;

  // Return the generated random number
  return randomNumber;
}
