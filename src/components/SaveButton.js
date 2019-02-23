import React from "react";

const SaveButton = props => {
  return (
    <div>
      <button
        style={{
          color: "rgb(63, 130, 195)",
          fontSize: "30px",
          border: "2px solid rgb(63, 130, 195)",
          padding: "10px",
          margin: "20px"
        }}
        onClick={props.saveToDatabase}
      >
        Save
      </button>
    </div>
  );
};

export default SaveButton;
