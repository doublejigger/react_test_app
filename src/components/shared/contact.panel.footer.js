import * as React from "react";
import moment from "moment";

export default({created_at, updated_at}) => (
  <div className="panel-footer">
    <small>Created on</small>&nbsp; {(created_at)
      ? (
        <b>{moment(created_at).format("LLL")}</b>
      )
      : (<b>~</b>)}
    &nbsp;&nbsp;&middot;&nbsp;&nbsp;
    <small>Last updated on</small>&nbsp; {(updated_at)
      ? (
        <b>{moment(updated_at).format("LLL")}</b>
      )
      : (<b>~</b>)}
  </div>
);