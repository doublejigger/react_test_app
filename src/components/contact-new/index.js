import {connect} from "react-redux";
import New from "./new";
import {
  initReducer,
  resetReducer,
  setForm,
  commitForm,
  loadCountryList,
  navigateToContactList
} from "../../actions/contact-new";

const mapStateToProps = (state) => {
  return ({
    contact: state.contact_new.contact,
    errors: state.contact_new.errors,
    invalid: state.contact_new.invalid,
    options: state.contact_new.options,
    isFormPristine: state.contact_new.isFormPristine
  });
};

const mapDispatchToProps = (dispatch) => {
  return ({
    initReducer: () => {
      dispatch(initReducer());
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
    loadCountryList: () => {
      return dispatch(loadCountryList());
    },
    navigateToContactList: () => {
      return dispatch(navigateToContactList());
    }
  });
};

const NewRx = connect(mapStateToProps, mapDispatchToProps)(New);

export default NewRx;