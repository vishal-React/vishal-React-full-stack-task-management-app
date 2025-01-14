import React from "react";
import "./History.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useOrderHistory } from "../../OrderHistoryContext";

const OrderHistory = () => {
  const { orderHistory } = useOrderHistory();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="order-history">
        <h2 className="hiscenter">Order History</h2>
        {orderHistory.length === 0 ? (
          <h4 className="hiscenter hei">No orders placed yet.</h4>
        ) : (
          orderHistory.map((order) => (
            <div key={order.orderId} className="order-detail">
              <h3>Order ID: {order.orderId}</h3>
              <p>
                <strong>Order Date:</strong> {order.orderDate}
              </p>
              <p>
                <strong>Order Status:</strong> Pending
              </p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} className="liDot">
                    <h6 className="titleBold">
                      {item.alt_description} (x{item.quantity}) - ₹{item.price}
                    </h6>
                  </li>
                ))}
              </ul>
              <p className="bottomBorder">
                <strong>Total Price:</strong> ₹{order.calculateTotalPrice}
              </p>
            </div>
          ))
        )}
      </div>
      {/* back button to home page */}
      <div className={orderHistory.length === 0 ? "hiscenter" : "slightLeft"}>
        <button className="backbtn" onClick={handleBack}>
          <div className="default-btn">
            <svg
              className="css-i6dzq1"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              strokeWidth={2}
              stroke="#FFF"
              height={20}
              width={20}
              viewBox="0 0 24 24"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle r={3} cy={12} cx={12} />
            </svg>
            <span>
              {" "}
              {orderHistory.length === 0 ? "Quick View" : "View Menu"}
            </span>
          </div>
          <div className="hover-btn">
            <svg
              className="css-i6dzq1"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              strokeWidth={2}
              stroke="#ffd300"
              height={20}
              width={20}
              viewBox="0 0 24 24"
            >
              <circle r={1} cy={21} cx={9} />
              <circle r={1} cy={21} cx={20} />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span>Shop Now</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default OrderHistory;
