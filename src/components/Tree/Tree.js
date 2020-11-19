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
import "./Tree.css";

class Tree extends Component {
  renderNode = (json, level = 0) => {
    const { id, type, children = [] } = json;
    const { select: sels = [], hover: hovs = [], dispatch } = this.props;

    const isSelect = sels.indexOf(id) > -1;
    const isHover = hovs.indexOf(id) > -1;

    return (
      <div>
        <div
          className={classnames("tree-leaf", {
            selected: isSelect,
            hoverd: isHover,
          })}
          style={{
            paddingLeft: `${8 + 10 * level}px`,
          }}
          onClick={() => {
            dispatch(select(id));
          }}
          onMouseMove={() => {
            dispatch(hover([id]));
          }}
          onMouseOut={() => {
            dispatch(clearHover());
          }}
        >
          {type}: {id}
          <span className="visible-tool">可见</span>
        </div>
        <div
          className={isSelect ? "tree-leaf-body selected" : "tree-leaf-body"}
        >
          {children.map((child) => {
            return (
              <div key={child.id}>{this.renderNode(child, level + 1)}</div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { json, dispatch } = this.props;
    return <div className="tree-area">{this.renderNode(json)}</div>;
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
)(Tree);
