/*eslint no-undef: "off"*/
import * as React from "react";
import ContactEdit from "../edit";

import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});
import {shallow} from "enzyme";

const testProps = {
  contact: {
    first_name: "John",
    last_name: "Smith",
    email: "john.smith@gmail.com",
    country_id: "UK"
  },
  errors: {},
  invalid: {},
  options: {},
  isFormPristine: true,
  match: {
    params: {
      contactId: "2f63a7dc-718f-4a11-bfc9-a58cf43f7528"
    }
  },
  initReducer: function () {},
  loadContact: function () {},
  loadCountryList: function () {},
  history: {
    block: function () {}
  }
};

test("Contact edit view should render without throwing an error", () => {
  const wrapper = shallow(<ContactEdit
    contact={testProps.contact}
    errors={testProps.errors}
    options={testProps.options}
    isFormPristine={testProps.isFormPristine}
    initReducer={testProps.initReducer}
    loadContact={testProps.loadContact}
    loadCountryList={testProps.loadCountryList}
    history={testProps.history}
    match={testProps.match}/>);


  expect(wrapper.find(".form-group").length).toBe(4);
  expect(wrapper.find(".form-group label").at(0).text()).toBe("First name");
  expect(wrapper.find(".form-group label").at(1).text()).toBe("Last name");
  expect(wrapper.find(".form-group label").at(2).text()).toBe("Email");
  expect(wrapper.find(".form-group label").at(3).text()).toBe("Country");
});