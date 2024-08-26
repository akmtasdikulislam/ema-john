/**
 * Formats a date as a string in the format "Weekday, DD Month YYYY".
 *
 * @param {Date|string} inputDate - The date to format. Can be a Date object or a string that can be parsed by the Date constructor.
 * @returns {string} The formatted date string.
 */
export function formatDate(inputDate) {
  /*
   * Description:
   * This function takes a date input and formats it into a specific string format.
   * It handles both Date objects and string inputs that can be parsed by the Date constructor.
   *
   * Task list:
   * • Create a Date object from the input
   * • Extract the weekday name in short format
   * • Get the day of the month in 2-digit format
   * • Obtain the month name in short format
   * • Extract the year in numeric format
   * • Combine all parts into a formatted string
   */

  // Convert the input to a Date object for consistent handling
  const date = new Date(inputDate);

  // Extract the weekday name in short format (e.g., "Mon", "Tue")
  const weekdayName = date.toLocaleString("default", { weekday: "short" });

  // Get the day of the month, ensuring it's in 2-digit format (e.g., "01", "15")
  const day = date.toLocaleString("default", { day: "2-digit" });

  // Extract the month name in short format (e.g., "Jan", "Feb")
  const monthName = date.toLocaleString("default", { month: "short" });

  // Obtain the full year in numeric format (e.g., "2023")
  const year = date.toLocaleString("default", { year: "numeric" });

  // Construct the final formatted string using template literals
  return `${weekdayName}, ${day} ${monthName} ${year}`;
}
