export function validateEmail(email) {
  // Tasks performed by validateEmail:
  // • Define the regex pattern for email validation
  // • Use the test() method to check if the email matches the regex pattern
  // • Return the result of the email validation

  // Define the regex pattern for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Use the test() method to check if the email matches the regex pattern
  // The test() method returns true if the email matches the pattern, and false otherwise
  return emailRegex.test(email); // Return the result of the email validation
}
export const handleInputChange = (event) => {
  // Tasks performed by handleInputChange:
  // • Get the input element that triggered the event
  // • Get the parent element of the input element
  // • Remove the "error" class from the parent element if it exists
  // • Hide the email error message if the input element is the email field

  // Get the input element that triggered the event
  const input = event.target; // The event.target property returns the element that triggered the event

  // Get the parent element of the input element
  const parentElement = input.parentNode; // The parentNode property returns the parent element of the input element

  // Remove the "error" class from the parent element if it exists
  if (parentElement.classList.contains("error")) {
    // Check if the parent element has the "error" class
    // Remove the "error" class from the parent element
    parentElement.classList.remove("error"); // The remove() method removes the specified class from the element
  }

  // Hide the email error message if the input element is the email field
  if (input.id === "email") {
    // Check if the input element is the email field
    // Get the email error message element
    const invalidEmailErrorMessage = document.getElementById(
      "email-error-message"
    ); // The getElementById() method returns the element with the specified ID

    // Hide the email error message
    if (invalidEmailErrorMessage.style.display === "flex") {
      // Check if the email error message is currently displayed
      invalidEmailErrorMessage.style.display = "none"; // Set the display property to "none" to hide the email error message
    }
  }
};

// Define a function to validate a form
export const validateForm = () => {
  // Tasks performed by validateForm:
  // • Get all form fields (input and select elements) and store them in an array
  // • Check if any of the form fields are empty
  // • Add the "error" class to the parent element of the empty form fields
  // • Show the error message if the form is not submitted
  // • Validate the email field
  // • Return true if the form is valid, false otherwise

  // Get all form fields (input and select elements) and store them in an array
  const formFields = [...document.querySelectorAll(["input"])];

  // Filter the form fields to get only the empty ones
  const emptyFormFields = formFields.filter(
    (formField) => formField.value === ""
  );

  // Add the "error" class to the parent element of the empty form fields
  emptyFormFields.forEach((formField) => {
    formField.parentNode.classList.add("error");
  });

  // Get the error message element
  const errorMessage = document.getElementById("error-message");

  // Check if there are any empty form fields
  if (emptyFormFields.length > 0) {
    // Check if the error message is already displayed
    if (errorMessage.style.display === "flex") {
      // Add the "shake" class to the error message element if it is already displayed
      errorMessage.classList.add("shake");

      // Add an event listener to the error message element
      // The event listener will remove the "shake" class from the error message element when the animation ends
      errorMessage.addEventListener("animationend", () => {
        errorMessage.classList.remove("shake");
      });
    } else {
      // Display the error message
      errorMessage.style.display = "flex";
    }
  } else {
    // Hide the error message
    errorMessage.style.display = "none";
  }

  // Get the email input field
  const emailInputField = document.getElementById("email");

  // Get the email error message element
  const invalidEmailErrorMessage = document.getElementById(
    "email-error-message"
  );

  // Check if the email input field exists
  if (emailInputField) {
    // Check if the email input field has a value
    if (emailInputField.value !== "") {
      // Ensure the email field is not empty
      // Validate the email address
      if (!validateEmail(emailInputField.value)) {
        // Check if the email is invalid
        // Add the "error" class to the parent element of the email input field
        emailInputField.parentNode.classList.add("error"); // Highlight the field as erroneous

        // Display the email error message
        invalidEmailErrorMessage.style.display = "flex"; // Show the error message
      } else {
        // Remove the "error" class from the parent element of the email input field
        emailInputField.parentNode.classList.remove("error"); // Remove error highlight

        // Hide the email error message
        invalidEmailErrorMessage.style.display = "none"; // Hide the error message
      }
    }
  }

  // Return true if the form is valid, false otherwise
  return emailInputField
    ? emptyFormFields.length === 0 && validateEmail(emailInputField.value) // If email field exists, check for empty fields and valid email
    : emptyFormFields.length === 0; // If no email field, only check for empty fields
};
