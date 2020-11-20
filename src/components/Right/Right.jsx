import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  add,
  propchange,
  select,
  hover,
  clearHover,
  clearSelect,
} from "../Canvas/canvasSlice";
import * as jsonutils from "../Canvas/utils/json";
import "./Right.css";

import alignStart from "bootstrap-icons/icons/align-start.svg";
import alignCenter from "bootstrap-icons/icons/align-center.svg";
import alignEnd from "bootstrap-icons/icons/align-end.svg";
import alignTop from "bootstrap-icons/icons/align-top.svg";
import alignMiddle from "bootstrap-icons/icons/align-middle.svg";
import alignBottom from "bootstrap-icons/icons/align-bottom.svg";

class Right extends Component {
  render() {
    const { select, json, dispatch } = this.props;

    if (!select[0]) {
      return null;
    }

    const sel = jsonutils.search(json, select[0]);
    return (
      <div className="right-area">
        <div className="right-area-tab-header">
          <div className="right-area-tab">Design</div>
          <div className="right-area-tab">Prototype</div>
          <div className="right-area-tab">Inspect</div>
        </div>
        <div className="right-area-raw-panel">
          <div className="right-area-raw-row">
            <div className="right-area-raw-iconButton">
              <img src={alignStart} alt="" />
            </div>
            <div className="right-area-raw-iconButton">
              <img src={alignCenter} alt="" />
            </div>
            <div className="right-area-raw-iconButton">
              <img src={alignEnd} alt="" />
            </div>
            <div className="right-area-raw-iconButton">
              <img src={alignTop} alt="" />
            </div>
            <div className="right-area-raw-iconButton">
              <img src={alignMiddle} alt="" />
            </div>
            <div className="right-area-raw-iconButton">
              <img src={alignBottom} alt="" />
            </div>
          </div>
        </div>
        <div className="right-area-raw-panel">
          <div className="right-area-raw-row">
            <label className="right-area-field-container">
              <span className="right-area-field-label">X</span>
              <input
                type="text"
                className="right-area-input"
                value={sel.x}
                onChange={() => {}}
              />
            </label>
            <label className="right-area-field-container">
              <span className="right-area-field-label">Y</span>
              <input
                type="text"
                className="right-area-input"
                value={sel.y}
                onChange={() => {}}
              />
            </label>
          </div>
          <div className="right-area-raw-row">
            <label className="right-area-field-container">
              <span className="right-area-field-label">W</span>
              <input
                type="text"
                className="right-area-input"
                value={sel.width}
                onChange={() => {}}
              />
            </label>
            <label className="right-area-field-container">
              <span className="right-area-field-label">H</span>
              <input
                type="text"
                className="right-area-input"
                value={sel.height}
                onChange={() => {}}
              />
            </label>
          </div>
          <div className="right-area-raw-row">
            <label className="right-area-field-container">
              <span className="right-area-field-label">A</span>
              <input type="text" className="right-area-input" />
            </label>
            <label className="right-area-field-container">
              <span className="right-area-field-label">B</span>
              <input type="text" className="right-area-input" />
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      json: state.canvas.json,
      select: state.canvas.select,
      hover: state.canvas.hover,
    };
  },
  (dispatch) => {
    return {
      dispatch: dispatch,
    };
  }
)(Right);
