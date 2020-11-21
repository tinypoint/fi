import React, { Component } from "react";
import * as PIXI from "pixi.js";
import { connect } from "react-redux";
import {
  add,
  propchange,
  select,
  clearSelect,
  hover,
  changeCachePosi,
} from "./canvasSlice";
import objects from "./objects";
import * as jsonutils from "./utils/json";
import * as graphicsutils from "./utils/graphics";
import "./Canvas.css";

const style = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 14,
  fill: "#00ff99",
});

class Canvas extends Component {
  canvasWrapper = null;

  info = null;

  onMouseDown = (event) => {
    this.info = null;
    const { activednav, dispatch } = this.props;
    if (activednav === "cursor") {
      if (event.target) {
        if (event.target.option) {
          if (event.target.option.type === "corner") {
            const target = jsonutils.searchIns(
              this.renderlayer,
              this.props.select[0]
            );
            this.info = {
              type: "resize",
              target,
              ...event.data.global,
              dir: event.target.option.dir,
            };
          } else {
            this.info = {
              type: "move",
              target: event.target,
              ...event.data.global,
            };
            dispatch(select(event.target.option.id));
          }
        } else {
          this.info = {};
        }
      } else {
        dispatch(clearSelect());
        this.info = {
          type: "boxselect",
          target: event.target,
          ...event.data.global,
        };
      }
    } else {
      this.info = {
        type: activednav,
        target: event.target,
        ...event.data.global,
      };
      dispatch(clearSelect());
    }
  };

  onMouseMove = () => {
    if (!this.info) {
      return;
    }

    const { type, target, x, y } = this.info;
    const { global } = this.app.renderer.plugins.interaction.mouse;
    const movex = global.x - x;
    const movey = global.y - y;
    if (type === "move") {
      target.x = target.option.x + movex;
      target.y = target.option.y + movey;
      const bound = target.getBounds();

      this.showSelect(bound.x, bound.y, bound.width, bound.height);

      this.props.dispatch(
        changeCachePosi({
          x: bound.x,
          y: bound.y,
          width: bound.width,
          height: bound.height,
        })
      );
    } else if (type === "boxselect") {
      this.showBoxSelectlayer(x, y, movex, movey);
    } else if (type === "frame" || type === "rectangle") {
      this.showCreatelayer(x, y, movex, movey);
    } else if (type === "resize") {
      const { dir } = this.info;
      const props = {
        id: target.option.id,
        x: target.option.x,
        y: target.option.y,
        width: target.option.width,
        height: target.option.height,
      };
      if (dir === "n") {
        props.y = target.option.y + movey;
        props.height = target.option.height - movey;
      } else if (dir === "e") {
        props.width = target.option.width + movex;
      } else if (dir === "w") {
        props.x = target.option.x + movex;
        props.width = target.option.width - movex;
      } else if (dir === "s") {
        props.height = target.option.height + movey;
      } else if (dir === "ne") {
        props.y = target.option.y + movey;
        props.height = target.option.height - movey;
        props.width = target.option.width + movex;
      } else if (dir === "nw") {
        props.y = target.option.y + movey;
        props.height = target.option.height - movey;
        props.x = target.option.x + movex;
        props.width = target.option.width - movex;
      } else if (dir === "se") {
        props.height = target.option.height + movey;
        props.width = target.option.width + movex;
      } else if (dir === "sw") {
        props.height = target.option.height + movey;
        props.x = target.option.x + movex;
        props.width = target.option.width - movex;
      }

      target._updateTransform(props);

      const bound = target.getBounds();

      this.showSelect(bound.x, bound.y, bound.width, bound.height);

      this.props.dispatch(
        changeCachePosi({
          x: bound.x,
          y: bound.y,
          width: bound.width,
          height: bound.height,
        })
      );
    }
  };

