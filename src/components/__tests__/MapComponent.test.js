import React from "react";
import ReactDOM from "react-dom";
import MapComponent from "../MapComponent";

it("renders the google maps", () => {
  const div = document.createElement("div");
  ReactDOM.(<MapComponent/>, div);
  expect(div).toMatch("sddd");
  )

});
