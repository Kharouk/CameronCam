import React from "react";
import { mount } from "enzyme";
import Header from "../Header";
it("renders the gif image", () => {
  const wrapper = mount(
    <Header
    />
  );
  const item = '<img id=\"cameron-logo\"'
  expect(wrapper.html()).toContain(item);
});
