import { useState, useEffect, useRef } from "react";

interface WhackAThoughtProps {
  onBack: () => void;
}

const THOUGHTS = [
  "🤔", "💭", "🧠", "❓", "💡", "🌀", "👁️", "🎭", "🔮", "⚡"
];

interface Thought {
  id: number;
  emoji: string;
  position: { x: number; y: number };
  visible: boolean;
}

export default function WhackAThought({ onBack }: WhackAThoughtProps) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const thoughtIdRef = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem("whack-high-score");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem("whack-high-score", score.toString());
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, score, highScore]);

  useEffect(() => {
    if (!gameActive) return;

    const spawnThought = () => {
      const newThought: Thought = {
        id: thoughtIdRef.current++,
        emoji: THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)],
        position: {
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 10,
        },
        visible: true,
      };

      setThoughts((prev) => [...prev, newThought]);

      setTimeout(() => {
        setThoughts((prev) => prev.filter((t) => t.id !== newThought.id));
      }, 1500);
    };

    const interval = setInterval(spawnThought, 800);
    return () => clearInterval(interval);
  }, [gameActive]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setThoughts([]);
    setGameActive(true);
  };

  const whackThought = (id: number) => {
    setThoughts((prev) => prev.filter((t) => t.id !== id));
    setScore((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 existential-pulse" style={{ userSelect: "none" }}>
          Whack-a-Thought
        </h1>
        <p className="text-sm opacity-70 font-mono italic" style={{ userSelect: "none" }}>
          Stop those intrusive thoughts before they consume you.
        </p>
      </div>

      <div className="flex gap-8 mb-6 font-mono">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ userSelect: "none" }}>{score}</div>
          <div className="text-xs opacity-70" style={{ userSelect: "none" }}>Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ userSelect: "none" }}>{highScore}</div>
          <div className="text-xs opacity-70" style={{ userSelect: "none" }}>Best</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ userSelect: "none" }}>{timeLeft}s</div>
          <div className="text-xs opacity-70" style={{ userSelect: "none" }}>Time</div>
        </div>
      </div>

      <div className="relative w-full max-w-2xl h-96 bg-background/50 border-2 border-primary rounded-lg mb-6 overflow-hidden">
        {!gameActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-4 border-2 border-primary rounded-lg hover:bg-primary hover:text-background transition-all font-mono font-semibold hover-lift"
            >
              {timeLeft === 0 ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}

        {thoughts.map((thought) => (
          <button
            key={thought.id}
            onClick={() => whackThought(thought.id)}
            className="absolute text-5xl cursor-pointer hover:scale-125 transition-transform animate-scale-in"
            style={{
              left: `${thought.position.x}%`,
              top: `${thought.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {thought.emoji}
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="px-6 py-3 border-2 border-muted rounded-lg hover:bg-muted hover:text-background transition-all font-mono hover-lift"
      >
        ← Back to Menu
      </button>
    </div>
  );
}
