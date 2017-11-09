import {connect} from "react-redux";
import ContactEdit from "./edit";
import {
  initReducer,
  resetReducer,
  setForm,
  commitForm,
  loadContact,
  loadCountryList,
  navigateToContactList
} from "../../actions/contact-edit";

const mapStateToProps = (state) => {
  return ({
    contact: state.contact_edit.contact,
    errors: state.contact_edit.errors,
    invalid: state.contact_edit.invalid,
    options: state.contact_edit.options,
    isFormPristine: state.contact_edit.isFormPristine
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    initReducer: (id) => {
      dispatch(initReducer(id));
    },
    resetReducer: () => {
      dispatch(resetReducer());
    },
    setForm: (payload) => {
      dispatch(setForm(payload));
    },
    commitForm: () => {
      dispatch(commitForm());
    },
    loadContact: (contactId) => {
      return dispatch(loadContact(contactId));
    },
    loadCountryList: () => {
      return dispatch(loadCountryList());
    },
    navigateToContactList: () => {
      return dispatch(navigateToContactList());
    }
  });
};

const ContactEditRx = connect(mapStateToProps, mapDispatchToProps)(ContactEdit);

export default ContactEditRx;