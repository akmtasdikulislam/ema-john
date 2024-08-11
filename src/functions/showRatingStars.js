// A function to show rating stars depending on their rating numbers.
export const showRatingStars = (star) => {
  // At first, declaring an empty array called "stars", where different types of stars like "filled" or "empty" type will be stored to determine rating from  rating number.
  let stars = [];
  // Determining how many "filled" stars are required. As rating number indicates the rating, that's why the star number (which is destructured from productDetails) is directly assigned to it.
  let filledStarNumber = star;
  // Then determinig how many "empty" or "blank" stars are required. To determine this, subtracting 'star number' from 5 as it will show rating between 0 to 5.
  let emptyStarNumber = 5 - star;

  // Running a for loop to indicate how many "filled" stars are required by storing "filled" category everytime in "stars" variable.
  for (let index = 0; index < filledStarNumber; index++) {
    stars.push("filled");
  }
  // Running a for loop to indicate how many "empty" stars are required by storing "empty" category everytime in "stars" variable.
  for (let index = 0; index < emptyStarNumber; index++) {
    stars.push("empty");
  }
  // Finally, returning the stars array.(It means if we run this function, we will get an array).
  return stars;
};
