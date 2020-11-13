import * as PIXI from "pixi.js";

class Artboard extends PIXI.Container {
  constructor(option) {
    super();
    const { x, y, alpha = 1 } = option;
    this.x = x;
    this.y = y;
    this.alpha = alpha;
  }
}

export default Artboard;
