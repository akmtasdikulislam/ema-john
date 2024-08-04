import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { formatNumber } from "../../functions/formatNumber";
import NotFoundErrorMessage from "../NotFoundErrorMessage/NotFoundErrorMessage";
import OrderRecordRow from "../OrderRecordRow/OrderRecordRow";

const MyOrders = ({ orders }) => {
  return (
    <div className="orders">
      <h3>
        Orders{" "}
        <span className="small-text">
          (Total: {formatNumber(orders.length)})
        </span>
      </h3>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Order No</th>
              <th>Quantity</th>
              <th>Order Placed on</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <OrderRecordRow key={index} product={order} />
            ))}
          </tbody>
        </table>
      ) : (
        <NotFoundErrorMessage erroMessage={"You have currently no orders"}>
          <FontAwesomeIcon className="icon" icon={faBoxOpen} />
        </NotFoundErrorMessage>
      )}
    </div>
  );
};

export default MyOrders;
