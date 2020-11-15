import React, { Component } from "react";
import { connect } from "react-redux";
import { add } from "./navSlice";
import "./Nav.css";

class Nav extends Component {


  render() {
    return (
      <div className="nav-area"></div>
    );
  }
}

export default connect(
  (state) => {
    return {
      json: state.canvas.json,
      select: state.canvas.select,
      hover: state.canvas.hover,
      value: state.canvas.value,
    };
  },
  (dispatch) => {
    return {
      dispatch: dispatch,
    };
  }
)(Nav);
