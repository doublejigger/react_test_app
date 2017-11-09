const keys = Object.freeze({
  CONTACT_LIST_PAGINATION: "contactList_pagination_3m620IwoQ8gpOGn",
  CONTACT_LIST_FILTERS: "contactList_filters_tpdyAz715oxw5SR",
  CONTACT_LIST_SELECTED_IDS: "contactList_selectedIds_K3ku2nzi57ydRie"
});

const defaults = Object.freeze({
  CONTACT_LIST_PAGINATION: Object.freeze({
    offset: 0,
    limit: 20,
    defaultLimit: 20,
    loadMore: 20
  }),
  CONTACT_LIST_FILTERS: Object.freeze({
    sorter: "contacts.created_at DESC",
    first_name: "",
    last_name: "",
    email: "",
    country_ids: []
  }),
  CONTACT_LIST_SELECTED_IDS: []
});


/**
 * Get contact list pagination from LocalStorage
 */
const getListPagination = () => {
  let retHash = localStorage.getItem(defaults.CONTACT_LIST_PAGINATION);
  retHash = (retHash == null) ?
    defaults.CONTACT_LIST_PAGINATION :
    JSON.parse(retHash);

  return Object.assign({}, retHash);
};

/**
 * Set contact list pagination to LocalStorage
 * @param  {} prmHash
 */
const setListPagination = (prmHash) => {
  if (prmHash) {
    localStorage.setItem(keys.CONTACT_LIST_PAGINATION, JSON.stringify(prmHash))
  }
};

/**
 * Get contact list filters from LocalStorage
 */
const getListFilters = () => {
  let retHash = localStorage.getItem(keys.CONTACT_LIST_FILTERS);
  retHash = (retHash == null) ?
    defaults.CONTACT_LIST_FILTERS :
    JSON.parse(retHash);

  return Object.assign({}, retHash);
};

/**
 * Set contact list filters to LocalStorage
 * @param  {} prmHash
 */
const setListFilters = (prmHash) => {
  if (prmHash) {
    localStorage.setItem(keys.CONTACT_LIST_FILTERS, JSON.stringify(prmHash))
  }
};

/**
 * Reset contact list filters
 */
const resetListFilters = () => {
  const tmpFilterHash = Object.assign({}, defaults.CONTACT_LIST_FILTERS),
    tmpPaginationHash = Object.assign({}, defaults.CONTACT_LIST_PAGINATION);

  setListFilters(tmpFilterHash);
  setListPagination(tmpPaginationHash);
};



/**
 * Contact list reducer function
 * @param  {object} state Current Redux Reducer State
 * @param  {object} action Current Action to be processed
 */
export default (state, action) => {
  let i,
    match,
    gotItems;
  const resetReducer = () => {
    return Object.assign({}, state, {
      items: [],
      matches: 0,
      results: 0,
      online_user_count: 0,
      is_loading: false,
      filters: getListFilters(),
      pagination: getListPagination(),
      options: {
        countries: [],
        countryHash: {}
      }
    });
  };

  const mapCountriesToContact = (contacts) => {
    let iteratedCountryId;
    return contacts.map(x => {
      iteratedCountryId = String(x.country_id).toLowerCase();
      x.country_name = state.options.countryHash[iteratedCountryId];
      return x;
    });
  };

  switch (action.type) {
    case "USERS_LOAD_LIST":
      gotItems = Array.from(action.payload.data);
      gotItems = mapCountriesToContact(gotItems);

      return Object.assign({}, state, {
        items: gotItems,
        matches: action.payload._matches,
        results: action.payload._results
      });

    case "CONTACT_LIST_SET_OPTION_COUNTRY_LIST": {
      gotItems = state.items.slice(0);
      gotItems = mapCountriesToContact(gotItems);

      return { ...state,
        items: gotItems,
        options: {
          countries: action.payload.countryArray,
          countryHash: action.payload.countryHash,
        }
      };
    }

    case "CONTACT_LIST_SELECT_SINGLE":{
      const itemId = String(action.id);
      match = false;

      gotItems = state.items.slice(0);

      for (i = 0; i < gotItems.length; i++) {
        if (gotItems[i].id === itemId) {
          gotItems[i]._checked = (gotItems[i]._checked === true) ?
            false :
            true;
          match = true;
          break;
        }
      }

      if (match) {
        return {...state, items: gotItems};
      } else {
        return state;
      }
    }

    case "CONTACT_LIST_SELECT_BULK":
      gotItems = state.items.slice(0);

      if (action.selectionType === "all") {
        for (i = 0; i < gotItems.length; i++) {
          gotItems[i]._checked = true;
        }
      } else if (action.selectionType === "none") {
        for (i = 0; i < gotItems.length; i++) {
          gotItems[i]._checked = false;
        }
      } else if (action.selectionType === "invert") {
        for (i = 0; i < gotItems.length; i++) {
          gotItems[i]._checked = !gotItems[i]._checked;
        }
      }

      return {...state, items: gotItems};


    case "USERS_LOAD_SET_IS_LOADING_STATUS":
      return {
        ...state,
        is_loading: action.payload
      };

    case "USERS_LIST_SET_FILTERS":
      setListFilters(action.payload);
      return {
        ...state,
        filters: action.payload
      };

    case "USERS_LIST_SET_PAGINATION":
      setListPagination(action.payload);
      return {
        ...state,
        pagination: action.payload
      };

    case "USERS_LIST_FILTERS_RESET":
      resetListFilters();
      return Object.assign({}, state, {
        filters: getListFilters(),
        pagination: getListPagination()
      });

    case "USERS_LIST_REDUCER_RESET":
      return resetReducer();
    default:
      if (typeof state === "undefined") {
        return resetReducer();
      } else {
        return state;
      }
  }
};