class Vector {
  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  public norm(): Vector {
    return new Vector(this.x / this.length, this.y / this.length);
  }

  public add(vector: Vector): Vector {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  public minus(vector: Vector): Vector {
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }

  public times(num: number): Vector {
    this.x *= num;
    this.y *= num;
    return this;
  }

  public divide(num: number): Vector {
    this.x /= num;
    this.y /= num;
    return this;
  }
}

export default Vector;
