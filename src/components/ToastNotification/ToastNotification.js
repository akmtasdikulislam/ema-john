/** React related imports **/
import React, { useContext, useEffect, useState } from "react";
// Import React and hooks for state management, side effects, and context consumption

import PropTypes from "prop-types";
// Import PropTypes for type-checking component props

/** UI and Icon related imports **/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Import FontAwesomeIcon component for rendering icons

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
// Import specific icon (faCircleXmark) for the close button in the notification

/** Context related imports **/
import { AppDataContext } from "../../App";
// Import AppDataContext to access global app state and functions (e.g., removeToast)

const ToastNotification = ({
  id,
  type,
  title,
  message,
  time,
  dynamicContent,
}) => {
  // Define the ToastNotification component, which accepts the following props:
  // - id: unique identifier for the toast notification
  // - type: type of toast notification (e.g. success, error, warning)
  // - title: title of the toast notification
  // - message: message content of the toast notification
  // - time: duration of the toast notification in milliseconds
  // - dynamicContent: dynamic content to be rendered inside the toast notification

  // Tasks performed by ToastNotification:
  // • Render the toast notification with the provided props
  // • Handle the removal of the toast notification after the specified time
  // • Provide a close button to manually remove the toast notification

  const { removeToast } = useContext(AppDataContext);
  // Get the removeToast function from the AppDataContext, which is used to remove the toast notification from the app state.

  const timeoutDuration = time || 5000;
  // Set the timeout duration for the toast notification, defaulting to 5000ms if not provided.

  const [isVisible, setIsVisible] = useState(true);
  // Initialize a state variable to track the visibility of the toast notification, defaulting to true.

  useEffect(() => {
    // Define an effect to handle the removal of the toast notification after the specified time.
    const timer = setTimeout(() => setIsVisible(false), timeoutDuration);
    // Set a timer to set the isVisible state to false after the specified time.
    return () => clearTimeout(timer);
    // Clean up the timer when the component is unmounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Define an effect to handle the removal of the toast notification when it is no longer visible.
    if (!isVisible) {
      removeToast(id);
      // Call the removeToast function to remove the toast notification from the app state.
    }
  }, [isVisible, id, removeToast]);

  if (!isVisible) return null;
  // If the toast notification is not visible, return null to prevent rendering.

  // Render the toast notification with the provided props.
  return (
    // Create a div element to render the toast notification
    <div
      // Dynamically set the class name based on the type of notification
      // The type is converted to lowercase to ensure consistency in styling
      className={`toast-notification ${type.toLowerCase()}`}
      // Set the role attribute to "alert" to announce the notification to screen readers
      role="alert"
      // Set the aria-live attribute to "assertive" to indicate that the notification is important and should be announced immediately
      aria-live="assertive"
      // Set the style attribute to define the animation properties
      style={{
        // Define the animation property with two animations: fadeIn and fadeOut
        // The fadeIn animation lasts for 0.5 seconds, and the fadeOut animation starts after the specified timeoutDuration minus 250 milliseconds
        animation: `fadeIn 0.5s, fadeOut 0.5s ${timeoutDuration - 250}ms`,
      }}
    >
      {/* Create a child div element to render the timer bar */}
      <div
        // Set the class name to "timer-bar" for styling purposes
        className="timer-bar"
        // Set the style attribute to define the animation duration
        style={{
          // Set the animation duration to the specified timeoutDuration
          animationDuration: `${timeoutDuration}ms`,
        }}
      ></div>
      {/* Render the title of the toast notification. */}
      <p className="toast-title">{title}</p>
      {/* Render the message content of the toast notification. */}
      <p className="toast-message">{message}</p>
      {/* Render any dynamic content provided. */}
      {dynamicContent && (
        <div className="dynamic-content">{dynamicContent}</div>
      )}
      {/* Render a close button with the faCircleXmark icon, which sets the isVisible state to false when clicked. */}
      <button
        className="close-button"
        onClick={() => {
          setIsVisible(false);
        }}
        aria-label={`Close ${type} message`}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
    </div>
  );
};

// Define the prop types for the ToastNotification component
ToastNotification.propTypes = {
  // id prop is required and must be a number
  id: PropTypes.number.isRequired,

  // type prop is required and must be one of the specified strings
  type: PropTypes.oneOf(["success", "error", "warning", "info"]).isRequired,

  // title prop is required and must be a string
  title: PropTypes.string.isRequired,

  // message prop is optional and can be a string
  message: PropTypes.string,

  // dynamicContent prop is optional and can be one of the following types:
  dynamicContent: PropTypes.oneOfType([
    // a string
    PropTypes.string,
    // a React node (e.g. a JSX element)
    PropTypes.node,
    // a function
    PropTypes.func,
  ]),
};

export default ToastNotification;
