import {combineReducers} from "redux";
import active_component from "./active-component";
import contact_list from "./contact-list";
import contact_new from "./contact-new";
import contact_edit from "./contact-edit";

export default combineReducers({active_component, contact_list, contact_new, contact_edit});