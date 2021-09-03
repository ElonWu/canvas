import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import Canvas from '@/Canvas';
import Brush, { ArcPath, StyleOptions } from '@/Canvas/Brush';
import Ball from '@/Nature/Ball';
import Vector from '@/Nature/Vector';

const BallPaint = () => {
  const pinRef = useRef(
    new Ball({
      m: 100,
      size: 5,
      position: new Vector(200, 80),
    }),
  );

  const ballRef = useRef(
    new Ball({
      m: 50,
      size: 15,
      position: new Vector(320, 300),
    }),
  );

  const paint = (brush: Brush) => {
    const pin = pinRef.current;
    const ball = ballRef.current;

    // 重力
    const g = 9.806;
    const gravity = new Vector(0, g * ball.m);

    // 计算弹力
    const elastic = 3; // 弹性系数
    const distance = pin.position.diff(ball.position);
    const elasticForce = distance.scale(elastic);

    // 增加摩擦力
    const fraction = 0.75;
    const fractionForce = elasticForce.combine(gravity).scale(-fraction);

    ball.resetForce([gravity, elasticForce, fractionForce]);

    // 绘制连线
    brush.styleLine(
      {
        x1: pin.position.x,
        y1: pin.position.y,
        x2: ball.position.x,
        y2: ball.position.y,
      },
      { strokeStyle: '#444444' },
    );
    // 绘制图钉
    pin.paint(brush, { fillStyle: '#f43654', strokeStyle: '#666666' });
    // 绘制球体
    ball.update<Ball>((ball) =>
      ball.paint(brush, { fillStyle: '#3f46f4', strokeStyle: '#666666' }),
    );
  };

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const brush = new Brush(ctx);

    // 绘制背景
    brush.styleRoundedRectPath(
      {
        x: 10,
        y: 10,
        width: 380,
        height: 380,
        radius: 16,
      },
      { fillStyle: '#8CBDFF' },
    );

    paint(brush);
  }, []);

  return <Canvas draw={draw} options={{ width: 400, height: 400 }} />;
};

export default BallPaint;
