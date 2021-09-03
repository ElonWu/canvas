export interface RectPath {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface RoundedRectPath extends RectPath {
  radius: number;
}

export interface CirclePath {
  x: number;
  y: number;
  radius: number;
}

export interface ArcPath {
  x: number;
  y: number;
  radius: number;
  start: number;
  end: number;
  anticlockwise?: boolean;
}

export interface StyleOptions {
  fillStyle?: CanvasRenderingContext2D['fillStyle'];
  strokeStyle?: CanvasRenderingContext2D['strokeStyle'];
  dash?: Array<number>;
}

export interface BrushInterface {
  ctx: CanvasRenderingContext2D;

  fill: (
    path: Path2D,
    fillStyle: CanvasRenderingContext2D['fillStyle'],
  ) => void;
  stroke: (
    path: Path2D,
    strokeStyle: CanvasRenderingContext2D['strokeStyle'],
  ) => void;
  style: (path: Path2D, options: StyleOptions) => void;

  drawPath: (path: string) => Path2D;
  drawRectPath: (params: RectPath) => Path2D;
  drawRoundedRectPath: (params: RoundedRectPath) => Path2D;
  drawArcPath: (params: ArcPath) => Path2D;
  drawCirclePath: (params: CirclePath) => Path2D;

  stylePath: (path: string, options: StyleOptions) => void;
  styleRectPath: (params: RectPath, options: StyleOptions) => void;
  styleRoundedRectPath: (
    params: RoundedRectPath,
    options: StyleOptions,
  ) => void;
  styleArcPath: (params: ArcPath, options: StyleOptions) => void;
  styleCirclePath: (params: CirclePath, options: StyleOptions) => void;
}

class Brush implements BrushInterface {
  public ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  /**
   * 添加样式
   */
  // 填充路径
  public fill(
    path: Path2D,
    fillStyle: CanvasRenderingContext2D['fillStyle'],
  ): void {
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill(path);
  }

  // 描边路径
  public stroke(
    path: Path2D,
    strokeStyle: CanvasRenderingContext2D['strokeStyle'],
    dash?: Array<number>,
  ): void {
    // 是否虚线
    this.ctx.setLineDash(dash || []);

    this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke(path);
  }

  // 添加样式
  public style(path: Path2D, options: StyleOptions): void {
    if (options?.fillStyle) {
      this.fill(path, options.fillStyle);
    }

    if (options?.strokeStyle) {
      this.stroke(path, options.strokeStyle, options.dash);
    }
  }

  /**
   * 绘制路径
   */
  // 绘制路径
  public drawPath(path: string): Path2D {
    return new Path2D(path);
  }

  // 绘制 矩形 路径
  public drawRectPath(params: RectPath): Path2D {
    return this.drawRoundedRectPath(Object.assign({ radius: 0 }, params));
  }

  // 绘制 圆角矩形 路径
  public drawRoundedRectPath({
    x,
    y,
    width,
    height,
    radius,
  }: RoundedRectPath): Path2D {
    return this.drawPath(`
      M ${x} ${y + radius}
      L ${x} ${y + height - radius}
      Q ${x} ${y + height}, ${x + radius} ${y + height}
      L ${x + width - radius} ${y + height}
      Q ${x + width} ${y + height}, ${x + width} ${y + height - radius}
      L ${x + width} ${y + radius}
      Q ${x + width} ${y}, ${x + width - radius} ${y}
      L ${x + radius} ${y}
      Q ${x} ${y}, ${x} ${y + radius}
      Z
    `);
  }

  // 绘制 弧形 路径
  public drawArcPath({
    x,
    y,
    radius,
    start,
    end,
    anticlockwise,
  }: ArcPath): Path2D {
    const path = new Path2D();

    path.arc(x, y, radius, start, end, anticlockwise);

    return path;
  }

  // 绘制 圆形 路径
  public drawCirclePath(params: CirclePath): Path2D {
    return this.drawArcPath(
      Object.assign({ start: 0, end: Math.PI * 2 }, params),
    );
  }

  /**
   * 绘制路径并直接添加样式
   */
  public stylePath(params: string, options: StyleOptions): void {
    const pathToFill: Path2D = this.drawPath(params);
    this.style(pathToFill, options);
  }

  public styleRectPath(params: RectPath, options: StyleOptions): void {
    const pathToFill: Path2D = this.drawRectPath(params);
    this.style(pathToFill, options);
  }

  public styleRoundedRectPath(
    params: RoundedRectPath,
    options: StyleOptions,
  ): void {
    const pathToFill: Path2D = this.drawRoundedRectPath(params);
    this.style(pathToFill, options);
  }

  public styleArcPath(params: ArcPath, options: StyleOptions): void {
    const pathToFill: Path2D = this.drawArcPath(params);
    this.style(pathToFill, options);
  }

  public styleCirclePath(params: CirclePath, options: StyleOptions): void {
    const pathToFill: Path2D = this.drawCirclePath(params);
    this.style(pathToFill, options);
  }
}

export default Brush;