  onMouseUp = () => {
    if (!this.info) {
      return;
    }
    const { type, target, x, y } = this.info;
    const { global } = this.app.renderer.plugins.interaction.mouse;
    const movex = global.x - x;
    const movey = global.y - y;

    if (type === "move") {
      if (target.option.x !== target.x || target.option.y !== target.y) {
        this.props.dispatch(
          propchange({
            id: target.option.id,
            x: target.option.x + movex,
            y: target.option.y + movey,
          })
        );
      }
      this.props.dispatch(changeCachePosi(null));
    } else if (type === "boxselect") {
      this.hideBoxSelectlayer();
    } else if (type === "frame" || type === "rectangle") {
      this.hideCreatelayer();
      this.props.dispatch(
        add({
          type,
          x,
          y,
          width: global.x - x,
          height: global.y - y,
        })
      );
    } else if (type === "resize") {
      const { dir } = this.info;
      if (
        target.option.x !== target.x ||
        target.option.y !== target.y ||
        target.option.width !== target.width ||
        target.option.height !== target.height
      ) {
        const props = {
          id: target.option.id,
          x: target.option.x,
          y: target.option.y,
          width: target.option.width,
          height: target.option.height,
        };
        if (dir === "n") {
          props.y = target.option.y + movey;
          props.height = target.option.height - movey;
        } else if (dir === "e") {
          props.width = target.option.width + movex;
        } else if (dir === "w") {
          props.x = target.option.x + movex;
          props.width = target.option.width - movex;
        } else if (dir === "s") {
          props.height = target.option.height + movey;
        } else if (dir === "ne") {
          props.y = target.option.y + movey;
          props.height = target.option.height - movey;
          props.width = target.option.width + movex;
        } else if (dir === "nw") {
          props.y = target.option.y + movey;
          props.height = target.option.height - movey;
          props.x = target.option.x + movex;
          props.width = target.option.width - movex;
        } else if (dir === "se") {
          props.height = target.option.height + movey;
          props.width = target.option.width + movex;
        } else if (dir === "sw") {
          props.height = target.option.height + movey;
          props.x = target.option.x + movex;
          props.width = target.option.width - movex;
        }

        this.props.dispatch(propchange(props));
      }
      this.props.dispatch(changeCachePosi(null));
    }

    this.info = null;
  };

  onHover = () => {
    if (this.info && this.info.type === "boxselect") {
      // 框选时，hover逻辑由框选做
      return;
    }
    const { target } = this.app.renderer.plugins.interaction.eventData;
    this.props.dispatch(
      hover(target && target.option ? [target.option.id] : [])
    );
  };

  initSelectlayer = () => {
    this.selectlayer = new PIXI.Container();
    this.selectlayer.visible = false;
    const top = new PIXI.Graphics();
    top.option = {
      type: "corner",
      dir: "n",
    };
    top.interactive = true;
    top.buttonMode = true;
    top.cursor = "ns-resize";

    const bottom = new PIXI.Graphics();
    bottom.option = {
      type: "corner",
      dir: "s",
    };
    bottom.interactive = true;
    bottom.buttonMode = true;
    bottom.cursor = "ns-resize";

    const left = new PIXI.Graphics();
    left.option = {
      type: "corner",
      dir: "w",
    };
    left.interactive = true;
    left.buttonMode = true;
    left.cursor = "ew-resize";

    const right = new PIXI.Graphics();
    right.option = {
      type: "corner",
      dir: "e",
    };
    right.interactive = true;
    right.buttonMode = true;
    right.cursor = "ew-resize";

    const topLeft = new PIXI.Graphics();
    topLeft.option = {
      type: "corner",
      dir: "nw",
    };
    topLeft.interactive = true;
    topLeft.buttonMode = true;
    topLeft.cursor = "nwse-resize";
    topLeft.beginFill(0xffffff);
    topLeft.drawRect(0, 0, 8, 8);
    topLeft.endFill();
    topLeft.lineStyle(1, 0x337cd6, 1, 0);
    topLeft.drawRect(0, 0, 8, 8);

    const topRight = new PIXI.Graphics();
    topRight.option = {
      type: "corner",
      dir: "ne",
    };
    topRight.interactive = true;
    topRight.buttonMode = true;
    topRight.cursor = "nesw-resize";
    topRight.beginFill(0xffffff);
    topRight.drawRect(0, 0, 8, 8);
    topRight.endFill();
    topRight.lineStyle(1, 0x337cd6, 1, 0);
    topRight.drawRect(0, 0, 8, 8);

    const bottomLeft = new PIXI.Graphics();
    bottomLeft.option = {
      type: "corner",
      dir: "sw",
    };
    bottomLeft.interactive = true;
    bottomLeft.buttonMode = true;
    bottomLeft.cursor = "nesw-resize";
    bottomLeft.beginFill(0xffffff);
    bottomLeft.drawRect(0, 0, 8, 8);
    bottomLeft.endFill();
    bottomLeft.lineStyle(1, 0x337cd6, 1, 0);
    bottomLeft.drawRect(0, 0, 8, 8);

    const bottomRight = new PIXI.Graphics();
    bottomRight.option = {
      type: "corner",
      dir: "se",
    };
    bottomRight.interactive = true;
    bottomRight.buttonMode = true;
    bottomRight.cursor = "nwse-resize";
    bottomRight.beginFill(0xffffff);
    bottomRight.drawRect(0, 0, 8, 8);
    bottomRight.endFill();
    bottomRight.lineStyle(1, 0x337cd6, 1, 0);
    bottomRight.drawRect(0, 0, 8, 8);

    this.selectlayer.addChild(top);
    this.selectlayer.addChild(bottom);
    this.selectlayer.addChild(left);
    this.selectlayer.addChild(right);
    this.selectlayer.addChild(topLeft);
    this.selectlayer.addChild(topRight);
    this.selectlayer.addChild(bottomLeft);
    this.selectlayer.addChild(bottomRight);
    this.selectlayer.top = top;
    this.selectlayer.bottom = bottom;
    this.selectlayer.left = left;
    this.selectlayer.right = right;
    this.selectlayer.topLeft = topLeft;
    this.selectlayer.topRight = topRight;
    this.selectlayer.bottomLeft = bottomLeft;
    this.selectlayer.bottomRight = bottomRight;

    this.app.stage.addChild(this.selectlayer);
  };

