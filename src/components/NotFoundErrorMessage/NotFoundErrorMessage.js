import React from "react";

const NotFoundErrorMessage = ({ children, erroMessage, remarks }) => {
  return (
    <div className="error-message">
      {children}
      <p>{erroMessage}</p>
      <p>{remarks && remarks}</p>
    </div>
  );
};

export default NotFoundErrorMessage;
