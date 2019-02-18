import React from "react";
import { mount } from "enzyme";
import MapComponent from "../MapComponent";
import FirebaseMock from "../__mocks__/FirebaseMock";
const url = " http://www.google.com";
it("renders the google maps", () => {
  const wrapper = mount(
    <MapComponent
      db={FirebaseMock}
      loadingElement={<div style={{ height: `100%` }} />}
      googleMapURL={url}
    />
  );
  expect(wrapper.props().googleMapURL).toEqual(url);
});
