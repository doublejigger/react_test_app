/*eslint no-console: "off"*/
import Api from "../api/contacts";
import Notie from "notie";
import {
  routeToItem
} from "./app";

/**
 */
export const initReducer = () => {
  return ({
    type: "ACTIVE_COMPONENT_SET_ITEM",
    payload: {
      parent: "contact_new"
    }
  });
};

/**
 */
export const resetReducer = () => {
  return ({
    type: "CONTACT_NEW_REDUCER_RESET"
  });
};

/**
 * @param  {object} payload
 */
const setItem = (payload) => {
  return ({
    type: "CONTACT_NEW_SET_ITEM",
    payload
  });
};

/**
 * This function set the current new contact form data in the Redux reducer
 * @param  {} payload
 */
export const setForm = (payload) => {
  return ({
    type: "CONTACT_NEW_SET_FORM_DETAILS",
    payload
  });
};

/**
 * This function creates a new contact and navigate the browser to contact list view
 * @param  {} payload It may be populated with the new contact data
 */
export const commitForm = (payload) => {
  return (dispatch) => {
    return dispatch(createNew(payload)).then((response) => {
      dispatch(setItem(response));
      dispatch(routeToItem({
        model: "contacts",
        action: "list"
      }));
      return (response);
    }).catch(err => {
      console.error(err);
      return (err);
    });
  };
};

/**
 * This function navigate the browser to the contact list view
 * @returns {Promise} It returns a Promise payload, containing data or error info
 */
export const navigateToContactList = () => {
  return (dispatch) => {
    return dispatch(routeToItem({
      model: "contacts",
      action: "list"
    }));
  };
};

/**
 * This function saves a new contact to LocalStorage
 * @param  {object} payload (if not passed, it"ll be populated from Redux store)
 * @returns {Promise} It returns a Promise payload, containing data or error info
 */
const createNew = (payload) => {
  return (dispatch, getState) => {
    if (typeof payload === "undefined") {
      payload = getState().contact_new.contact;
    }
    const xhrPayload = Object.assign({}, {
      contact: payload
    });
    const utcDateTime = (new Date()).toISOString().slice(0, 19);
    xhrPayload.contact.created_at = utcDateTime;
    xhrPayload.contact.updated_at = utcDateTime;

    return Promise
      .resolve()
      .then(() => {
        return Api.createNew(xhrPayload);

      })
      .then(response => {
        Notie.alert({
          type: "success",
          text: "Contact created",
          time: 1.5
        });
        return (response);
      })
      .catch(error => {
        console.error(error);
        Notie.alert({
          type: "error",
          text: error.message,
          time: 3
        });
        return (error);
      });
  };
};

/**
 * Set country list options in Redux store
 * @param  {} payload
 */
const setOptionCountryList = (payload) => {
  return ({
    type: "CONTACT_NEW_SET_OPTION_COUNTRY_LIST",
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

      dispatch(setOptionCountryList(optionList));
      return (optionList);

    }).catch(error => {
      console.log(error);
      dispatch(setOptionCountryList([]));
      Notie.alert({
        type: "error",
        text: error.message,
        time: 3
      });
      return (error);
    });
  };
};