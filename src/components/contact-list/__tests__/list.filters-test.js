/*eslint no-undef: "off"*/
import * as React from "react";
import Filters from "../list.filters";

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});
import {shallow} from "enzyme";

const testProps = {
  list: {
    results: 0,
    matches: 0,
    filters: {
      first_name: "",
      last_name: "",
      email: "",
      country_id: null
    },
    options: []
  },
  setFilters: function () {},
  resetFilters: function () {}
};

test("Contact list filters should render without throwing an error", () => {
  const wrapper = shallow(<Filters
    list={testProps.list}
    setFilters={testProps.setFilters}
    resetFilters={testProps.resetFilters}/>);

  expect(wrapper.find("#contactListFilterTitle").text()).toBe("Filters");
  expect(wrapper.find(".form-group").length).toBe(4);
  expect(wrapper.find(".form-group label").at(0).text()).toBe("First name");
  expect(wrapper.find(".form-group label").at(1).text()).toBe("Last name");
  expect(wrapper.find(".form-group label").at(2).text()).toBe("Email");
  expect(wrapper.find(".form-group label").at(3).text()).toBe("Countries");
});