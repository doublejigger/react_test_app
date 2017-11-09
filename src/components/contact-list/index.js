import {
  connect
} from "react-redux";
import List from "./list";
import * as Actions from "../../actions/contact-list";

const mapStateToProps = (state) => {
  return ({
    list: state.contact_list
  });
};
const mapDispatchToProps = (dispatch) => {
  return ({
    initReducer: () => {
      dispatch(Actions.initReducer());
    },
    resetReducer: () => {
      dispatch(Actions.reducerReset());
    },
    loadList: () => {
      dispatch(Actions.loadContactList());
    },
    loadMore: () => {
      dispatch(Actions.loadMore());
    },
    createNewItem: () => {
      dispatch(Actions.createNewItem());
    },
    setSelectionSingle: (itemId) => {
      dispatch(Actions.setSelectionSingle(itemId));
    },
    setSelectionBulk: (selectionType) => {
      dispatch(Actions.setSelectionBulk(selectionType));
    },
    deleteContactList: () => {
      return dispatch(Actions.deleteContactList());
    },
    deleteContact: (contactId) => {
      return dispatch(Actions.deleteContact(contactId));
    },
    setFilters: (prmFilters) => {
      dispatch(Actions.setFilters(prmFilters));
    },
    resetFilters: () => {
      dispatch(Actions.resetFilters());
    },
    loadCountryList: () => {
      return dispatch(Actions.loadCountryList());
    }
  });
};

const ListRx = connect(mapStateToProps, mapDispatchToProps)(List);

export default ListRx;