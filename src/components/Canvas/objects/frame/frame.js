import * as PIXI from "pixi.js";
import * as graphicsutils from "../../utils/graphics";

class Frame extends PIXI.Graphics {
  constructor(option, props) {
    super();
    this._update(option, props);
  }

  _update = (option, props) => {
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
    this.clear();
    this.beginFill(PIXI.utils.string2hex(background[0]));
    this.drawRect(0, 0, width, height);
    this.endFill();
    this.x = x;
    this.y = y;
    this.alpha = alpha;
    this.interactive = true;
    // this.buttonMode = true;

    /* <--   --> */
    // if (select.indexOf(id) > -1) {
    //   graphicsutils.select(this, 0, 0, width, height);
    // }
  };
}

export default Frame;
