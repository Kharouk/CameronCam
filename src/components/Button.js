import React from "react";

let color, onClick, text;

const Button = props => {
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
          border: `2px solid ${color}`
        }}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
