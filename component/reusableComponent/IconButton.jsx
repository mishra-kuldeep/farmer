import React from "react";

const IconButton = ({ children ,onClick}) => {
  return (
    <div
      style={{
        backgroundColor: "#ddd",
        padding: "6px",
        borderRadius: "50%",
        cursor: "pointer",
        height:"30px",
        width:"30px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconButton;
