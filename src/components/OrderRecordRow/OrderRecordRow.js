import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { generateOrderID } from "../../Pages/Inventory/Inventory";

const OrderRecordRow = ({ product }) => {
  const { img, name } = product;
  return (
    <tr>
      <td>
        <div className="product-name-image">
          <img src={img} alt={name} />
          <p>{name}</p>
        </div>
      </td>
      <td className="order-id">#{generateOrderID()}</td>
      <td>03</td>
      <td>{new Date().toLocaleDateString("en-uk")}</td>
      <td>
        <div className="actions">
          <button className="done-button">
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default OrderRecordRow;
