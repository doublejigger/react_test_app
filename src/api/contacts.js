import CountryList from "country-list";
const CONTACT_KEY = "contact_list_dDTqjyk8wISIG9l5yeLu9kbF";


/**
 * Generate a UUID
 * Source: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
const generateUUID = () => { // Public Domain/MIT
  let d = new Date().getTime();
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
};


/**
 * Retrieve the contact list saved in the localStorage
 */
const getContactList = () => {
  let retArray = localStorage.getItem(CONTACT_KEY);
  retArray = (retArray == null) ? [] : JSON.parse(retArray);

  return retArray.slice(0);
};

/**
 * Save the contact list into the localStorage
 * @param  {array} payload
 */
const setContactList = (payload) => {
  if (payload) {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(payload))
  }
};

module.exports = {

  /**
   * @param  {object} params
   */
  getList: function (params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let contactList = getContactList();
        let queryOffset = 0;
        let queryLimit = 1000;
        let retHash = {};

        if (params.pagination) {
          if (params.pagination.limit) {
            queryLimit = params.pagination.limit;
          }
          if (params.pagination.offset) {
            queryOffset = params.pagination.offset;
          }
        }

        if (params.hasOwnProperty("filters")) {
          if ((params.filters.hasOwnProperty("first_name")) && (params.filters.first_name != "")) {
            contactList = contactList.filter(x => {
              let testString = new RegExp(params.filters.first_name, "gi");
              return x.first_name.search(testString) > -1;
            });
          }

          if ((params.filters.hasOwnProperty("last_name")) && (params.filters.last_name != "")) {
            contactList = contactList.filter(x => {
              let testString = new RegExp(params.filters.last_name, "gi");
              return x.last_name.search(testString) > -1;
            });
          }

          if ((params.filters.hasOwnProperty("email")) && (params.filters.email != "")) {
            contactList = contactList.filter(x => {
              let testString = new RegExp(params.filters.email, "gi");
              return x.email.search(testString) > -1;
            });
          }

          if ((params.filters.hasOwnProperty("country_ids")) && (params.filters.country_ids.length > 0)) {
            contactList = contactList.filter(x => params.filters.country_ids.indexOf(x.country_id) > -1);
          }

          if (params.filters.hasOwnProperty("sorter")) {
            const sortDirection = params.filters.sorter.split(" ")[1];
            let sortAttribute = params.filters.sorter.split(" ")[0];

            sortAttribute = sortAttribute.split(".")[1];

            contactList = contactList.sort((a, b) => {
              if (sortAttribute === "last_name") {
                return a[sortAttribute].localeCompare(b[sortAttribute]);
              } else {
                return new Date(a[sortAttribute]) - new Date(b[sortAttribute]);
              }
            });

            if (sortDirection === "DESC") {
              contactList = contactList.reverse();
            }
          }
        }


        retHash.data = contactList;
        retHash._matches = retHash.data.length;
        retHash.data = retHash.data.slice(queryOffset, queryLimit);
        retHash._results = retHash.data.length;

        resolve(retHash);
      });
    });
  },

  /**
   * @param  {integer} itemId
   */
  getById: function (itemId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let contactList = getContactList();
        contactList = contactList.filter(x => x.id === itemId);
        if (contactList.length > 0) {
          resolve(contactList[0]);
        } else {
          reject(`Contact whose id ${itemId} was not found`);
        }
      });
    });
  },

  /**
   * @param  {object} params
   */
  createNew: function (params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let contactList = getContactList();

        if (params.hasOwnProperty("contact")) {
          params.contact.id = generateUUID();
          contactList.push(params.contact);
          setContactList(contactList);
          resolve(params.contact);
        } else {
          reject("Invalid payload. Contact data are missing");
        }

      });
    });
  },

  /**
   * @param  {integer} itemId
   * @param  {object} item
   */
  updateById: function (itemId, item) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let contactList = getContactList();
        const gotContactIdx = contactList.findIndex(x => x.id === itemId);

        if (gotContactIdx > -1) {
          contactList[gotContactIdx] = { ...contactList[gotContactIdx],
            ...item.contact
          };
          setContactList(contactList);
          resolve(contactList[gotContactIdx]);
        } else {
          reject(`Contact whose id ${itemId} was not found`);
        }
      });
    });
  },

  /**
   * @param  {integer} contactId
   */
  deleteContact: function (contactId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let contactList = getContactList();
        const gotContactIdx = contactList.findIndex(x => x.id === contactId);
        contactList = contactList.filter(x => x.id !== contactId);

        if (gotContactIdx > -1) {
          setContactList(contactList);
          resolve(contactList);
        } else {
          reject(`Contact whose id ${contactId} was not found`);
        }
      });
    });
  },

  /**
   * @param  {object} params
   */
  deleteContactList: function (params) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let contactList = getContactList();
        const newContactList = contactList.filter(x => params.ids.indexOf(x.id) === -1);
        contactList = contactList.filter(x => params.ids.indexOf(x.id) > -1);

        if (contactList.length > 0) {
          setContactList(newContactList);
          resolve(contactList.length);
        } else {
          reject(`The selected contacts weren't found`);
        }
      });
    });
  },



  /**
   */
  getCountryList: function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const retArray = CountryList().getData();
        const retHash = CountryList().getCodeList();

        if (retArray.constructor === Array) {
          resolve({
            countryArray: retArray,
            countryHash: retHash
          });
        } else {
          reject("Country data are missing");
        }
      });
    });
  }
};