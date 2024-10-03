// ** React related imports **
import React from "react"; // Import React for creating React components

// ** FontAwesome related imports **
import { faStar } from "@fortawesome/free-solid-svg-icons"; // Import the star icon for rating display
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon component for rendering icons

// ** Utility function import **
import { formatDate } from "../../functions/formatDate"; // Import function to format date strings
import { showRatingStars } from "../../functions/showRatingStars"; // Import function to generate rating star array

const CustomerReview = ({ review }) => {
  // Destructure properties from the 'review' object for easy access within the component
  const { customerName, customerPhotoURL, rating, reviewDate, reviewText } =
    review;
  return (
    <div className="customer-review">
      <div className="row">
        <div className="display-photo">
          <img src={customerPhotoURL} alt="" />
        </div>
        <div className="col">
          <p className="name">{customerName}</p>
          <div className="rating">
            <p>
              {showRatingStars(rating).map(
                (ratingStarType, index) =>
                  // eslint-disable-next-line eqeqeq
                  ratingStarType == "filled" ? (
                    // If the ratingStarType is "filled" then a "filled" star is rendered.
                    <FontAwesomeIcon
                      key={index}
                      className="filled-stars"
                      icon={faStar}
                    />
                  ) : (
                    // Else if the ratingStarType is "empty" then a "empty" star is rendered.
                    <FontAwesomeIcon
                      key={index}
                      className="empty-stars"
                      icon={faStar}
                    />
                  )
                // NOTE: We're distinguishing between "filled" and "empty" stars by using CSS depending on their class names.
              )}
              <span className="rating-count ms-3">{rating}/5</span>
            </p>
            <p className="date">{formatDate(reviewDate)}</p>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <p>{reviewText}</p>
      </div>
    </div>
  );
};

export default CustomerReview;
