import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { openModal } from "../../Pages/Inventory/Inventory";
import { scrollToTop } from "../../functions/scrollToTop";

const ProductRecordRow = ({
  productDetails,
  setProduct,
  setFeatures,
  setUpdateProduct,
}) => {
  const { img, name, price, star, stock } = productDetails;
  return (
    <tr>
      <td>
        <div className="product-name-image">
          <img src={img} alt={name} />
          <p>{name}</p>
        </div>
      </td>
      <td className="price">$ {price}</td>
      <td>{star} / 5</td>
      <td>{stock}</td>
      <td>
        <div className="actions">
          <button
            className="add-button"
            onClick={() => {
              setProduct(productDetails);
              setFeatures(productDetails.features);
              setUpdateProduct(true);
              scrollToTop();
            }}
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button className="delete-button" onClick={() => openModal()}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProductRecordRow;
