/**
 * showToast function: Displays a toast notification to the user.
 *
 * Tasks:
 * • Creates a new toast object with the provided parameters.
 * • Adds the new toast object to the existing toasts array.
 * • Sets a timeout to remove the toast notification after a specified time.
 *
 * @param {array} toasts - The existing array of toast notifications.
 * @param {function} setToasts - The function to update the toasts array.
 * @param {string} type - The type of toast notification (e.g. success, error, warning, info).
 * @param {string} title - The title of the toast notification.
 * @param {string} message - The message of the toast notification.
 * @param {number} time - The time in milliseconds to display the toast notification.
 * @param {object} dynamicContent - Optional dynamic content to display in the toast notification.
 */
export const showToast = (
  toasts, // The existing array of toast notifications.
  setToasts, // The function to update the toasts array.
  type, // The type of toast notification (e.g. success, error, warning).
  title, // The title of the toast notification.
  message, // The message of the toast notification.
  time, // The time in milliseconds to display the toast notification.
  dynamicContent // Optional dynamic content to display in the toast notification.
) => {
  // Create a new toast object with the provided parameters.
  const newToast = {
    id: Date.now(), // Generate a unique ID for the toast notification.
    type, // Set the type of toast notification.
    title, // Set the title of the toast notification.
    message, // Set the message of the toast notification.
    time, // Set the time in milliseconds to display the toast notification.
    dynamicContent, // Set the optional dynamic content to display in the toast notification.
  };

  // Add the new toast object to the existing toasts array.
  setToasts([...toasts, newToast]);

  // Set a timeout to remove the toast notification after a specified time.
  setTimeout(() => {
    // Update the toasts array by removing the toast notification with the matching ID.
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== newToast.id)
    );
  }, time || 5000); // Use the provided time or default to 5000ms (5 seconds).
};
