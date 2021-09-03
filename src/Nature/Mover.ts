import Vector from './Vecter';

export interface MoverProps {
  position?: Vector; // 向量坐标
  velocity?: Vector; // 速度
  forces?: Array<Vector>; // 受力集合

  m: number;
}

class Mover {
  private fps: number = 60;

  public position: Vector;
  public velocity: Vector;
  public m: number;

  public forces: Array<Vector>;

  constructor(props: MoverProps) {
    this.m = props.m || 0;
    this.position = props.position || new Vector(0, 0);
    this.velocity = props.velocity || new Vector(0, 0);

    this.forces = props.forces || [];
  }

  // 合力
  get totalForce(): Vector {
    return this.forces.reduce(
      (accu: Vector, curr: Vector) => accu.add(curr),
      new Vector(0, 0),
    );
  }

  // 加速度
  get acceleration(): Vector {
    return this.totalForce.scale(1 / this.m);
  }

  // 重置受力
  public resetForce(forces: undefined | Array<Vector>): void {
    this.forces = forces || [];
  }

  // 增加受力
  public addForce(force: Vector): void {
    this.forces.push(force);
  }

  // 减少受力
  public removeForce(target: Vector): void {
    this.forces = this.forces.filter((force) => force !== target);
  }

  // 触发更新
  public update<T extends Mover>(
    this: T,
    callback: (instance: T) => void,
  ): void {
    const deltaTime = 1 / this.fps;

    this.velocity.add(this.acceleration.scale(deltaTime));
    this.position.add(this.velocity.scale(deltaTime * 1000));

    callback(this);
  }
}

export default Mover;
