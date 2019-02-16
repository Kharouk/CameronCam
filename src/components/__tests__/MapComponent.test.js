import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MapComponent from "../MapComponent";
Enzyme.configure({ adapter: new Adapter() });

it("renders the google maps", () => {
  const div = document.createElement("div");
  expect(div).toMatch("sddd");
});
