"use client";

type AnimatedWordProps = {
  text: string;
  className?: string;
};

export function AnimatedWord({ text, className = "" }: AnimatedWordProps) {
  return (
    <span className={`animated-word ${className}`.trim()} aria-label={text}>
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="animated-char"
          style={{ animationDelay: `${index * 70}ms` }}
          aria-hidden="true"
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}
