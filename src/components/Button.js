import React from "react";

const Button = props => {
  let color, onClick, text;
  if (props.isSaveButton) {
    color = "rgb(63, 130, 195)";
    onClick = props.saveToDatabase;
    text = "Save";
  } else {
    color = "rgb(195, 50, 95)";
    onClick = props.deleteFromDatabase;
    text = "Delete";
  }
  return (
    <div>
      <button
        style={{
          color,
          fontSize: "30px",
          border: `2px solid ${color}`,
          padding: "10px",
          margin: "20px"
        }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
