import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import Canvas from '@/Canvas';
import Brush, { ArcPath, StyleOptions } from '@/Canvas/Brush';
import Ball from './Ball';
import Vector from '@/Nature/Vecter';

const BallPaint = () => {
  const onKeyDown = (e: KeyboardEvent) => {
    const ball = ballOneRef.current;

    const step = 500;

    switch (e.key) {
      case 'ArrowUp':
        ball.addForce(new Vector(0, -step));
        break;
      case 'ArrowDown':
        ball.addForce(new Vector(0, step));
        break;
      case 'ArrowLeft':
        ball.addForce(new Vector(-step, 0));
        break;
      case 'ArrowRight':
        ball.addForce(new Vector(step, 0));
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const ballOneRef = useRef(
    new Ball({
      m: 5,
      size: 30,
      position: new Vector(200, 200),
    }),
  );

  const ballTwoRef = useRef(
    new Ball({
      m: 5,
      size: 30,
      position: new Vector(50, 50),
      forces: [new Vector(800, 800)],
    }),
  );

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

    const ballOne = ballOneRef.current,
      ballTwo = ballTwoRef.current;

    ballOne.update<Ball>((ball) =>
      ball.paint(brush, { fillStyle: '#3f46f4', strokeStyle: '#666666' }),
    );

    ballTwo.update<Ball>((ball) =>
      ball.paint(brush, { fillStyle: '#23772a', strokeStyle: '#666666' }),
    );
  }, []);

  return <Canvas draw={draw} options={{ width: 400, height: 400 }} />;
};

export default BallPaint;
