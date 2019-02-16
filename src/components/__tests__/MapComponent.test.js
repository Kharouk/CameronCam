import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MapComponent from "../MapComponent";

Enzyme.configure({ adapter: new Adapter() });
const url = " http://www.google.com"
it("renders the google maps", () => {
  const wrapper = mount(<MapComponent loadingElement={<div style={{ height: `100%` }} />} googleMapURL={url}/>)
  expect(wrapper.props().googleMapURL).toEqual(url)
});
