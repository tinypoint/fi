import React, { Component } from "react";

class Panel extends Component {
  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default Panel;