  showSelect = (x, y, width, height) => {
    const {
      top,
      bottom,
      left,
      right,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    } = this.selectlayer;
    this.selectlayer.visible = true;

    top.clear();
    top.beginFill(0x333333, 0.01);
    top.drawRect(0, 0, width, 8);
    top.endFill();
    top.lineStyle(1, 0x337cd6, 1, 0);
    top.drawRect(0, 3, width, 1);
    top.x = x;
    top.y = y - 3;

    bottom.clear();
    bottom.beginFill(0x333333, 0.01);
    bottom.drawRect(0, 0, width, 8);
    bottom.endFill();
    bottom.lineStyle(1, 0x337cd6, 1, 0);
    bottom.drawRect(0, 4, width, 1);
    bottom.x = x;
    bottom.y = y - 5 + height;

    left.clear();
    left.beginFill(0x333333, 0.01);
    left.drawRect(0, 0, 8, height);
    left.endFill();
    left.lineStyle(1, 0x337cd6, 1, 0);
    left.drawRect(3, 0, 1, height);
    left.x = x - 3;
    left.y = y;

    right.clear();
    right.beginFill(0x333333, 0.01);
    right.drawRect(0, 0, 8, height);
    right.endFill();
    right.lineStyle(1, 0x337cd6, 1, 0);
    right.drawRect(4, 0, 1, height);
    right.x = x - 5 + width;
    right.y = y;

    topLeft.x = x - 3;
    topLeft.y = y - 3;

    topRight.x = x - 5 + width;
    topRight.y = y - 3;

    bottomLeft.x = x - 3;
    bottomLeft.y = y - 5 + height;

    bottomRight.x = x - 5 + width;
    bottomRight.y = y - 5 + height;
  };

  hideSelect = () => {
    this.selectlayer.visible = false;
  };

  initHoverlayer = () => {
    this.hoverlayer = new PIXI.Graphics();
    this.hoverlayer.visible = false;
    this.app.stage.addChild(this.hoverlayer);
  };

  showHover = (x, y, width, height) => {
    this.hoverlayer.visible = true;
    this.hoverlayer.clear();
    this.hoverlayer.lineStyle(1, 0x337cd6, 1, 0);
    this.hoverlayer.drawRect(0, 0, width, height);
    this.hoverlayer.x = x;
    this.hoverlayer.y = y;
  };

  hideHover = () => {
    this.hoverlayer.visible = false;
  };

  initBoxSelectlayer = () => {
    this.boxselectlayer = new PIXI.Graphics();
    this.boxselectlayer.visible = false;
    this.app.stage.addChild(this.boxselectlayer);
  };

