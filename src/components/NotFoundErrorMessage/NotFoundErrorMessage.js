/** React related imports */
import React from 'react'; // Import React to enable JSX syntax and create functional components

/**
 * NotFoundErrorMessage Component
 *
 * This component is used to display a custom error message when a resource is not found.
 * It provides a flexible way to show error information with optional additional content.
 *
 * @param {ReactNode} children - Optional. Any additional content to be rendered within the component.
 * @param {string} errorMessage - The main error message to be displayed.
 * @param {string} remarks - Optional. Additional remarks or instructions related to the error.
 * @param {ReactNode} dynamicContent - Optional. Any dynamic content that needs to be rendered within the error message.
 *
 * @returns {JSX.Element} A formatted error message component.
 */
const NotFoundErrorMessage = ({
  children,
  errorMessage,
  remarks,
  dynamicContent,
}) => {
  return (
    <div className="not-found-error-message">
      {children}
      <p>{errorMessage}</p>
      <p>{remarks && remarks}</p>
      {dynamicContent && (
        <div className="dynamic-content">{dynamicContent}</div>
      )}
    </div>
  );
};

export default NotFoundErrorMessage;
