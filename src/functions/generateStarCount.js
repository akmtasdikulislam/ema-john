export function generateStarCount() {
  /*
   * Description: This function generates a random star count within a specified range.
   *
   * Task List:
   * - Define the minimum and maximum values for the range
   * - Generate a random floating-point number
   * - Scale the random number to the desired range
   * - Round down the scaled number and add the minimum value
   * - Return the final random star count
   */

  // Define the minimum value for the random number (lower bound of the range)
  const min = 1000;

  // Define the maximum value for the random number (upper bound of the range)
  const max = 5000;

  // Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
  const randomFloat = Math.random();

  // Scale the random floating-point number to the range 0 to (max - min)
  const scaledRandomFloat = randomFloat * (max - min);

  // Shift the scaled random number to the desired range by adding the minimum value and round down
  const randomNumber = Math.floor(scaledRandomFloat) + min;

  // Return the generated random number as the star count
  return randomNumber;
}
