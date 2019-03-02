import React from "react";

const Description = props => {
  return (
    <div>
      <input onChange={e => props.handleChange(e)} />
    </div>
  );
};

export default Description;
