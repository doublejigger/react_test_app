import * as React from "react";

export default ({
  createNewItem,
  setSelectionBulk,
  deleteContactList,
  setListSorter,
  isSorterFieldActive,
  resetFilters,
  loadList
}) => (
  <div className="panel-heading">
    <table className="width100Percent">
      <tbody>
        <tr>
          <td className="positionRelative text-center clearfix">
            <span className="positionAbsolute topZero leftZero pull-left btn-group">
              <div className="btn-group">
                <button
                  className="btn btn-default btn-ghost-default dropdown-toggle height34px"
                  type="button"
                  id="selectionListMenu"
                  data-toggle="dropdown"
                  aria-expanded="true">
                  <span className="glyphicon glyphicon-unchecked"></span>
                </button>
                <ul
                  className="dropdown-menu width200px"
                  role="menu"
                  aria-labelledby="selectionListMenu">
                  <li role="presentation">
                    <a className="mouseCursorPointer" onClick={setSelectionBulk.bind(this, "all")}>
                      Select all
                    </a>
                  </li>
                  <li role="presentation">
                    <a className="mouseCursorPointer" onClick={setSelectionBulk.bind(this, "none")}>
                      Select none
                    </a>
                  </li>
                  <li className="divider"></li>
                  <li role="presentation">
                    <a className="mouseCursorPointer" onClick={setSelectionBulk.bind(this, "invert")}>
                      Invert selection
                    </a>
                  </li>
                  <li className="divider"></li>
                  <li role="presentation">
                    <a className="mouseCursorPointer clearfix" onClick={deleteContactList}>
                      Delete selected items
                      <span className="glyphicon glyphicon-trash pull-right" aria-hidden="true"></span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="btn-group">
                <button
                  className="btn btn-primary"
                  onClick={createNewItem}>
                  <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  &nbsp;&nbsp;New
                </button>
              </div>
            </span>

            <h4 className="text-unselectable">
              <span className="hidden-xs">Contacts</span>
              <span className="visible-xs-*">&nbsp;</span>
            </h4>

            <div className="positionAbsolute topZero rightZero pull-right">
              <button
                type="button"
                className="btn btn-default dropdown-toggle height34px"
                data-toggle="dropdown"
                aria-expanded="false">
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu dropdown-menu-right width250px" role="menu">
                <li role="presentation" className={isSorterFieldActive("contacts.last_name ASC")}>
                  <a
                    className="mouseCursorPointer clearfix"
                    onClick={setListSorter.bind(this, "contacts.last_name ASC")}>
                    Sort by name
                    <span
                      className="glyphicon glyphicon-sort-by-attributes pull-right"
                      aria-hidden="true"></span>
                  </a>
                </li>
                <li role="presentation" className={isSorterFieldActive("contacts.last_name DESC")}>
                  <a
                    className="mouseCursorPointer clearfix"
                    onClick={setListSorter.bind(this, "contacts.last_name DESC")}>
                    Sort by name
                    <span
                      className="glyphicon glyphicon-sort-by-attributes-alt pull-right"
                      aria-hidden="true"></span>
                  </a>
                </li>
                <li className="divider"></li>
                <li role="presentation" className={isSorterFieldActive("contacts.created_at ASC")}>
                  <a
                    className="mouseCursorPointer clearfix"
                    onClick={setListSorter.bind(this, "contacts.created_at ASC")}>
                    Sort by creation
                    <span
                      className="glyphicon glyphicon-sort-by-attributes pull-right"
                      aria-hidden="true"></span>
                  </a>
                </li>
                <li role="presentation" className={isSorterFieldActive("contacts.created_at DESC")}>
                  <a
                    className="mouseCursorPointer clearfix"
                    onClick={setListSorter.bind(this, "contacts.created_at DESC")}>
                    Sort by creation
                    <span
                      className="glyphicon glyphicon-sort-by-attributes-alt pull-right"
                      aria-hidden="true"></span>
                  </a>
                </li>
                <li className="divider"></li>
                <li role="presentation" className={isSorterFieldActive("contacts.updated_at ASC")}>
                  <a
                    className="mouseCursorPointer clearfix"
                    onClick={setListSorter.bind(this, "contacts.updated_at ASC")}>
                    Last updated
                    <span
                      className="glyphicon glyphicon-sort-by-attributes pull-right"
                      aria-hidden="true"></span>
                  </a>
                </li>
                <li role="presentation" className={isSorterFieldActive("contacts.updated_at DESC")}>
                  <a
                    className="mouseCursorPointer clearfix"
                    onClick={setListSorter.bind(this, "contacts.updated_at DESC")}>
                    Last updated
                    <span
                      className="glyphicon glyphicon-sort-by-attributes-alt pull-right"
                      aria-hidden="true"></span>
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a className="mouseCursorPointer" onClick={resetFilters}>
                    Reset filtes
                  </a>
                </li>
                <li className="divider"></li>
                <li>
                  <a className="mouseCursorPointer" onClick={loadList}>
                    Reload
                  </a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);