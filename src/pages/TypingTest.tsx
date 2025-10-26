import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface TypingTestProps {
  onBack: () => void;
}

const quotes = [
  "The void stares back, and it types faster than you.",
  "Existence precedes essence, but does it precede typos?",
  "To type or not to type, that is the existential question.",
  "In the end, we are all just characters on a screen.",
  "The only thing we have to fear is fear itself... and typos.",
  "Life is what happens while you're busy making typos.",
  "I think, therefore I am... probably making a mistake.",
];

export default function TypingTest({ onBack }: TypingTestProps) {
  const [quote, setQuote] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    if (input.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (input.length > 0) {
      const correctChars = input.split("").filter((char, i) => char === quote[i]).length;
      const acc = Math.round((correctChars / input.length) * 100);
      setAccuracy(acc);

      if (startTime) {
        const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
        const wordsTyped = input.length / 5; // standard word = 5 chars
        setWpm(Math.round(wordsTyped / timeElapsed));
      }
    }

    if (input === quote && !isComplete) {
      setIsComplete(true);
      const timeElapsed = (Date.now() - (startTime || Date.now())) / 1000;
      toast.success(`Complete! ${wpm} WPM, ${accuracy}% accuracy in ${timeElapsed.toFixed(1)}s`, {
        style: { fontFamily: "Fira Code, monospace" },
        duration: 5000,
      });
    }
  }, [input, quote, startTime, wpm, accuracy, isComplete]);

  const resetTest = () => {
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(newQuote);
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
    inputRef.current?.focus();
  };

  const getCharClass = (index: number) => {
    if (index >= input.length) return "opacity-50";
    if (input[index] === quote[index]) return "text-chaos-green";
    return "text-destructive";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl md:text-4xl mb-2 font-bold">⌨️ Existential Typing Test</h1>
      <p className="mb-8 opacity-70 font-mono text-sm">type fast or the void will judge you</p>

      <div className="w-full max-w-2xl mb-8 p-6 border-2 border-primary rounded-lg bg-card">
        <div className="text-2xl font-mono mb-6 leading-relaxed">
          {quote.split("").map((char, index) => (
            <span key={index} className={getCharClass(index)}>
              {char}
            </span>
          ))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => !isComplete && setInput(e.target.value)}
          className="w-full p-4 bg-background border-2 border-secondary rounded-lg font-mono text-lg focus:outline-none focus:border-chaos-pink"
          placeholder="start typing..."
          disabled={isComplete}
        />
      </div>

      <div className="flex gap-8 mb-8 font-mono">
        <div className="text-center">
          <div className="text-3xl font-bold text-chaos-green">{wpm}</div>
          <div className="text-xs opacity-70">WPM</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-chaos-pink">{accuracy}%</div>
          <div className="text-xs opacity-70">Accuracy</div>
        </div>
      </div>

      <button
        onClick={resetTest}
        className="mb-4 px-6 py-3 border-2 border-secondary hover:bg-secondary hover:text-background transition-all rounded-lg font-mono font-semibold"
      >
        {isComplete ? "try again" : "reset"}
      </button>

      <button onClick={onBack} className="underline opacity-70 hover:opacity-100 font-mono text-sm">
        back
      </button>
    </div>
  );
}
