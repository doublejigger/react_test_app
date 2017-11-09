import Notie from "notie";

/**
 * @param  {string} confirmMsg
 */
export const notieConfirm = (confirmMsg) => {
  return new Promise((resolve, reject) => {
    Notie
      .confirm({
        text: confirmMsg
      }, function () {
        resolve();
      }, function () {
        reject();
      });

  });
};

/**
 */
export const notieConfirmDelete = () => {
  const confirmMsg = "Are you sure you want to proceed with the delete operation?";

  return new Promise((resolve, reject) => {
    Notie
      .confirm({
        text: confirmMsg
      }, function () {
        resolve();
      }, function () {
        reject();
      });

  });
};