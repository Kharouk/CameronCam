import React from "react";

const styles = {
  textAlign: "center",
  width: "200px",
  fontSize: "2rem",
  font: "inherit",
  color: "#333",
  boxShadow: "0 6px 10px 0 rgba(0, 0, 0 , .1)",
  border: "1px solid #333",
  outline: "none",
  padding: "10px 18px",
  margin: "10px"
};

const Description = props => {
  return (
    <div>
      <input
        style={styles}
        placeholder="Enter a Description"
        onChange={e => props.handleChange(e)}
      />
    </div>
  );
};

export default Description;
