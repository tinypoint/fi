import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { connect } from "react-redux";
import { add } from "./canvasSlice";
import objects from "./objects";
import "./Canvas.css";

class Canvas extends Component {
  canvasWrapper = null;

  componentDidMount() {
    const app = new PIXI.Application({
      transparent: true,
      autoDensity: true,
      antialias: true,
      preserveDrawingBuffer: true,
      resolution: window.devicePixelRatio || 1,
      resizeTo: this.canvasWrapper,
    });
    this.canvasWrapper.appendChild(app.view);

    this.cycleRender(app.stage, this.props.json);

    this.app = app;
  }

  cycleRender = (parent, data) => {
    const { select, hover, dispatch } = this.props;
    const { type, children = [] } = data;
    const node = new objects[type](data, {
      select,
      hover,
      dispatch,
    });
    parent.addChild(node);
    children.forEach((child) => {
      this.cycleRender(node, child);
    });
  };

  componentDidUpdate(props) {
    if (this.props.json !== props.json || this.props.select !== props.select) {
      this.app.stage.removeChildren();
      this.cycleRender(this.app.stage, this.props.json);
    }
  }

  componentWillUnmount() {
    this.canvasWrapper.removeChild(this.app.view);
    this.app.destroy(true);
    this.app = null;
  }

  render() {
    console.log(this.props.value);
    return (
      <div className="canvas-area" ref={(ref) => (this.canvasWrapper = ref)}></div>
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
)(Canvas);
