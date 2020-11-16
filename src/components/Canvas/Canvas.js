import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { connect } from "react-redux";
import { add, propchange, select } from "./canvasSlice";
import objects from "./objects";
import * as graphicsutils from "./utils/graphics";
import "./Canvas.css";

const search = (parent, id) => {
  if (parent.option && parent.option.id === id) {
    return parent;
  } else {
    const { children = [] } = parent;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const target = search(child, id);
      if (target) {
        return target;
      }
    }
    return null;
  }
};

class Canvas extends Component {
  canvasWrapper = null;

  info = null;

  onMouseDown = (event) => {
    this.info = null;
    const { activednav, dispatch } = this.props;
    if (activednav === "cursor") {
      if (event.currentTarget) {
        this.info = {
          type: "cursor",
          target: event.currentTarget,
          ...event.data.global,
        };
        dispatch(select(event.currentTarget.option.id));
      } else {
        this.info = {
          type: "rectselect",
          target: event.currentTarget,
          ...event.data.global,
        };
      }
    } else {
      this.info = {
        type: "frame",
        target: event.currentTarget,
        ...event.data.global,
      };
    }
  };

  onMouseMove = (event) => {
    if (!this.info) {
      return;
    }

    const { type, target, x, y } = this.info;
    const { global } = this.app.renderer.plugins.interaction.mouse;
    const movex = global.x - x;
    const movey = global.y - y;

    if (type === "cursor") {
      target.x = target.option.x + movex;
      target.y = target.option.y + movey;
    } else if (type === "rectselect") {
      this.frame.clear();
      this.frame.lineStyle(1, 0x11bb56, 1, 0);
      this.frame.beginFill(0x11bb56, 0.1);
      this.frame.drawRect(x, y, movex, movey);
      this.frame.endFill();
    } else if (type === "frame") {
      this.frame.clear();
      graphicsutils.select(this.frame, x, y, movex, movey);
    }
  };

  onMouseUp = () => {
    if (!this.info) {
      return;
    }
    const { type, target, x, y } = this.info;
    const { global } = this.app.renderer.plugins.interaction.mouse;

    if (type === "cursor") {
      if (target.option.x !== target.x || target.option.y !== target.y) {
        this.props.dispatch(
          propchange({
            id: target.option.id,
            x: target.x,
            y: target.y,
          })
        );
      }
    } else if (type === "rectselect") {
      this.frame.clear();
    } else if (type === "frame") {
      this.frame.clear();
      this.props.dispatch(
        add({
          type: "rectangle",
          x,
          y,
          width: global.x - x,
          height: global.y - y,
        })
      );
    }

    this.info = null;
  };

  _cycleRender = (parent, json) => {
    const { select, hover, dispatch } = this.props;
    const { type, children = [] } = json;
    const node = new objects[type](json, {
      select,
      hover,
      dispatch,
    });
    parent.addChild(node);
    children.forEach((child) => {
      this._cycleRender(node, child);
    });
  };

  diff = (parent, index = 0, oldjson, newjson) => {
    if (!oldjson && newjson) {
      this._cycleRender(parent, newjson);
    } else if (oldjson && !newjson) {
      parent.removeChildAt(index);
    } else {
      if (oldjson.type !== newjson.type) {
        const { select, hover, dispatch } = this.props;
        const { type, children = [] } = newjson;
        const node = new objects[type](newjson, {
          select,
          hover,
          dispatch,
        });
        parent.removeChildAt(index);
        parent.addChildAt(node, index);
        children.forEach((child) => {
          this._cycleRender(node, child);
        });
      } else {
        const { select, hover, dispatch } = this.props;
        const { type, children = [] } = newjson;
        const node = parent.getChildAt(index);
        node._update(newjson, {
          select,
          hover,
          dispatch,
        });
        children.forEach((child, index) => {
          this.diff(node, index, oldjson.children[index], child);
        });
      }
    }
  };

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

    this.app = app;
    this.renderlayer = new PIXI.Container();
    this.frame = new PIXI.Graphics();

    this.app.stage.addChild(this.renderlayer);
    this.app.stage.addChild(this.frame);

    this._cycleRender(this.renderlayer, this.props.json);

    this.app.renderer.plugins.interaction.on("mousedown", this.onMouseDown);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }

  componentDidUpdate(props) {
    if (this.props.json !== props.json || this.props.select !== props.select) {
      this.diff(this.renderlayer, 0, props.json, this.props.json);
    }
  }

  componentWillUnmount() {
    this.app.renderer.plugins.interaction.off("mousedown", this.onMouseDown);
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
    this.canvasWrapper.removeChild(this.app.view);
    this.app.destroy(true);
    this.app = null;
  }

  render() {
    return (
      <div
        className="canvas-area"
        ref={(ref) => (this.canvasWrapper = ref)}
      ></div>
    );
  }
}

export default connect(
  (state) => {
    return {
      json: state.canvas.json,
      select: state.canvas.select,
      hover: state.canvas.hover,
      activednav: state.canvas.activednav,
    };
  },
  (dispatch) => {
    return {
      dispatch: dispatch,
    };
  }
)(Canvas);
