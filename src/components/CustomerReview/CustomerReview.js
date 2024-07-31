import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import displayPhoto from "../../assets/images/demo-dp.png";
import { showRatingStars } from "../Product/Product";

const CustomerReview = () => {
  return (
    <div className="customer-review">
      <div className="row">
        <div className="display-photo">
          <img src={displayPhoto} alt="" />
        </div>
        <div className="col">
          <p className="name">Akm Tasdikul Islam</p>
          <div className="rating">
            <p>
              {showRatingStars("4").map(
                (ratingStarType) =>
                  // eslint-disable-next-line eqeqeq
                  ratingStarType == "filled" ? (
                    // If the ratingStarType is "filled" then a "filled" star is rendered.
                    <FontAwesomeIcon
                      key={ratingStarType + Math.random() * 99}
                      className="filled-stars"
                      icon={faStar}
                    />
                  ) : (
                    // Else if the ratingStarType is "empty" then a "empty" star is rendered.
                    <FontAwesomeIcon
                      key={ratingStarType + Math.random() * 99}
                      className="empty-stars"
                      icon={faStar}
                    />
                  )
                // NOTE: We're distinguishing between "filled" and "empty" stars by using CSS depending on their class names.
              )}
              <span className="ms-3">4/5</span>
            </p>
            <p className="date">3 days ago</p>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          laborum laboriosam inventore exercitationem eos nihil corrupti totam
          perferendis? Eaque pariatur a necessitatibus dolorum, placeat incidunt
          laudantium quia voluptatem tempore dolor.
        </p>
      </div>
    </div>
  );
};

export default CustomerReview;
