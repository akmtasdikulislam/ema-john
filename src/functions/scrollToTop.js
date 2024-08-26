export function scrollToTop() {
  /*
   * Description: This function scrolls the page to the top smoothly.
   * Task list:
   * - Use the window.scrollTo method
   * - Set the scroll position to the top of the page
   * - Apply smooth scrolling behavior
   */

  // Invoke the window.scrollTo method to initiate scrolling
  window.scrollTo({
    top: 0, // Set the vertical scroll position to 0 (top of the page)
    behavior: "smooth", // Enable smooth scrolling animation for a better user experience
  });
}
