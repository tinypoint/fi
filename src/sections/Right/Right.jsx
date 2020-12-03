import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  add,
  propchange,
  changeCachePosi,
  select,
  hover,
  clearHover,
  clearSelect,
} from "../Canvas/canvasSlice";
import * as jsonutils from "../Canvas/utils/json";
import Panel from "./components/Panel/Panel";
import Position from "./components/Position/Position";
import Layer from "./components/Layer/Layer";
import Fill from "./components/Fill/Fill";
import Stroke from "./components/Stroke/Stroke";
import "./Right.css";

import alignStart from "bootstrap-icons/icons/align-start.svg";
import alignCenter from "bootstrap-icons/icons/align-center.svg";
import alignEnd from "bootstrap-icons/icons/align-end.svg";
import alignTop from "bootstrap-icons/icons/align-top.svg";
import alignMiddle from "bootstrap-icons/icons/align-middle.svg";
import alignBottom from "bootstrap-icons/icons/align-bottom.svg";

class Right extends Component {
  render() {
    const { select, json, cacheposi, dispatch } = this.props;

    if (!select[0]) {
      return null;
    }
    const sel = jsonutils.search(json, select[0]);
    const {
      width = sel.width,
      height = sel.height,
      x = sel.x,
      y = sel.y,
      angle = sel.angle,
      backgrounds = sel.backgrounds,
      alpha = sel.alpha,
      strokes = sel.strokes,
      visible = sel.visible,
      strokeAlignment = sel.strokeAlignment,
      strokeWidth = sel.strokeWidth,
    } = cacheposi || {};

    // const sel = cacheposi;
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
        <Panel>
          <Position
            x={x}
            y={y}
            width={width}
            height={height}
            angle={angle}
            onChange={(props) => {
              dispatch(
                changeCachePosi({
                  id: sel.id,
                  ...props,
                })
              );
            }}
            onChangeComplete={(props) => {
              dispatch(
                propchange({
                  id: sel.id,
                  ...props,
                })
              );
            }}
          />
          <Layer
            visible={visible}
            alpha={alpha}
            onChange={(props) => {
              dispatch(
                changeCachePosi({
                  id: sel.id,
                  ...props,
                })
              );
            }}
            onChangeComplete={(props) => {
              dispatch(
                propchange({
                  id: sel.id,
                  ...props,
                })
              );
            }}
          />
          {/* <Fill
            backgrounds={backgrounds}
            alpha={alpha}
            onChange={(props) => {
              dispatch(
                changeCachePosi({
                  id: sel.id,
                  ...props,
                })
              );
            }}
            onChangeComplete={(props) => {
              dispatch(
                propchange({
                  id: sel.id,
                  ...props,
                })
              );
            }}
          /> */}
          <Stroke
            strokeAlignment={strokeAlignment}
            strokeWidth={strokeWidth}
            strokes={strokes}
            onChange={(props) => {
              dispatch(
                changeCachePosi({
                  id: sel.id,
                  ...props,
                })
              );
            }}
            onChangeComplete={(props) => {
              dispatch(
                propchange({
                  id: sel.id,
                  ...props,
                })
              );
            }}
          />
        </Panel>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      json: state.canvas.json,
      select: state.canvas.select,
      cacheposi: state.canvas.cacheposi,
    };
  },
  (dispatch) => {
    return {
      dispatch: dispatch,
    };
  }
)(Right);
