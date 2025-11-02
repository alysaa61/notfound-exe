import { useState, useEffect } from "react";

interface ChaosFortuneProps {
  onBack: () => void;
}

const FORTUNES = [
  "You will find meaning in the most meaningless places.",
  "A rock will judge you today. It will not be impressed.",
  "Your cursor knows things you don't.",
  "Embrace the void. The void is busy right now.",
  "Today's lucky number is: undefined",
  "The universe doesn't care. That's actually quite freeing.",
  "You will lose something you never had.",
  "Chaos is not your enemy. It's just indifferent.",
  "Your fate is sealed. The envelope is somewhere.",
  "You will achieve nothing today. That's the goal.",
  "The answer you seek is in another fortune cookie.",
  "You are not the main character. That's okay.",
  "Your future contains the present, which contains the past.",
  "A mysterious stranger will... never mind, they walked away.",
  "You will soon forget why you clicked this.",
  "The void gazes back. It seems bored.",
  "Your lucky color is the friends we made along the way.",
  "Nothing matters. Press for another fortune.",
  "You will experience existence. Unavoidable, really.",
  "The prophecy is incomplete. It ends with—",
];

const SYMBOLS = ["🔮", "✨", "🌙", "⭐", "💫", "🎴", "🎭", "🎨", "🌀", "👁️"];

export default function ChaosFortune({ onBack }: ChaosFortuneProps) {
  const [fortune, setFortune] = useState("");
  const [isRevealing, setIsRevealing] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; symbol: string; x: number; y: number }>>([]);
  const [fortuneCount, setFortuneCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("chaos-fortune-count");
    if (saved) setFortuneCount(parseInt(saved));
  }, []);

  const revealFortune = () => {
    setIsRevealing(true);
    
    // Create particles
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);

    setTimeout(() => {
      const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setFortune(randomFortune);
      setIsRevealing(false);
      setParticles([]);
      
      const newCount = fortuneCount + 1;
      setFortuneCount(newCount);
      localStorage.setItem("chaos-fortune-count", newCount.toString());
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-4xl animate-fade-out pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: "fade-out 2s ease-out forwards",
          }}
        >
          {particle.symbol}
        </div>
      ))}

      <div className="text-center mb-8 z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 existential-pulse">
          Chaos Fortune Teller
        </h1>
        <p className="text-sm opacity-70 font-mono italic">
          Seek answers to questions you didn't ask.
        </p>
      </div>

      <div className="relative mb-8">
        <div
          className={`text-8xl transition-transform duration-500 ${
            isRevealing ? "animate-spin" : ""
          }`}
        >
          🔮
        </div>
        {isRevealing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl animate-pulse">✨</div>
          </div>
        )}
      </div>

      {fortune && !isRevealing && (
        <div className="max-w-md mb-8 p-6 border-2 border-primary rounded-lg bg-background/50 animate-scale-in">
          <p className="text-lg font-mono text-center italic">"{fortune}"</p>
        </div>
      )}

      {isRevealing && (
        <div className="mb-8 h-24 flex items-center">
          <p className="text-lg font-mono opacity-70 animate-pulse">
            Consulting the chaos...
          </p>
        </div>
      )}

      <button
        onClick={revealFortune}
        disabled={isRevealing}
        className="px-8 py-4 mb-6 border-2 border-secondary rounded-lg hover:bg-secondary hover:text-background transition-all font-mono font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
      >
        {fortune ? "Another Fortune" : "Reveal My Fortune"}
      </button>

      <div className="text-xs opacity-50 font-mono mb-6">
        Fortunes Received: {fortuneCount}
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
