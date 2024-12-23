import React from "react";

const MediumLoader = () => {
  return (
    <div
      style={{ height: "200px", width: "100%" }}
      className="centerAllDiv"
    >
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default MediumLoader;
