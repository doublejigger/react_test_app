import * as React from "react";
import PropTypes from "prop-types";
import InputDebounced from "../shared/input-debounced";
import PanelHeading from "../shared/contact.panel.heading";
import PanelFooter from "../shared/contact.panel.footer";
import ErrorBoundary from "../shared/error.boundary";

export default class ContactNew extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this
      .handleInputChange
      .bind(this);
    this.commitForm = this
      .commitForm
      .bind(this);

    this.handleNavigationBack = this
      .handleNavigationBack
      .bind(this);
  }

  componentWillMount() {
    this
      .props
      .initReducer();
    this
      .props
      .loadCountryList();

    this.unblock = this
      .props
      .history
      .block((location, action) => {
        if (!this.props.isFormPristine) {
          return "Unsaved contact. Do you want to proceed anyway?";
        }
      });
  }

  componentWillUnmount() {
    this.unblock();
    this
      .props
      .resetReducer();
  }

  handleNavigationBack() {
    setTimeout(() => {
      this
        .props
        .navigateToContactList();
    });
  }

  commitForm() {
    if (!this.props.errors.form) {
      this
        .props
        .commitForm();
    }
  }

  handleInputChange(prmFieldName, prmFieldValue) {
    let modelFieldValue = prmFieldValue;

    if ((prmFieldName === "first_name") || (prmFieldName === "last_name") || (prmFieldName === "email")) {
      modelFieldValue = String(prmFieldValue.target.value);

    } else if (prmFieldName === "country_id") {
      modelFieldValue = String(prmFieldValue.target.value);

    } else {
      return;
    }

    let gotItem = Object.assign({}, this.props.contact);
    gotItem[prmFieldName] = modelFieldValue;

    this
      .props
      .setForm(gotItem);
  }

  render() {
    const contactFirstNameLabel_class = (this.props.errors.first_name)
      ? "form-group has-feedback has-error"
      : "form-group has-feedback";
    const contactLastNameLabel_class = (this.props.errors.last_name)
      ? "form-group has-feedback has-error"
      : "form-group has-feedback";
    const contactEmailLabel_class = (this.props.errors.email)
      ? "form-group has-feedback has-error"
      : "form-group has-feedback";
    const contactCountryIdLabel_class = (this.props.errors.country_id)
      ? "form-group has-feedback has-error"
      : "form-group has-feedback";

    const countryOptions = () => {
      return this
        .props
        .options
        .countries
        .map(x => <option value={x.value} key={x.value}>{x.label}</option>);
    };


    return (
      <ErrorBoundary>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="panel panel-default">
            <PanelHeading
              contact={this.props.contact}
              isPristine={this.props.isPristine}
              commitForm={this.commitForm}
              commitLabel={"Create"}
              handleNavigationBack={this.handleNavigationBack}
              formError={this.props.errors.form}/>
            <div className="panel-body">
              <form
                encType="multipart/form-data"
                ref={(ref) => this.newForm = ref}
                onSubmit={this.onSubmitForm}>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                    {/*Contact first_name input*/}
                    <div className={contactFirstNameLabel_class}>
                      <label className="control-label" htmlFor="contactFirstName">
                        {(this.props.errors.first_name)
                          ? <span>
                              <span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;
                            </span>
                          : null}
                        First Name
                      </label>
                      <InputDebounced
                        id="contactFirstName"
                        name="first_name"
                        type="text"
                        value={this.props.contact.first_name}
                        placeholder="First name"
                        onChange={this
                        .handleInputChange
                        .bind(this, "first_name")}
                        autoComplete="off"
                        className="form-control"/>
                    </div>

                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    {/*Contact last_name input*/}
                    <div className={contactLastNameLabel_class}>
                      <label className="control-label" htmlFor="contactLastName">
                        {(this.props.errors.last_name)
                          ? <span>
                              <span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;
                            </span>
                          : null}
                        Last Name
                      </label>
                      <InputDebounced
                        id="contactLastName"
                        name="last_name"
                        type="text"
                        value={this.props.contact.last_name}
                        placeholder="Last name"
                        onChange={this
                        .handleInputChange
                        .bind(this, "last_name")}
                        autoComplete="off"
                        className="form-control"/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                    {/*Contact email input*/}
                    <div className={contactEmailLabel_class}>
                      <label className="control-label" htmlFor="contactEmail">
                        {(this.props.errors.email)
                          ? <span>
                              <span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;
                            </span>
                          : null}
                        Email
                      </label>
                      <InputDebounced
                        id="contactEmail"
                        name="email"
                        type="text"
                        value={this.props.contact.email}
                        placeholder="Email"
                        onChange={this
                        .handleInputChange
                        .bind(this, "email")}
                        autoComplete="off"
                        className="form-control"/>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                    {/*Contact country_id select*/}
                    <div className={contactCountryIdLabel_class}>
                      <label className="control-label" htmlFor="contactCountryId">
                        {(this.props.errors.country_id)
                          ? <span>
                              <span className="glyphicon glyphicon-exclamation-sign"></span>&nbsp;
                            </span>
                          : null}
                        Country
                      </label>
                      <select
                        id="contactCountryId"
                        name="country_id"
                        value={this.props.contact.country_id}
                        onChange={this
                        .handleInputChange
                        .bind(this, "country_id")}
                        className="form-control">
                        <option value="">Select a country ...</option>
                        {countryOptions()}
                      </select>
                    </div>

                  </div>
                </div>

              </form>
            </div>

            <PanelFooter
              created_at={this.props.contact.created_at}
              updated_at={this.props.contact.created_at}/>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

ContactNew.propTypes = {
  contact: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  isFormPristine: PropTypes.bool.isRequired,
  initReducer: PropTypes.func.isRequired,
  resetReducer: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  commitForm: PropTypes.func.isRequired,
  navigateToContactList: PropTypes.func.isRequired
};