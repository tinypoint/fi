import * as PIXI from "pixi.js";
import { select, propchange } from "../../canvasSlice";

class Rectangle extends PIXI.Graphics {
  constructor(option, props) {
    super();
    const {
      id,
      x,
      y,
      background = ["#cccccc"],
      width,
      height,
      alpha = 1,
    } = option;
    const { select = [] } = props;
    this.option = option;
    this.props = props;
    this.beginFill(PIXI.utils.string2hex(background[0]));
    this.drawRect(0, 0, width, height);
    this.endFill();
    this.x = x;
    this.y = y;
    this.alpha = alpha;
    this.interactive = true;
    this.buttonMode = true;

    /* <--   --> */
    if (select.indexOf(id) > -1) {
      this.lineStyle(1, 0xaa00cc, 1, 0);
      this.drawRect(0, 0, width, height);
    }

    // this.on("mouseover", this.onmouseover);
    // this.on("mouseout", this.onmouseout);
    // this.on("mouseupoutside", this.onmouseout);
    this.on("mousedown", this.onmousedown);
    this.on("mousemove", this.onmousemove);
    this.on("mouseup", this.onmouseup);
    this.on("click", this.onclick);
  }

  onmouseover = (event) => {
    this.alpha = 0.5;
  };

  onmouseout = (event) => {
    this.alpha = 1;
  };

  onclick = (event) => {
    event.stopPropagation();
    this.props.dispatch(select(this.option.id));
  };

  dragging = false;

  onmousedown = (event) => {
    event.stopPropagation();
    this.dragging = true;
    this.startx = event.data.global.x;
    this.starty = event.data.global.y;
  };

  onmousemove = (event) => {
    if (!this.dragging) {
      return;
    }
    const movex = event.data.global.x - this.startx;
    const movey = event.data.global.y - this.starty;
    this.x = this.option.x + movex;
    this.y = this.option.y + movey;
    // console.log(event.data.global);
  }

  onmouseup = (event) => {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
    this.props.dispatch(propchange({
      id: this.option.id,
      x: this.x,
      y: this.y
    }));
  };
}

export default Rectangle;
