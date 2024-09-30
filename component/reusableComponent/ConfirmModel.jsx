import React from "react";

const ConfirmModel = ({ show, onConfirm, onCancel, message, loading }) => {
  if (!show) return null; // Do not render the popup if show is false

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h6>{message}</h6>
        <div style={styles.buttons}>
          <button onClick={onConfirm} style={styles.confirmButton} disabled={loading}>
            {loading&&<div className="spinner-border me-2" style={{width:"15px",height:"15px"}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>}
            Yes
          </button>
          <button onClick={onCancel} style={styles.cancelButton}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  buttons: {
    marginTop: "20px",
  },
  confirmButton: {
    backgroundColor: "var(--adminMainColor)",
    color: "#fff",
    border: "none",
    padding: "2px 20px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#db5858",
    color: "#fff",
    border: "none",
    padding: "2px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ConfirmModel;
