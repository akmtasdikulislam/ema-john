// A function to show rating stars depending on their rating numbers.
export const showRatingStars = (star) => {
  /*
   * Description: This function generates an array of star ratings based on a given rating number.
   * It creates a mix of filled and empty stars to visually represent the rating.
   *
   * Task List:
   * • Initialize an empty array to store star types
   * • Calculate the number of filled and empty stars
   * • Populate the array with the appropriate number of filled stars
   * • Populate the array with the appropriate number of empty stars
   * • Return the final array of star types
   */

  // Initialize an empty array to store different types of stars (filled or empty)
  let stars = [];

  // Calculate the number of filled stars based on the input rating
  let filledStarNumber = star;

  // Calculate the number of empty stars (total 5 stars minus filled stars)
  let emptyStarNumber = 5 - star;

  // Populate the stars array with 'filled' stars
  for (let index = 0; index < filledStarNumber; index++) {
    stars.push("filled");
  }

  // Populate the stars array with 'empty' stars
  for (let index = 0; index < emptyStarNumber; index++) {
    stars.push("empty");
  }

  // Return the final array of star types
  return stars;
};
