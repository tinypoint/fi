import * as PIXI from "pixi.js";

class Artboard extends PIXI.Container {
  constructor(option, props) {
    super();
    this._update(option, props);
  }

  _update = (option, props) => {
    const { x, y, alpha = 1 } = option;
    this.option = option;
    this.props = props;
    this.x = x;
    this.y = y;
    this.alpha = alpha;
  };
}

export default Artboard;
