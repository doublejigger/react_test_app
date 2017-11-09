/**
 * Active component reducer function
 * @param  {object} state
 * @param  {object} action
 */
export default(state = {
  parent: null,
  route: null
}, action) => {
  switch (action.type) {
    case "ACTIVE_COMPONENT_SET_ITEM":
      return {
        ...state,
        ...action.payload
      };

    case "ACTIVE_COMPONENT_SET_PARENT":
      return {
        ...state,
        parent: action.payload,
        child: null
      };

    case "ACTIVE_COMPONENT_SET_CHILD":
      return {
        ...state,
        child: action.payload
      };

    case "ACTIVE_COMPONENT_ROUTE_TO":
      return {
        ...state,
        route: action.payload
      };

    default:
      return state;
  }
};