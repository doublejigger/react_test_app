import * as React from "react";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroller";
import {notieConfirmDelete} from "../shared/utils";
import PanelHeader from "./list.items.header";
import ContactItem from "./list.items.item";
import ListSpinner from "../shared/list-spinner";


export default class ContactList extends React.Component {
  constructor(props) {
    super(props);

    this.loadMoreDebounced = debounce(this.props.loadMore, 10);
  }

  render() {
    const isSorterFieldActive = (prmSorterField) => (this.props.list.filters.sorter === prmSorterField)
      ? "active"
      : "";
    const loadList = () => {
      this
        .props
        .loadList();
    };
    const setSelectionBulk = (selType) => {
      this
        .props
        .setSelectionBulk(selType);
    };
    const resetFilters = () => {
      this
        .props
        .resetFilters();
    };
    const deleteContactList = () => {
      notieConfirmDelete().then(() => {
        this
          .props
          .deleteContactList();
      });
    };
    const deleteContact = (contactId) => {
      notieConfirmDelete().then(() => {
        this
          .props
          .deleteContact(contactId);
      });
    };

    const setListSorter = (prmValue) => {
      const filterHash = Object.assign({}, this.props.list.filters, {sorter: String(prmValue)});
      setTimeout(this.props.setFilters(filterHash));
    };

    const moreContactToLoad = (this.props.list.matches > this.props.list.results)
      ? (true)
      : (false);

    return (
      <div className="col-lg-9 col-md-8 col-sm-8 col-xs-12">
        <div className="panel panel-default">
          <PanelHeader
            createNewItem={this.props.createNewItem}
            setSelectionBulk={setSelectionBulk}
            deleteContactList={deleteContactList}
            setListSorter={setListSorter}
            isSorterFieldActive={isSorterFieldActive}
            resetFilters={resetFilters}
            loadList={loadList}/>
          <NoContactToShow num={this.props.list.results}/>
          <ul className="list-group contact-list-container">
            <InfiniteScroll
              pageStart={0}
              loadMore={this.loadMoreDebounced}
              hasMore={moreContactToLoad}>
              {this
                .props
                .list
                .items
                .map(x => <ContactItem
                  item={x}
                  key={x.id}
                  deleteItem={deleteContact}
                  selectItem={this.props.setSelectionSingle}/>)}
              {this.props.list.is_loading && <ListSpinner/>}
            </InfiniteScroll>
          </ul>
          <div className="panel-footer">
            <p className="marginBottomZero text-unselectable clearfix">
              <b>{this.props.list.results}</b>
              <small>&nbsp;/&nbsp;{this.props.list.matches}</small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const NoContactToShow = ({num}) => ((num < 1)
  ? (
    <div className="panel-body">No items to show. Check your filters or add a new contact</div>
  )
  : (<span></span>));