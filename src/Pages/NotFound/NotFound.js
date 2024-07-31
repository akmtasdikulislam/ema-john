import React from "react";
import Header from "../../components/Header/Header";

const NotFound = () => {
  return (
    <main>
      <Header />
      <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100 mt-5">
        <h1>404</h1>
        <h1>Not Found</h1>
      </div>
    </main>
  );
};

export default NotFound;
