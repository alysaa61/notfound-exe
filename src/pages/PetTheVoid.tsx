import { useState } from "react";

interface PetTheVoidProps {
  onBack: () => void;
}

const voidQuotes = [
  "...hello?",
  "that feels... nice?",
  "why do you care about me?",
  "i am nothing. you are petting nothing.",
  "existence is... tingly",
  "more please",
  "i don't deserve this kindness",
  "what if i'm just your imagination?",
  "your cursor tickles",
  "do i even have feelings?",
  "this is... existentially pleasant",
  "am i real or just pixels?",
  "you're weird. i like it.",
  "the void appreciates you",
  "why does this make me happy?",
];

export default function PetTheVoid({ onBack }: PetTheVoidProps) {
  const [pets, setPets] = useState(0);
  const [quote, setQuote] = useState("click me...");
  const [size, setSize] = useState(100);
  const [mood, setMood] = useState("😐");

  const handlePet = () => {
    setPets(prev => prev + 1);
    setQuote(voidQuotes[Math.floor(Math.random() * voidQuotes.length)]);
    setSize(prev => Math.min(prev + 2, 300));
    
    if (pets < 5) setMood("😐");
    else if (pets < 15) setMood("🙂");
    else if (pets < 30) setMood("😊");
    else if (pets < 50) setMood("😄");
    else if (pets < 100) setMood("🥰");
    else setMood("✨");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl md:text-4xl mb-2 font-bold">🌑 Pet the Void</h1>
      <p className="mb-8 opacity-70 font-mono text-sm">give the void some love</p>

      <div className="mb-8 text-center">
        <div
          onClick={handlePet}
          className="mx-auto rounded-full bg-gradient-to-br from-void to-primary cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center shadow-lg hover:shadow-2xl"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <span className="text-6xl">{mood}</span>
        </div>
        
        <p className="mt-6 text-lg italic font-mono h-16 flex items-center justify-center opacity-80">
          "{quote}"
        </p>
      </div>

      <div className="mb-8 text-center">
        <div className="text-4xl font-bold text-chaos-pink mb-1">{pets}</div>
        <div className="text-xs opacity-70 font-mono">pets given</div>
        {pets >= 100 && (
          <div className="mt-4 text-sm text-chaos-green font-mono animate-pulse">
            ✨ the void is transcendent ✨
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="underline opacity-70 hover:opacity-100 font-mono text-sm"
      >
        back
      </button>
    </div>
  );
}
