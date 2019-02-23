import React from "react";

const DeleteButton = props => {
  return (
    <div>
      <button
        style={{
          color: "rgb(195, 50, 95)",
          fontSize: "30px",
          border: "2px solid rgb(195, 50, 95)",
          padding: "10px",
          margin: "20px"
        }}
        onClick={props.deleteFromDatabase}
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
