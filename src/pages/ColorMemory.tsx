import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ColorMemoryProps {
  onBack: () => void;
}

const COLORS = [
  { name: "chaos-pink", class: "bg-[hsl(var(--chaos-pink))]" },
  { name: "chaos-green", class: "bg-[hsl(var(--chaos-green))]" },
  { name: "primary", class: "bg-primary" },
  { name: "secondary", class: "bg-secondary" },
  { name: "destructive", class: "bg-destructive" },
  { name: "muted", class: "bg-muted" },
];

export default function ColorMemory({ onBack }: ColorMemoryProps) {
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeColor, setActiveColor] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("colorMemoryHighScore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const playSequence = async (seq: number[]) => {
    setIsPlaying(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveColor(seq[i]);
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveColor(null);
    }
    setIsPlaying(false);
  };

  const startGame = () => {
    const newSeq = [Math.floor(Math.random() * COLORS.length)];
    setSequence(newSeq);
    setUserSequence([]);
    setGameStarted(true);
    setScore(0);
    playSequence(newSeq);
  };

  const handleColorClick = (index: number) => {
    if (isPlaying) return;

    const newUserSeq = [...userSequence, index];
    setUserSequence(newUserSeq);

    // Flash the color
    setActiveColor(index);
    setTimeout(() => setActiveColor(null), 200);

    // Check if correct
    if (sequence[newUserSeq.length - 1] !== index) {
      toast.error("Wrong! The void claims another victim.", {
        style: { fontFamily: "Fira Code, monospace" },
      });
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("colorMemoryHighScore", score.toString());
        toast.success(`New high score: ${score}!`, {
          style: { fontFamily: "Fira Code, monospace" },
        });
      }
      setGameStarted(false);
      return;
    }

    // If sequence complete, add new color
    if (newUserSeq.length === sequence.length) {
      const newScore = score + 1;
      setScore(newScore);
      toast.success(`Level ${newScore}!`, {
        style: { fontFamily: "Fira Code, monospace" },
        duration: 1000,
      });
      
      setTimeout(() => {
        const nextSeq = [...sequence, Math.floor(Math.random() * COLORS.length)];
        setSequence(nextSeq);
        setUserSequence([]);
        playSequence(nextSeq);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl md:text-4xl mb-2 font-bold" style={{ userSelect: "none" }}>🎨 Color Memory Chaos</h1>
      <p className="mb-8 opacity-70 font-mono text-sm" style={{ userSelect: "none" }}>remember the sequence or face the void</p>

      <div className="mb-8 font-mono text-center">
        <div className="text-2xl font-bold text-chaos-green mb-2" style={{ userSelect: "none" }}>Score: {score}</div>
        {highScore > 0 && (
          <div className="text-sm opacity-70" style={{ userSelect: "none" }}>High Score: {highScore}</div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
        {COLORS.map((color, index) => (
          <button
            key={color.name}
            onClick={() => handleColorClick(index)}
            disabled={!gameStarted || isPlaying}
            className={`
              w-24 h-24 rounded-lg border-2 border-border transition-all
              ${color.class}
              ${activeColor === index ? "scale-110 brightness-150" : ""}
              ${!gameStarted || isPlaying ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:brightness-110"}
            `}
          />
        ))}
      </div>

      {!gameStarted ? (
        <button
          onClick={startGame}
          className="mb-4 px-8 py-4 border-2 border-primary hover:bg-primary hover:text-background transition-all rounded-lg font-mono font-semibold text-lg"
        >
          start game
        </button>
      ) : (
        <div className="mb-4 font-mono text-sm opacity-70" style={{ userSelect: "none" }}>
          {isPlaying ? "Watch carefully..." : "Your turn!"}
        </div>
      )}

      <button onClick={onBack} className="underline opacity-70 hover:opacity-100 font-mono text-sm">
        back
      </button>
    </div>
  );
}
