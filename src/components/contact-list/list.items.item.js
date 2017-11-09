import * as React from "react";
import {Link} from "react-router-dom";
import {Checkbox} from "../shared/checkbox";

// https://codepen.io/edge0703/pen/iHJuA

export default({item, selectItem, deleteItem}) => (
  <li className="list-group-item">
    <div className="row">
      <div className="col-md-10">
        <div className="checkbox-container" onClick={selectItem.bind(this, item.id)}>
          <Checkbox type="checkbox" checked={item._checked || false}/>
        </div>
        <div className="avatar-container">
          <Link className="mouseCursorPointer" to={`/edit/${item.id}`}>
            <img
              className="media-object img-circle avatarListBorder thumb"
              src="/img/contact_avatar.svg"/>
          </Link>
        </div>
        <div >
          <h3 >
            <Link className="mouseCursorPointer" to={`/edit/${item.id}`}>
              {item.last_name}&nbsp;{item.first_name}
            </Link>
          </h3>
          <h4>{item.email}</h4>
          <h5>
            <span className="f16">
              <span className={`flag ${String(item.country_id).toLowerCase()}`}></span>&nbsp;&nbsp;{item.country_name}
            </span>
          </h5>
        </div>
      </div>
      <div
        className="col-md-2 height64px hidden-sm hidden-xs"
        style={{padding: "15px 18px"}}>
        <div className="pull-right">
          <button
            className="btn btn-danger"
            onClick={deleteItem.bind(this, item.id)}
            title="delete">
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </div>
  </li>
);