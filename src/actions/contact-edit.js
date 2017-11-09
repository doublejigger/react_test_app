import Api from "../api/contacts";
import Notie from "notie";
import {routeToItem} from "./app";

/**
 * Set the active component Redux Reducer
 * @param  {string} id
 */
export const initReducer = (id) => {
  return ({
    type: "ACTIVE_COMPONENT_SET_ITEM",
    payload: {
      parent: "contact_edit",
      route: `/edit/${id}`
    }
  });
};

/**
 * Reset the Redux reducer
 */
export const resetReducer = () => {
  return ({
    type: "CONTACT_EDIT_REDUCER_RESET"
  });
};

/**
 * This function set the current new contact form data in the Redux reducer
 * @param  {} payload
 */
export const setForm = (payload) => {
  return ({type: "CONTACT_EDIT_SET_FORM_DETAILS", payload});
};

/**
 * This function creates a new contact and navigate the browser to contact list view
 * @param  {} payload It may be populated with the new contact data
 */
export const commitForm = (payload) => {
  return (dispatch) => {
    dispatch(updateContact(payload)).then(() => {
      //dispatch(routeToItem({model: "contacts", action: "list"}));
      return(true);
    }).catch(err => {
      console.error(err);
      return(err);
    });
  };
};

/**
 * This function navigate the browser to the contact list view
 * @returns {Promise} It returns a Promise payload, containing data or error info
 */
export const navigateToContactList = () => {
  return (dispatch) => {
    return dispatch(routeToItem({model:"contacts", action:"list"}));
  };
};

/**
 * @param  {object} payload
 */
const setItem = (payload) => {
  return ({
    type: "CONTACT_EDIT_SET_ITEM",
    payload
  });
};

/**
 * @param  {boolena} payload
 */
const setIsLoadingStatus = (payload) => {
  return ({
    type: "CONTACT_EDIT_SET_IS_LOADING_STATUS",
    payload
  });
};

/**
 * @param  {string} contactId
 */
export const loadContact = (contactId) => {
  return (dispatch, getState) => {
    const state = getState();
    const isLoading = state.contact_edit.is_loading;


    return Promise
      .resolve()
      .then(() => {
        if (isLoading === true) {
          return Promise.reject("Already loading the contact");
        }

        dispatch(setIsLoadingStatus(true));
        return Api.getById(contactId);

      })
      .then(response => {
        dispatch(setItem(response));
        dispatch(setIsLoadingStatus(false));
      })
      .catch(error => {
        console.error(error);
        dispatch(setIsLoadingStatus(false));
        dispatch(navigateToContactList());
      });
  };
};

/**
 * This function update the contact data into LocalStorage
 * @param  {object} payload (if not passed, it'll be populated from Redux store)
 * @returns {Promise} It returns a Promise payload, containing data or error info
 */
const updateContact = (payload) => {
  return (dispatch, getState) => {
    if (typeof payload === "undefined") { payload = getState().contact_edit.contact; }
    const xhrPayload = Object.assign({}, {contact: payload});
    const utcDateTime = (new Date()).toISOString().slice(0, 19);
    xhrPayload.contact.updated_at = utcDateTime;

    return Promise
      .resolve()
      .then(() => {
        return Api.updateById(payload.id, xhrPayload);

      })
      .then(response => {
        Notie.alert({type: "success", text: "Contact updated", time: 1.5});
        dispatch(setItem(xhrPayload.contact));
        dispatch(routeToItem({model: "contacts", action: "list"}));
        return (response);
      })
      .catch(error => {
        console.error(error);
        Notie.alert({type: "error", text: error.message, time: 3});
        return (error);
      });
  };
};

/**
 * Set country list options in Redux store
 * @param  {object} payload
 */
const setOptionCountryList = (payload) => {
  return ({
    type: "CONTACT_EDIT_SET_OPTION_COUNTRY_LIST",
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
      if (response == null) { throw new Error("There are no country data"); }
      if (response.length < 1) { throw new Error("There are no country data"); }

      const optionList = response.countryArray.map(x => {
        return {
          value: x.code,
          label: x.name
        };
      });

      dispatch(setOptionCountryList(optionList));
      return (optionList);

    }).catch(err => {
      console.log(err);
      dispatch(setOptionCountryList([]));
      Notie.alert({type: "error", text: err.message, time: 3});
      return (err);
    });
  };
};