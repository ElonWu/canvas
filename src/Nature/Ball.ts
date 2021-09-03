import Brush, { StyleOptions } from '@/Canvas/Brush';
import Mover, { MoverProps } from '@/Nature/Mover';

interface BallProps extends MoverProps {
  size: number;
}

class Ball extends Mover {
  public size: number;

  constructor({ size, ...moverProps }: BallProps) {
    super(moverProps);
    this.size = size;
  }

  paint(brush: Brush, options: StyleOptions) {
    brush.styleCirclePath(
      { x: this.position.x, y: this.position.y, radius: this.size },
      options,
    );
  }
}

export default Ball;
