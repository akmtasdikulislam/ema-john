import React from "react";

const FeatureInputField = () => {
  return (
    <div className="row feature">
      <div className="col-6">
        <fieldset>
          <input
            type="text"
            name="feature-name"
            id="feature-name"
            placeholder="Enter product feature name"
          />
          <label htmlFor="feature-name">Feature Name</label>
        </fieldset>
      </div>
      <div className="col-6">
        <fieldset>
          <input
            type="text"
            name="feature-description"
            id="feature-description"
            placeholder="Enter product feature description"
          />
          <label htmlFor="feature-description">Feature Description</label>
        </fieldset>
      </div>
    </div>
  );
};

export default FeatureInputField;
