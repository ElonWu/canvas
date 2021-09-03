import * as React from 'react';
import { RefObject, useEffect, useRef, useState, useCallback } from 'react';

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D, canvas?: HTMLCanvasElement) => void;
  options?: { width: number; height: number };
}

const useCanvas = (
  paint: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void,
  options: { width: number; height: number },
) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = options;

    // 适配显示器分辨率
    const scale = window.devicePixelRatio;

    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(height * scale);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(scale, scale);

    // 调用绘图回调函数
    paint(canvas, ctx);
  }, [paint, options]);

  return canvasRef;
};

const Canvas: React.FC<CanvasProps> = ({
  draw,
  options: { width, height },
}: CanvasProps) => {
  const frameRef = useRef(0);

  useEffect(() => {
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const paint = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      const paintFrame = () => {
        // console.log(`Paint Frame ${frameRef.current}`);

        // 清空上次绘制
        ctx.clearRect(0, 0, width, height);
        // 绘制
        draw(ctx, canvas);
        // 触发下一帧
        frameRef.current = requestAnimationFrame(paintFrame);
      };
      frameRef.current = requestAnimationFrame(paintFrame);
    },
    [draw],
  );

  const canvasRef: RefObject<HTMLCanvasElement> = useCanvas(paint, {
    width,
    height,
  });

  return <canvas ref={canvasRef} />;
};

export default Canvas;
