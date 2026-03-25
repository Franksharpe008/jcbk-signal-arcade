"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Point = { x: number; y: number };

type GameConfig = {
  cell: number;
  cols: number;
  rows: number;
  tickMs: number;
  slowTickMs: number;
};

const createInitialSnake = (cols: number, rows: number): Point[] => {
  const midX = Math.floor(cols / 2);
  const midY = Math.floor(rows / 2);
  return [
    { x: midX, y: midY },
    { x: midX - 1, y: midY },
    { x: midX - 2, y: midY }
  ];
};

const randomOpenPoint = (cols: number, rows: number, blocked: Point[]) => {
  while (true) {
    const point = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    if (!blocked.some((segment) => segment.x === point.x && segment.y === point.y)) return point;
  }
};

export function SnakeArcade({ compact = false }: { compact?: boolean }) {
  const config = useMemo<GameConfig>(
    () =>
      compact
        ? { cell: 18, cols: 14, rows: 10, tickMs: 155, slowTickMs: 215 }
        : { cell: 20, cols: 18, rows: 12, tickMs: 112, slowTickMs: 178 },
    [compact]
  );
  const initialSnake = useMemo(() => createInitialSnake(config.cols, config.rows), [config.cols, config.rows]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const touchStartRef = useRef<Point | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [snake, setSnake] = useState<Point[]>(initialSnake);
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [food, setFood] = useState<Point>(() => randomOpenPoint(config.cols, config.rows, initialSnake));
  const [powerUp, setPowerUp] = useState<Point | null>(null);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const [best, setBest] = useState(0);
  const [slowTicks, setSlowTicks] = useState(0);

  const snakeRef = useRef<Point[]>(initialSnake);
  const directionRef = useRef<Point>({ x: 1, y: 0 });
  const foodRef = useRef<Point>(randomOpenPoint(config.cols, config.rows, initialSnake));
  const powerUpRef = useRef<Point | null>(null);
  const scoreRef = useRef(0);
  const runningRef = useRef(true);
  const bestRef = useRef(0);
  const slowTicksRef = useRef(0);

  const unlockAudio = useCallback(async () => {
    if (typeof window === "undefined") return null;
    const AudioCtor =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioCtor();
    }
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  const playFx = useCallback(
    async (
      notes: Array<{ frequency: number; duration: number; delay?: number; type?: OscillatorType; gain?: number }>
    ) => {
      const ctx = await unlockAudio();
      if (!ctx) return;
      const now = ctx.currentTime;

      notes.forEach((note) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.type = note.type ?? "sine";
        oscillator.frequency.value = note.frequency;
        gainNode.gain.setValueAtTime(note.gain ?? 0.035, now + (note.delay ?? 0));
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + (note.delay ?? 0) + note.duration);
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.start(now + (note.delay ?? 0));
        oscillator.stop(now + (note.delay ?? 0) + note.duration);
      });
    },
    [unlockAudio]
  );

  useEffect(() => {
    const saved = Number(window.localStorage.getItem("jacob-snake-best") || 0);
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
    powerUpRef.current = powerUp;
  }, [powerUp]);

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
    slowTicksRef.current = slowTicks;
  }, [slowTicks]);

  const setHeading = useCallback((next: Point) => {
    setDirection((current) => {
      if (current.x === -next.x && current.y === -next.y) return current;
      return next;
    });
  }, []);

  const restart = useCallback(() => {
    const fresh = createInitialSnake(config.cols, config.rows);
    const nextFood = randomOpenPoint(config.cols, config.rows, fresh);
    snakeRef.current = fresh;
    directionRef.current = { x: 1, y: 0 };
    foodRef.current = nextFood;
    powerUpRef.current = null;
    scoreRef.current = 0;
    runningRef.current = true;
    slowTicksRef.current = 0;

    setSnake(fresh);
    setDirection({ x: 1, y: 0 });
    setFood(nextFood);
    setPowerUp(null);
    setScore(0);
    setRunning(true);
    setSlowTicks(0);

    void playFx([
      { frequency: 392, duration: 0.08, type: "triangle", gain: 0.028 },
      { frequency: 523, duration: 0.14, delay: 0.07, type: "triangle", gain: 0.03 }
    ]);
  }, [config.cols, config.rows, playFx]);

  const maybeSpawnPowerUp = useCallback(
    (occupied: Point[]) => {
      if (powerUpRef.current || slowTicksRef.current > 0 || scoreRef.current < 1) return null;
      if (Math.random() > 0.16) return null;
      return randomOpenPoint(config.cols, config.rows, occupied);
    },
    [config.cols, config.rows]
  );

  const tick = useCallback(() => {
    if (!runningRef.current) return;

    const current = snakeRef.current;
    const currentDirection = directionRef.current;
    const currentFood = foodRef.current;
    const activePowerUp = powerUpRef.current;
    const head = current[0];
    const next = { x: head.x + currentDirection.x, y: head.y + currentDirection.y };

    if (
      next.x < 0 ||
      next.x >= config.cols ||
      next.y < 0 ||
      next.y >= config.rows ||
      current.some((segment) => segment.x === next.x && segment.y === next.y)
    ) {
      runningRef.current = false;
      setRunning(false);
      void playFx([
        { frequency: 210, duration: 0.22, type: "sawtooth", gain: 0.03 },
        { frequency: 120, duration: 0.28, delay: 0.08, type: "square", gain: 0.022 }
      ]);
      return;
    }

    const grown = [next, ...current];

    if (next.x === currentFood.x && next.y === currentFood.y) {
      const newScore = scoreRef.current + (slowTicksRef.current > 0 ? 2 : 1);
      const nextBest = newScore > bestRef.current ? newScore : bestRef.current;
      const nextFood = randomOpenPoint(config.cols, config.rows, grown);
      const spawned = maybeSpawnPowerUp([...grown, nextFood]);

      scoreRef.current = newScore;
      bestRef.current = nextBest;
      foodRef.current = nextFood;
      powerUpRef.current = spawned;
      snakeRef.current = grown;

      window.localStorage.setItem("jacob-snake-best", String(nextBest));
      setScore(newScore);
      setBest(nextBest);
      setFood(nextFood);
      setPowerUp(spawned);
      setSnake(grown);
      void playFx([
        { frequency: 660, duration: 0.08, type: "triangle", gain: 0.03 },
        { frequency: 880, duration: 0.12, delay: 0.06, type: "triangle", gain: 0.026 }
      ]);
      if (slowTicksRef.current > 0) {
        slowTicksRef.current = Math.max(0, slowTicksRef.current - 1);
        setSlowTicks((value) => Math.max(0, value - 1));
      }
      return;
    }

    if (activePowerUp && next.x === activePowerUp.x && next.y === activePowerUp.y) {
      const boostedScore = scoreRef.current + 2;
      scoreRef.current = boostedScore;
      slowTicksRef.current = 42;
      powerUpRef.current = null;
      snakeRef.current = grown;

      setScore(boostedScore);
      setPowerUp(null);
      setSnake(grown);
      setSlowTicks(42);
      void playFx([
        { frequency: 392, duration: 0.08, type: "triangle", gain: 0.026 },
        { frequency: 523, duration: 0.12, delay: 0.05, type: "triangle", gain: 0.026 },
        { frequency: 784, duration: 0.14, delay: 0.12, type: "triangle", gain: 0.026 }
      ]);
      return;
    }

    grown.pop();
    snakeRef.current = grown;
    setSnake(grown);

    if (slowTicksRef.current > 0) {
      slowTicksRef.current = slowTicksRef.current - 1;
      setSlowTicks((value) => Math.max(0, value - 1));
    }
  }, [config.cols, config.rows, maybeSpawnPowerUp, playFx]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      void unlockAudio();
      if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") setHeading({ x: 0, y: -1 });
      if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") setHeading({ x: 0, y: 1 });
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") setHeading({ x: -1, y: 0 });
      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") setHeading({ x: 1, y: 0 });
      if (event.key.toLowerCase() === "r") restart();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart, setHeading, unlockAudio]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      tick();
    }, slowTicks > 0 ? config.slowTickMs : config.tickMs);

    return () => window.clearInterval(timer);
  }, [config.slowTickMs, config.tickMs, running, slowTicks, tick]);

  useEffect(() => {
    const frameMs = slowTicksRef.current > 0 ? config.slowTickMs : config.tickMs;
    const gameWindow = window as Window &
      typeof globalThis & {
        render_game_to_text?: () => string;
        advanceTime?: (ms?: number) => void;
      };

    gameWindow.render_game_to_text = () =>
      JSON.stringify({
        mode: runningRef.current ? "live" : "crashed",
        coordinateSystem: "origin top-left; x increases right; y increases down",
        grid: { cols: config.cols, rows: config.rows, cell: config.cell },
        snake: snakeRef.current,
        food: foodRef.current,
        powerUp: powerUpRef.current,
        direction: directionRef.current,
        score: scoreRef.current,
        best: bestRef.current,
        slowTicks: slowTicksRef.current
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
  }, [config.cell, config.cols, config.rows, config.slowTickMs, config.tickMs, tick]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#070b16";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < config.cols; x += 1) {
      for (let y = 0; y < config.rows; y += 1) {
        context.strokeStyle = "rgba(128, 184, 255, 0.08)";
        context.strokeRect(x * config.cell, y * config.cell, config.cell, config.cell);
      }
    }

    if (slowTicks > 0) {
      context.fillStyle = "rgba(137, 255, 213, 0.08)";
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    snake.forEach((segment, index) => {
      context.shadowColor = index === 0 ? (slowTicks > 0 ? "#fff07f" : "#9cff67") : "#3cc8ff";
      context.shadowBlur = index === 0 ? 18 : 10;
      context.fillStyle = index === 0 ? (slowTicks > 0 ? "#fff07f" : "#9cff67") : "#33d6ff";
      context.fillRect(segment.x * config.cell + 2, segment.y * config.cell + 2, config.cell - 4, config.cell - 4);
    });

    context.shadowBlur = 18;
    context.shadowColor = "#ff58dc";
    context.fillStyle = "#ff58dc";
    context.beginPath();
    context.arc(
      food.x * config.cell + config.cell / 2,
      food.y * config.cell + config.cell / 2,
      config.cell / 3,
      0,
      Math.PI * 2
    );
    context.fill();

    if (powerUp) {
      const pulse = 0.62 + Math.sin(Date.now() / 180) * 0.14;
      context.shadowBlur = 22;
      context.shadowColor = "#7ef9ff";
      context.fillStyle = `rgba(126, 249, 255, ${pulse})`;
      context.beginPath();
      context.arc(
        powerUp.x * config.cell + config.cell / 2,
        powerUp.y * config.cell + config.cell / 2,
        config.cell / 2.8,
        0,
        Math.PI * 2
      );
      context.fill();
    }
  }, [config.cell, config.cols, config.rows, food, powerUp, slowTicks, snake]);

  const stateLabel = useMemo(
    () => (running ? (slowTicks > 0 ? "Slow-motion live" : "Live") : "Crashed - tap reset and push again"),
    [running, slowTicks]
  );
  const slowRatio = Math.min(1, slowTicks / 42);

  const triggerDirection = async (next: Point) => {
    await unlockAudio();
    setHeading(next);
  };

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = async (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    if (!start || !touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    touchStartRef.current = null;

    if (Math.abs(dx) < 16 && Math.abs(dy) < 16) return;
    if (Math.abs(dx) > Math.abs(dy)) {
      await triggerDirection(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
      return;
    }
    await triggerDirection(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
  };

  return (
    <div className={`snake-card ${compact ? "is-compact" : ""}`} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="snake-head">
        <div>
          <p className="eyebrow">Future snake</p>
          <strong>{stateLabel}</strong>
        </div>
        <div className="snake-stats">
          <span>Score {score}</span>
          <span>Best {best}</span>
          <span>{slowTicks > 0 ? `Slow ${slowTicks}` : "Power idle"}</span>
        </div>
      </div>
      <div className="snake-meter" aria-hidden="true">
        <div className="snake-meter-fill" style={{ width: `${slowRatio * 100}%` }} />
      </div>
      <canvas
        ref={canvasRef}
        width={config.cols * config.cell}
        height={config.rows * config.cell}
        aria-label="Future snake game board"
      />
      <div className="snake-pad" aria-label="Snake touch controls">
        <button type="button" className="snake-pad-button snake-pad-up" onClick={() => void triggerDirection({ x: 0, y: -1 })}>
          Up
        </button>
        <button type="button" className="snake-pad-button snake-pad-left" onClick={() => void triggerDirection({ x: -1, y: 0 })}>
          Left
        </button>
        <button type="button" className="snake-pad-button snake-pad-right" onClick={() => void triggerDirection({ x: 1, y: 0 })}>
          Right
        </button>
        <button type="button" className="snake-pad-button snake-pad-down" onClick={() => void triggerDirection({ x: 0, y: 1 })}>
          Down
        </button>
      </div>
      <div className="snake-actions">
        <span>Use arrows, WASD, or touch. Cyan orb triggers slow motion.</span>
        <button type="button" className="ghost-button" onClick={restart}>
          Reset
        </button>
      </div>
    </div>
  );
}
