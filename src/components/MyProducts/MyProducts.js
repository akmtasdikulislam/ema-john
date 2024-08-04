import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { formatNumber } from "../../functions/formatNumber";
import NotFoundErrorMessage from "../NotFoundErrorMessage/NotFoundErrorMessage";
import ProductRecordRow from "../ProductRecordRow/ProductRecordRow";

const MyProducts = ({
  myProducts,
  setFeatures,
  setProduct,
  setUpdateProduct,
}) => {
  return (
    <div className="my-products">
      <h3>
        My Products{" "}
        <span className="small-text">
          (Total: {formatNumber(myProducts.length)})
        </span>
      </h3>

      {myProducts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((item, index) => (
              <ProductRecordRow
                key={index}
                productDetails={item}
                setFeatures={setFeatures}
                setProduct={setProduct}
                setUpdateProduct={setUpdateProduct}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <NotFoundErrorMessage erroMessage={"You have added no products yet"}>
          <FontAwesomeIcon className="icon" icon={faBoxOpen} />
        </NotFoundErrorMessage>
      )}
    </div>
  );
};

export default MyProducts;
