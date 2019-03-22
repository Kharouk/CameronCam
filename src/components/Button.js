import React from "react";

let color, onClick, text, margin;

const Button = props => {
  if (props.isSaveButton) {
    color = "rgb(63, 130, 195)";
    onClick = props.saveToDatabase;
    margin = "0";
    text = "Save";
  } else {
    color = "rgb(195, 50, 95)";
    margin = "10%";
    onClick = props.deleteFromDatabase;
    text = "Delete";
  }

  return (
    <div>
      <button
        style={{
          color,
          fontSize: "30px",
          marginTop: `${margin}`,
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
