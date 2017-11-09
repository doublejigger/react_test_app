import * as React from "react";
import PropTypes from "prop-types";
import Filters from "./list.filters";
import Items from "./list.items";
import ErrorBoundary from "../shared/error.boundary";

class ContactList extends React.Component {
  componentWillMount() {
    this
      .props
      .initReducer();

    this
      .props
      .loadList();

    this
      .props
      .loadCountryList();
  }

  componentWillUnmount() {
    this
      .props
      .resetReducer();
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="row">
            <Filters
              list={this.props.list}
              setFilters={this.props.setFilters}
              resetFilters={this.props.resetFilters}/>
            <Items
              list={this.props.list}
              loadList={this.props.loadList}
              loadMore={this.props.loadMore}
              deleteContact={this.props.deleteContact}
              deleteContactList={this.props.deleteContactList}
              createNewItem={this.props.createNewItem}
              routeToItem={this.props.routeToItem}
              setSelectionSingle={this.props.setSelectionSingle}
              setSelectionBulk={this.props.setSelectionBulk}
              setFilters={this.props.setFilters}
              resetFilters={this.props.resetFilters}/>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

ContactList.propTypes = {
  list: PropTypes.object.isRequired,
  loadList: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  deleteContactList: PropTypes.func.isRequired,
  createNewItem: PropTypes.func.isRequired,
  setSelectionSingle: PropTypes.func.isRequired,
  setSelectionBulk: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
  initReducer: PropTypes.func.isRequired,
  resetReducer: PropTypes.func.isRequired,
};

export default ContactList;