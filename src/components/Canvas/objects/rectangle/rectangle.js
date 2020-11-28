import * as PIXI from "pixi.js";
import * as graphicsutils from "../../utils/graphics";

class Rectangle extends PIXI.Graphics {
  constructor(option) {
    super();
    this._update(option);
  }

  _update = (option, props) => {
    this.option = option;
    this._updateTransform(option);
  };

  _updateTransform = (option) => {
    const {
      x = this.option.x,
      y = this.option.y,
      width = this.option.width,
      height = this.option.height,
      angle = this.option.angle,
      alpha = this.option.alpha,
      visible = this.option.visible,
      backgrounds = this.option.backgrounds,
      strokes = this.option.strokes,
      strokeAlignment = this.option.strokeAlignment,
      strokeWidth = this.option.strokeWidth,
    } = option;

    this.clear();
    this.beginFill(0xffffff, 0.001);
    this.drawRect(0, 0, width, height);
    this.endFill();

    if (backgrounds.length) {
      backgrounds.forEach((background) => {
        if (!background.visible) {
          return;
        }
        this.beginFill(
          PIXI.utils.string2hex(background.color),
          background.alpha
        );
        this.drawRect(0, 0, width, height);
        this.endFill();
      });
    }

    if (strokes.length) {
      strokes.forEach((stroke) => {
        if (!stroke.visible) {
          return;
        }
        this.lineStyle(
          stroke.width,
          PIXI.utils.string2hex(stroke.color),
          strokeWidth,
          strokeAlignment
        );
        this.drawRect(0, 0, width, height);
      });
    }

    this.x = x + width / 2;
    this.y = y + height / 2;
    this.alpha = alpha;
    this.visible = visible;
    this.angle = -angle;
    this.interactive = true;
    this.buttonMode = true;
    this.pivot.x = width / 2;
    this.pivot.y = height / 2;
  };
}

export default Rectangle;
