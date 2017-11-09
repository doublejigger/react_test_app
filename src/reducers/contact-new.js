import isEqual from "lodash.isequal";

/**
 * Contact new reducer function
 * @param  {object} state Current Redux Reducer State
 * @param  {object} action Current Action to be processed
 */
export default (state, action) => {
  const resetReducer = () => {
    return ({
      contact: {
        first_name: "",
        last_name: "",
        email: "",
        country_id: ""
      },
      _contact: {
        first_name: "",
        last_name: "",
        email: "",
        country_id: ""
      },
      isFormPristine: true,
      options: {
        countries: []
      },
      errors: {
        first_name: true,
        last_name: true,
        email: true,
        form: true
      },
      invalid: {
        first_name: false,
        last_name: false,
        email: false
      },
      unset: {}
    });
  };

  const validateDetailForm = (Contact) => {
    let tmpErrors = Object.assign({}, {
      first_name: true,
      last_name: true,
      email: true,
      country_id: true,
      form: true
    });

    let tmpInvalid = Object.assign({}, {
      first_name: Contact.first_name === "",
      last_name: Contact.last_name === "",
      email: Contact.email === "",
    });

    if ((Contact.first_name) && (Contact.first_name.length > 0)) {
      tmpErrors.first_name = false;
    }

    if ((Contact.last_name) && (Contact.last_name.length > 0)) {
      tmpErrors.last_name = false;
    }

    if (Contact.email) {
      if (Contact.email.length > 0) {
        if (/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/.test(Contact.email))
          tmpErrors.email = tmpInvalid.email = false;
        else
          tmpErrors.email = tmpInvalid.email = true;
      }
    }

    if ((Contact.country_id != null) && (Contact.country_id != "")) {
      tmpErrors.country_id = false;
    }

    tmpErrors.form = (tmpErrors.first_name || tmpErrors.last_name || tmpErrors.email || tmpErrors.country_id);

    return Object.assign({}, { errors: tmpErrors, invalid: tmpInvalid });
  };


  switch (action.type) {
    case "CONTACT_NEW_SET_ITEM": {
      let retHash = validateDetailForm(action.payload);

      return { ...state,
        contact: action.payload,
        _contact: action.payload,
        isFormPristine: true,
        errors: retHash.errors,
        invalid: retHash.invalid,
        unset: retHash.unset
      };
    }

    case "CONTACT_NEW_SET_FORM_DETAILS": {
      let retHash = validateDetailForm(action.payload);
      let isTheSame = isEqual(state._contact, action.payload);

      return { ...state,
        contact: action.payload,
        isFormPristine: isTheSame,
        errors: retHash.errors,
        invalid: retHash.invalid,
        unset: retHash.unset
      };
    }
    case "CONTACT_NEW_SET_OPTION_COUNTRY_LIST": {
      return { ...state,
        options: {
          countries: action.payload
        }
      };
    }

    case "CONTACT_NEW_REDUCER_RESET":
      return resetReducer();

    default:
      if (typeof state === "undefined") {
        let retHash = resetReducer();
        let validation = validateDetailForm(retHash.contact);
        return { ...retHash, ...validation };
      } else {
        return state;
      }

  }
};