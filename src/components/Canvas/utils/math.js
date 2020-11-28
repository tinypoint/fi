export const calcAngle = (dx, dy) => {
  if (dx >= 0) {
    if (dy <= 0) {
      return (Math.atan(-dy / dx) * 180) / Math.PI;
    } else {
      return -(Math.atan(dy / dx) * 180) / Math.PI;
    }
  } else {
    if (dy <= 0) {
      return 180 - (Math.atan(dy / dx) * 180) / Math.PI;
    } else {
      return -180 + (Math.atan(dy / -dx) * 180) / Math.PI;
    }
  }
};

export const limitAngle = (angle) => {
  while (angle > 180 || angle < -180) {
    if (angle > 180) {
      angle -= 360;
    } else if (angle < -180) {
      angle += 360;
    }
  }
  return angle;
};
