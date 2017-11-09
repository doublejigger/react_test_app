import * as React from "react";
import Select from "react-select";
import InputDebounced from "../shared/input-debounced";

export default (props) => {
  const resetFilters = () => {
    props.resetFilters();
  };

  const handleFormInputChange = (prmFieldname, prmValue) => {
    let filterHash = Object.assign({}, props.list.filters);

    if ((prmFieldname === "first_name") || (prmFieldname === "last_name") || (prmFieldname === "email")) {
      filterHash[prmFieldname] = String(prmValue.target.value);

    } else if (prmFieldname === "country_ids") {
      if (prmValue) {
        filterHash[prmFieldname] = Array.from(prmValue, (el) => {
          return el.value;
        });
      } else {
        filterHash[prmFieldname] = [];
      }
    }
    setTimeout(props.setFilters(filterHash));
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
      <div className="panel panel-default">
        <div className="panel-heading">
          <table className="width100Percent">
            <tbody>
              <tr>
                <td>
                  <h4 id="contactListFilterTitle" className="text-unselectable">Filters</h4>
                </td>
                <td className="text-right">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-default dropdown-toggle height34px"
                      data-toggle="dropdown"
                      aria-expanded="false">
                      <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right" role="menu">
                      <li>
                        <a className="mouseCursorPointer" onClick={resetFilters}>Reset filters</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="panel-body">
          <form role="form">
            <div className="form-group">
              <label htmlFor="contactListFilters_firstName">First name</label>
              <InputDebounced
                type="text"
                className="form-control"
                id="contactListFilters_firstName"
                autoComplete="off"
                placeholder="First name"
                value={props.list.filters.first_name}
                onChange={handleFormInputChange.bind(this, "first_name")}/>
            </div>

            <div className="form-group">
              <label htmlFor="contactListFilters_lastName">Last name</label>
              <InputDebounced
                type="text"
                className="form-control"
                id="contactListFilters_lastName"
                autoComplete="off"
                placeholder="Last name"
                value={props.list.filters.last_name}
                onChange={handleFormInputChange.bind(this, "last_name")}/>
            </div>

            <div className="form-group">
              <label htmlFor="contactListFilters_email">Email</label>
              <InputDebounced
                type="email"
                className="form-control"
                id="contactListFilters_email"
                autoComplete="off"
                placeholder="Email"
                value={props.list.filters.email}
                onChange={handleFormInputChange.bind(this, "email")}/>
            </div>

            <div className="form-group">
              <label htmlFor="contactListFilters_countryIds">Countries</label>
              <Select
                id="contactListFilters_countryIds"
                multi={true}
                value={props.list.filters.country_ids}
                options={props.list.options.countries}
                onChange={handleFormInputChange.bind(this, "country_ids")}/>
            </div>
          </form>
        </div>

        <div className="panel-footer">
          <p className="marginBottomZero text-unselectable clearfix">
            <b>{props.list.results}</b>
            <small>&nbsp;/&nbsp;{props.list.matches}</small>
          </p>
        </div>

      </div>
    </div>
  );
};