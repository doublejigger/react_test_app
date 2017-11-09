import {createBrowserHistory} from "history";
import {notieConfirm} from "../components/shared/utils";


const history = createBrowserHistory({
  getUserConfirmation(message, callback) {
    notieConfirm(message).then(() => {
      callback(true);
    }).catch(() => {
      callback(false);
    });
  }
});

/**
 * Navigate the browser to the new path
 * @param  {string} prmPath
 */
const routerNavigate = (prmPath) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        history.push(String(prmPath), null);
        resolve();
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  });
};

export {history as default, routerNavigate};