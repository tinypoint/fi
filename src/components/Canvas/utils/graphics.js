export const select = (graphics, x, y, width, height) => {
  graphics.lineStyle(1, 0x11bb56, 1, 0);
  graphics.drawRect(x, y, width, height);
  graphics.beginFill(0xffffff);
  graphics.drawRect(x - 3, y - 3, 8, 8);
  graphics.endFill();
  graphics.beginFill(0xffffff);
  graphics.drawRect(x + width - 5, y - 3, 8, 8);
  graphics.endFill();
  graphics.beginFill(0xffffff);
  graphics.drawRect(x - 3, y + height - 5, 8, 8);
  graphics.endFill();
  graphics.beginFill(0xffffff);
  graphics.drawRect(x + width - 5, y + height - 5, 8, 8);
  graphics.endFill();
};
