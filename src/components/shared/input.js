import * as React from "react";

export class Input extends React.Component {
  // https://gist.github.com/rchanou/0a5c4173803a0d654f4c986d696a5c7f
  // https://github.com/facebook/react/issues/955
  // https://github.com/reactjs/react-redux/issues/525#issuecomment-254852039

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      currentValue: (props.value)
        ? props.value
        : ""
    };

    this.handleFocus = this
      .handleFocus
      .bind(this);
    this.handleBlur = this
      .handleBlur
      .bind(this);
    this.handleChange = this
      .handleChange
      .bind(this);
  }

  handleChange(e, ...rest) {
    this.setState({currentValue: e.target.value});
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

Input.defaultProps = {
  onChange() {},
  onFocus() {},
  onBlur() {}
};