"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CELL = 20;
const COLS = 18;
const ROWS = 12;

type Point = { x: number; y: number };

const initialSnake = (): Point[] => [
  { x: 5, y: 6 },
  { x: 4, y: 6 },
  { x: 3, y: 6 }
];

const randomFood = (snake: Point[]) => {
  while (true) {
    const point = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!snake.some((segment) => segment.x === point.x && segment.y === point.y)) return point;
  }
};

export function SnakeArcade({ compact = false }: { compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Point[]>(initialSnake);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>(() => randomFood(initialSnake()));
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const [best, setBest] = useState(0);
  const snakeRef = useRef<Point[]>(initialSnake());
  const directionRef = useRef<Point>({ x: 1, y: 0 });
  const foodRef = useRef<Point>(randomFood(initialSnake()));
  const scoreRef = useRef(0);
  const runningRef = useRef(true);
  const bestRef = useRef(0);

  useEffect(() => {
    const saved = Number(window.localStorage.getItem("jcbk-snake-best") || 0);
    setBest(saved);
    bestRef.current = saved;
  }, []);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    bestRef.current = best;
  }, [best]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") setDirection((d) => (d.y === 1 ? d : { x: 0, y: -1 }));
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") setDirection((d) => (d.y === -1 ? d : { x: 0, y: 1 }));
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") setDirection((d) => (d.x === 1 ? d : { x: -1, y: 0 }));
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") setDirection((d) => (d.x === -1 ? d : { x: 1, y: 0 }));
      if (event.key.toLowerCase() === "r") restart();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const restart = useCallback(() => {
    const fresh = initialSnake();
    snakeRef.current = fresh;
    directionRef.current = { x: 1, y: 0 };
    const nextFood = randomFood(fresh);
    foodRef.current = nextFood;
    scoreRef.current = 0;
    runningRef.current = true;
    setSnake(fresh);
    setDirection({ x: 1, y: 0 });
    setFood(nextFood);
    setScore(0);
    setRunning(true);
  }, []);

  const tick = useCallback(() => {
    if (!runningRef.current) return;

    const current = snakeRef.current;
    const currentDirection = directionRef.current;
    const currentFood = foodRef.current;
    const head = current[0];
    const next = { x: head.x + currentDirection.x, y: head.y + currentDirection.y };

    if (
      next.x < 0 ||
      next.x >= COLS ||
      next.y < 0 ||
      next.y >= ROWS ||
      current.some((segment) => segment.x === next.x && segment.y === next.y)
    ) {
      runningRef.current = false;
      setRunning(false);
      return;
    }

    const grown = [next, ...current];

    if (next.x === currentFood.x && next.y === currentFood.y) {
      const newScore = scoreRef.current + 1;
      scoreRef.current = newScore;
      setScore(newScore);

      const nextBest = newScore > bestRef.current ? newScore : bestRef.current;
      bestRef.current = nextBest;
      setBest(nextBest);
      window.localStorage.setItem("jcbk-snake-best", String(nextBest));

      const nextFood = randomFood(grown);
      foodRef.current = nextFood;
      setFood(nextFood);
      snakeRef.current = grown;
      setSnake(grown);
      return;
    }

    grown.pop();
    snakeRef.current = grown;
    setSnake(grown);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      tick();
    }, compact ? 130 : 110);

    return () => window.clearInterval(timer);
  }, [compact, running, tick]);

  useEffect(() => {
    const frameMs = compact ? 130 : 110;
    const gameWindow = window as Window &
      typeof globalThis & {
        render_game_to_text?: () => string;
        advanceTime?: (ms?: number) => void;
      };

    gameWindow.render_game_to_text = () =>
      JSON.stringify({
        mode: runningRef.current ? "live" : "crashed",
        coordinateSystem: "origin top-left; x increases right; y increases down",
        grid: { cols: COLS, rows: ROWS, cell: CELL },
        snake: snakeRef.current,
        food: foodRef.current,
        direction: directionRef.current,
        score: scoreRef.current,
        best: bestRef.current
      });

    gameWindow.advanceTime = (ms = frameMs) => {
      const steps = Math.max(1, Math.round(ms / frameMs));
      for (let index = 0; index < steps; index += 1) {
        tick();
      }
    };

    return () => {
      delete gameWindow.render_game_to_text;
      delete gameWindow.advanceTime;
    };
  }, [compact, tick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#070b16";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < COLS; x += 1) {
      for (let y = 0; y < ROWS; y += 1) {
        context.strokeStyle = "rgba(128, 184, 255, 0.08)";
        context.strokeRect(x * CELL, y * CELL, CELL, CELL);
      }
    }

    context.fillStyle = "#7ef9ff";
    snake.forEach((segment, index) => {
      context.shadowColor = index === 0 ? "#9cff67" : "#3cc8ff";
      context.shadowBlur = index === 0 ? 18 : 10;
      context.fillStyle = index === 0 ? "#9cff67" : "#33d6ff";
      context.fillRect(segment.x * CELL + 2, segment.y * CELL + 2, CELL - 4, CELL - 4);
    });

    context.shadowBlur = 18;
    context.shadowColor = "#ff58dc";
    context.fillStyle = "#ff58dc";
    context.beginPath();
    context.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 3, 0, Math.PI * 2);
    context.fill();
  }, [food, snake]);

  const stateLabel = useMemo(
    () => (running ? "Live" : "Crashed - tap reset and push again"),
    [running]
  );

  return (
    <div className={`snake-card ${compact ? "is-compact" : ""}`}>
      <div className="snake-head">
        <div>
          <p className="eyebrow">Future snake</p>
          <strong>{stateLabel}</strong>
        </div>
        <div className="snake-stats">
          <span>Score {score}</span>
          <span>Best {best}</span>
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        aria-label="Future snake game board"
      />
      <div className="snake-actions">
        <span>Use arrows or WASD</span>
        <button type="button" className="ghost-button" onClick={restart}>
          Reset
        </button>
      </div>
    </div>
  );
}
