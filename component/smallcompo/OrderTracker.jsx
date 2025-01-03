import React from "react";
import "./tracker.css"; // Create this CSS file for styles

const OrderTracker = ({ status }) => {
    // 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'
  // Define order statuses
  const steps = ['Pending', 'Payment','Processing', 'Shipped', 'Delivered', 'Cancelled'];

  // Get the index of the current status to highlight the correct step
  const currentStepIndex = steps.indexOf(status);

  return (
  <div className="w-100 overflow-auto">
      <div className="order-tracker">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index <= currentStepIndex ? "active" : ""}`}
        >
          <div className="step-circle">{index + 1}</div>
          <p className= {`step-label mx-4 ${index <= currentStepIndex ? "fw-bold text-success" : ""}`}>{step}</p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default OrderTracker;
