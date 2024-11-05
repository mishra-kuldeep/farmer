import React from "react";

const MediumLoader = () => {
  return (
    <div
      style={{ height: "200px", width: "100%" }}
      className="centerAllDiv"
    >
      <div
        class="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default MediumLoader;
