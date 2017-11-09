import * as React from "react";

export default({contact, isPristine, formError, commitForm, commitLabel, handleNavigationBack}) => (
  <div className="panel-heading">
    <div className="row">
      <div className="col-md-4 hidden-sm hidden-xs text-left">
        <button
          className="btn btn-default btn-ghost-default"
          onClick={handleNavigationBack}>
          <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
          &nbsp;&nbsp;Back
        </button>
      </div>
      <div className="col-md-4 col-sm-12 text-center">
        <h4 className="text-unselectable" id="contactProfilePanelTitle">
          {contact.last_name}&nbsp;{contact.first_name}&nbsp;<UnsavedEditTitleMarker show={isPristine}/>
        </h4>
      </div>
      <div className="col-md-4 col-sm-12">
        <div className="row">
          <div className="col-xs-12 hidden-xs text-center">
            <div className="row">
              <div className="col-sm-6 hidden-lg hidden-md hidden-xs text-left">
                <button
                  className="btn btn-default btn-ghost-default"
                  onClick={handleNavigationBack}>
                  <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                  &nbsp;&nbsp;Back
                </button>
              </div>
              <div className="col-md-12 col-sm-6 text-right">
                <button className="btn btn-success" onClick={commitForm} disabled={formError}>
                  <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                  &nbsp;&nbsp;{commitLabel}
                </button>
              </div>
            </div>
          </div>

          <div className="col-xs-12 hidden-lg hidden-md hidden-sm text-center">
            <div className="btn-group">
              <button
                className="btn btn-default btn-ghost-default"
                onClick={handleNavigationBack}>
                <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
                &nbsp;&nbsp;Back GIU
              </button>
              <button className="btn btn-success" onClick={commitForm} disabled={formError}>
                <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                &nbsp;&nbsp;Update
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);

const UnsavedEditTitleMarker = ({show}) => ((show)
  ? (
    <span style={{
      color: "red"
    }}>&nbsp;*</span>
  )
  : (<span></span>));