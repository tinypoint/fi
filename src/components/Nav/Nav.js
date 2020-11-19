import React, { Component } from "react";
import { connect } from "react-redux";
import { changeActivedNav } from "../Canvas/canvasSlice";
import "./Nav.css";

const navs = [
  {
    value: "cursor",
    label: "选择",
  },
  {
    value: "frame",
    label: "创建",
  },
  {
    value: "rectangle",
    label: "矩形",
  }
];

class Nav extends Component {
  render() {
    const { activednav, dispatch } = this.props;
    return (
      <div className="nav-area">
        {navs.map((nav) => {
          return (
            <div
              key={nav.value}
              className={
                nav.value === activednav ? "nav-btn actived" : "nav-btn"
              }
              onClick={() => {
                dispatch(changeActivedNav(nav.value));
              }}
            >
              {nav.label}
            </div>
          );
        })}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      activednav: state.canvas.activednav,
    };
  },
  (dispatch) => {
    return {
      dispatch: dispatch,
    };
  }
)(Nav);
