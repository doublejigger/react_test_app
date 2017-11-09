/*eslint no-console: "off"*/
import Api from "../api/contacts";
import Notie from "notie";
import {
  routeToItem
} from "./app";


/**
 */
export const initReducer = () => {
  return {
    type: "ACTIVE_COMPONENT_SET_ITEM",
    payload: {
      parent: "contact_list",
      route: "/"
    }
  };
};

/**
 */
export const reducerReset = () => {
  return ({
    type: "USERS_LIST_REDUCER_RESET"
  });
};

/**
 * @param  {object} filters
 */
export const setFilters = (filters) => {
  return dispatch => {
    dispatch({
      type: "USERS_LIST_SET_FILTERS",
      payload: filters
    });
    dispatch(loadContactList());
  };
};

/**
 */
export const resetFilters = () => {
  return dispatch => {
    dispatch({
      type: "USERS_LIST_FILTERS_RESET"
    });
    dispatch(loadContactList());
  };
};

/**
 * @param  {object} pagination
 */
export const setPagination = (pagination) => {
  return dispatch => {

    return Promise
      .resolve()
      .then(() => {
        dispatch({
          type: "USERS_LIST_SET_PAGINATION",
          payload: pagination
        });
        return dispatch(loadContactList());

      })
      .catch(error => {
        console.error(error);
        return false;
      });
  };
};
/**
 * @param  {integer} id
 */
export const setSelectionSingle = (id) => {
  return ({
    type: "CONTACT_LIST_SELECT_SINGLE",
    id
  });
};

/**
 * @param  {string} selectionType
 */
export const setSelectionBulk = (selectionType) => {
  return ({
    type: "CONTACT_LIST_SELECT_BULK",
    selectionType
  });
};

/**
 * This function navigate the browser to the edit contact view
 * @returns {Promise} It returns a Promise payload, containing data or error info
 */
export const navigateToEditContactById = (itemId) => {
  return (dispatch) => {
    return dispatch(routeToItem({
      model: "contacts",
      action: "edit",
      id: itemId
    }));
  };
};


/**
 * @param  {object} xhrPayload
 */
export const setItems = (xhrPayload) => {
  return ({
    type: "USERS_LOAD_LIST",
    payload: xhrPayload
  });
};

/**
 * @param  {boolean} status
 */
export const setIsLoadingStatus = (status) => {
  return ({
    type: "USERS_LOAD_SET_IS_LOADING_STATUS",
    payload: status
  });
};

/**
 */
export const loadContactList = () => {
  return (dispatch, getState) => {
    const state = getState();
    const isLoading = state.contact_list.is_loading;
    let xhrFilterParams = {
      filters: state.contact_list.filters,
      pagination: state.contact_list.pagination
    };

    return Promise
      .resolve()
      .then(() => {
        if (isLoading === true) {
          return Promise.reject("Already loading the list");
        }

        dispatch(setIsLoadingStatus(true));
        return Api.getList(xhrFilterParams);

      })
      .then(response => {
        dispatch(setItems(response));
        dispatch(setIsLoadingStatus(false));
      })
      .catch(error => {
        console.error(error);
        dispatch(setIsLoadingStatus(false));
      });
  };
};

/**
 */
export const loadMore = () => {
  return (dispatch, getState) => {
    const state = getState(),
      listMatches = state.cotact_list.matches,
      isLoading = state.cotact_list.is_loading;

    return Promise
      .resolve()
      .then(() => {
        if (isLoading === true) {
          return Promise.reject("Already loading the list")
        }

        let pagination = Object.assign({}, state.cotact_list.pagination);
        if (listMatches < 1) {
          return;
        }

        pagination.limit += pagination.loadMore;

        if (pagination.limit > listMatches)
          pagination.limit = listMatches;

        return dispatch(setPagination(pagination));

      })
      .then(response => {
        return response;

      })
      .catch(error => {
        console.error(error);
        return (false);
      });
  };
};
/**
 */
export const createNewItem = () => {
  return (dispatch) => {
    dispatch(routeToItem({
      model: "contacts",
      action: "new"
    }));
  };
};

/**
 * @param  {integer} contactId
 */
export const deleteContact = (contactId) => {
  return (dispatch) => {

    return Api.deleteContact(contactId).then(() => {
      Notie.alert({
        type: "success",
        text: "The contact was deleted",
        time: 1.5
      });
      return dispatch(loadContactList());

    }).then(() => {
      return (true);

    }).catch(error => {
      console.error(error);
      Notie.alert({
        type: "error",
        text: error.message,
        time: 3
      });
      return (false);
    });
  };
};

/**
 */
export const deleteContactList = () => {
  return (dispatch, getState) => {
    let gotItems = getState().contact_list.items;
    let idListToDelete = [];

    for (let i = 0; i < gotItems.length; i++) {
      if (gotItems[i]._checked === true) {
        idListToDelete.push(gotItems[i].id);
      }
    }


    Promise.resolve().then(() => {
      if (idListToDelete.length < 1) {
        throw new Error("No contact selected");
      }
      return Api.deleteContactList({
        ids: idListToDelete
      });

    }).then(response => {
      Notie.alert({
        type: "success",
        text: `${response} contact${(response>1) ? "s were":" was"} deleted`,
        time: 1.5
      });
      return dispatch(loadContactList());

    }).then(() => {
      return (true);

    }).catch(error => {
      console.error(error);
      Notie.alert({
        type: "error",
        text: error.message,
        time: 3
      });
      return (false);
    });
  };
};

/**
 * Set country list options in Redux store
 * @param  {} payload
 */
const setOptionCountryList = (payload) => {
  return ({
    type: "CONTACT_LIST_SET_OPTION_COUNTRY_LIST",
    payload
  });
};

/**
 * Load country list options as an array and dispatch the Redux store set action
 * @returns {Promise} It returns a Promise payload, containing data or error info
 */
export const loadCountryList = () => {
  return (dispatch) => {

    return Api.getCountryList().then(response => {
      if (response == null) {
        throw new Error("There are no country data");
      }
      if (response.length < 1) {
        throw new Error("There are no country data");
      }

      const optionList = response.countryArray.map(x => {
        return {
          value: x.code,
          label: x.name
        };
      });

      dispatch(setOptionCountryList({
        countryArray: optionList,
        countryHash: response.countryHash
      }));
      return (optionList);

    }).catch(error => {
      console.log(error);
      dispatch(setOptionCountryList([]));
      //Notie.alert({type: "error", text: error.message, time: 3});
      return (error);
    });
  };
};