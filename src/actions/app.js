import {routerNavigate as AppRouterNavigate} from "../history";

/**
 * @param  {string} payload
 */
export const setRoute = (payload) => {
  return ({type: "ACTIVE_COMPONENT_ROUTE_TO", payload});
};

/**
 * @param  {string} payload
 */
export const routerNavigate = (payload) => {
  AppRouterNavigate(payload);
  return ({
    type: "ACTIVE_COMPONENT_SET_ITEM",
    payload: {
      parent: "chat_list",
      child: "message_list"
    }
  });
};

/**
 * @param  {object} params
 */
export const routeToItem = (params) => {
  return (dispatch) => {
    let nextRoute;

    if (params.model === "contacts") {
      if (params.action === "new") {
        nextRoute = "/new";
        dispatch(setRoute(nextRoute));
        return AppRouterNavigate(nextRoute);

      } else if (params.action === "list") {
        nextRoute = "/";
        dispatch(setRoute(nextRoute));
        return AppRouterNavigate(nextRoute);
      }
    } else if ((params.type === "machines") || (params.type === "machine")) {
      nextRoute = `/webapp/machine/${params.id}`;
      AppRouterNavigate(nextRoute);
      return dispatch(setRoute(nextRoute));

    } else if ((params.type === "machine-groups") || (params.type === "machine-group")) {
      nextRoute = `/webapp/machine-group/${params.id}/edit`;
      AppRouterNavigate(nextRoute);
      return dispatch(setRoute(nextRoute));
    }
  };
};