  showBoxSelectlayer = (x, y, width, height) => {
    this.boxselectlayer.visible = true;
    this.boxselectlayer.clear();
    this.boxselectlayer.beginFill(0x337cd6, 0.3);
    this.boxselectlayer.drawRect(0, 0, width, height);
    this.boxselectlayer.endFill();
    this.boxselectlayer.lineStyle(1, 0x337cd6, 1, 0);
    this.boxselectlayer.drawRect(0, 0, width, height);
    this.boxselectlayer.x = x;
    this.boxselectlayer.y = y;
  };

  hideBoxSelectlayer = () => {
    this.boxselectlayer.visible = false;
  };

  initCreatelayer = () => {
    this.createlayer = new PIXI.Graphics();
    this.createlayer.visible = false;
    this.app.stage.addChild(this.createlayer);
  };

  showCreatelayer = (x, y, width, height) => {
    this.createlayer.visible = true;
    this.createlayer.clear();
    this.createlayer.beginFill(0x337cd6, 0.3);
    this.createlayer.drawRect(0, 0, width, height);
    this.createlayer.endFill();
    this.createlayer.lineStyle(1, 0x337cd6, 1, 0);
    this.createlayer.drawRect(0, 0, width, height);
    this.createlayer.x = x;
    this.createlayer.y = y;
  };

  hideCreatelayer = () => {
    this.createlayer.visible = false;
  };

  initRenderlayer = () => {
    this.renderlayer = new PIXI.Container();
    const node = this._cycleRender(this.props.json);
    this.renderlayer.addChild(node);
    this.app.stage.addChild(this.renderlayer);
  };

  _cycleRender = (json) => {
    const { select, hover, dispatch } = this.props;
    const { type, children = [], x, y } = json;
    const node = new objects[type](json, {
      select,
      hover,
      dispatch,
    }); // displayobject

    // const container = new PIXI.Container();
    // container.x = x;
    // container.y = y;
    // container.node = node;
    // container.addChild(node);

    // const tool = new PIXI.Container();
    // container.tool = tool;
    // container.addChild(tool);

    // const basicText = new PIXI.Text(type === "frame" ? "frame" : "", style);
    // basicText.x = 0;
    // basicText.y = -18;
    // tool.addChild(basicText);

    children.forEach((child) => {
      const childnode = this._cycleRender(child);
      node.addChild(childnode);
    });
    return node;
  };

  diff = (parent, index = 0, oldjson, newjson) => {
    if (!oldjson && newjson) {
      const node = this._cycleRender(newjson);
      parent.addChildAt(node, index);
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
          const childnode = this._cycleRender(child);
          node.addChild(childnode);
        });
      } else {
        const { select, hover, dispatch } = this.props;
        const { type, children = [] } = newjson;

        const node = parent.getChildAt(index);
        node._update &&
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
    PIXI.utils.skipHello();
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

    this.initRenderlayer();
    this.initSelectlayer();
    this.initHoverlayer();
    this.initBoxSelectlayer();
    this.initCreatelayer();

    this.app.renderer.plugins.interaction.on("mousedown", this.onMouseDown);
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }

  componentDidUpdate(props) {
    const jsonupdate = this.props.json !== props.json;
    const selectupdate = this.props.select !== props.select;
    const hoverupdate = this.props.hover !== props.hover;
    if (jsonupdate) {
      this.diff(this.renderlayer, 0, props.json, this.props.json);
    }

    if (selectupdate) {
      const id = this.props.select[0];
      if (id) {
        const res = jsonutils.searchIns(this.renderlayer, id);

        if (res) {
          const bound = res.getBounds();
          this.showSelect(bound.x, bound.y, bound.width, bound.height);
        } else {
          this.hideSelect();
        }
      } else {
        this.hideSelect();
      }
    }
    if (jsonupdate || selectupdate || hoverupdate) {
      const id = this.props.hover[0];
      if (id) {
        const res = jsonutils.searchIns(this.renderlayer, id);

        if (res && this.props.select.indexOf(id) < 0) {
          const globalPosition = res.getGlobalPosition();
          this.showHover(
            globalPosition.x,
            globalPosition.y,
            res.option.width,
            res.option.height
          );
        } else {
          this.hideHover();
        }
      } else {
        this.hideHover();
      }
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
        onMouseMove={this.onHover}
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
