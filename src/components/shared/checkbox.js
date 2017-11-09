import * as React from "react";

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: props.checked || false,
      currentValue: props.value || false
    };

    this.handleClick = this
      .handleClick
      .bind(this);

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleFocus = this
      .handleFocus
      .bind(this);
    this.handleBlur = this
      .handleBlur
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let stateHash = {};

    if (this.state.checked !== nextProps.checked) {
      stateHash.checked = nextProps.checked;
      stateHash.value = stateHash.checked
        ? true
        : false;
    }

    this.setState(stateHash);
  };

  handleClick(e) {
    this.setState({checked: e.target.checked});
  }

  handleChange(e, ...rest) {
    this.setState({checked: e.target.value});
    this
      .props
      .onChange(e, ...rest);
  }

  handleFocus(...args) {
    this.setState({isFocused: true});
    this
      .props
      .onFocus(...args);
  }

  handleBlur(...args) {
    this.setState({isFocused: false});
    this
      .props
      .onBlur(...args);
  }

  render() {
    return (<input
      type="checkbox"
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      checked={this.state.checked}
      onClick={this.handleClick}/>);
  }
}

Checkbox.defaultProps = {
  onChange() {},
  onFocus() {},
  onBlur() {}
};