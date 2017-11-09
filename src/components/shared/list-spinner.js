import * as React from "react";
import MDSpinner from "react-md-spinner";

export default () => {
  return (
    <div className="list-loader-container">
      <div className="list-loader-content">
        <MDSpinner singleColor="rgb(66, 165, 245)"/>
      </div>
    </div>
  );
};