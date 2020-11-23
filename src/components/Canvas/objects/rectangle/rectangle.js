import * as PIXI from 'pixi.js';
import * as graphicsutils from '../../utils/graphics';

class Rectangle extends PIXI.Graphics {
  constructor(option, props) {
    super();
    this._update(option, props);
  }

  _update = (option, props) => {
    const {
      id,
      x,
      y,
      background = ['#cccccc'],
      width,
      height,
      alpha = 1,
      angle
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
    this.angle = angle;
    this.interactive = true;
    this.buttonMode = true;
    this.pivot.x = width / 2;
    this.pivot.y = height / 2;
    /* <--   --> */
    // if (select.indexOf(id) > -1) {
    //   graphicsutils.select(this, 0, 0, width, height);
    // }
  };

  _updateTransform = option => {
    const {
      x = this.option.x,
      y = this.option.y,
      width = this.option.width,
      height = this.option.height,
      angle = this.option.angle
    } = option;
    const { background = ['#cccccc'] } = this.option;
    this.clear();
    this.beginFill(PIXI.utils.string2hex(background[0]));
    this.drawRect(0, 0, width, height);
    this.endFill();
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.pivot.x = width / 2;
    this.pivot.y = height / 2;
  };
}

export default Rectangle;
