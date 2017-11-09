import * as React from "react";
import debounce from "lodash.debounce";

// more info on debounced input:
// https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/2467
// 9479#24679479

export default class InputDebounced extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      currentValue: (props.value)
        ? (props.value)
        : ("")};

    this.handleFocus = this
      .handleFocus
      .bind(this);
    this.handleBlur = this
      .handleBlur
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
    this.onChangeDebounced = debounce(this.props.onChange, props.wait);
  }

  handleChange(e) {
    e.persist();
    this.setState({currentValue: e.target.value});
    this.onChangeDebounced(e);
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

  componentWillReceiveProps(nextProps) {
    if (!this.state.isFocused) {
      this.setState({currentValue: nextProps.value});
    }
  }

  render() {
    return (<input
      {...this.props}
      onChange={this.handleChange}
      onFocus={this.handleFocus}
      onBlur={this.handleBlur}
      value={this.state.currentValue}/>);
  }
}

InputDebounced.defaultProps = {
  onChange() {},
  onFocus() {},
  onBlur() {},
  wait: 600
};