import { useState, useEffect } from "react";
import { toast } from "sonner";

interface AdoptRockProps {
  onBack: () => void;
}

type RockMood = "😐" | "😊" | "😢" | "😴" | "🤔" | "💀";

export default function AdoptRock({ onBack }: AdoptRockProps) {
  const [rockName, setRockName] = useState("");
  const [adopted, setAdopted] = useState(false);
  const [rockMood, setRockMood] = useState<RockMood>("😐");
  const [hunger, setHunger] = useState(100);
  const [boredom, setBoredom] = useState(0);
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (!adopted) return;

    const ageTimer = setInterval(() => setAge(prev => prev + 1), 1000);
    const hungerTimer = setInterval(() => setHunger(prev => Math.max(0, prev - 1)), 5000);
    const boredomTimer = setInterval(() => setBoredom(prev => Math.min(100, prev + 1)), 3000);

    return () => {
      clearInterval(ageTimer);
      clearInterval(hungerTimer);
      clearInterval(boredomTimer);
    };
  }, [adopted]);

  useEffect(() => {
    if (!adopted) return;

    if (hunger < 30 && boredom > 70) setRockMood("💀");
    else if (hunger < 50) setRockMood("😢");
    else if (boredom > 70) setRockMood("😴");
    else if (hunger > 80 && boredom < 30) setRockMood("😊");
    else if (boredom > 50) setRockMood("🤔");
    else setRockMood("😐");
  }, [hunger, boredom, adopted]);

  const feedRock = () => {
    setHunger(Math.min(100, hunger + 30));
    toast(`${rockName} consumed... something. Hunger restored!`, {
      duration: 2000,
      style: { fontFamily: "Fira Code, monospace" },
    });
  };

  const playWithRock = () => {
    setBoredom(Math.max(0, boredom - 40));
    toast(`${rockName} experienced... fun? Maybe?`, {
      duration: 2000,
      style: { fontFamily: "Fira Code, monospace" },
    });
  };

  const talkToRock = () => {
    const responses = [
      "...",
      "🪨",
      "*silence*",
      "the void stares back",
      "rock thoughts remain a mystery",
      "perhaps it's contemplating existence",
    ];
    toast(responses[Math.floor(Math.random() * responses.length)], {
      duration: 2000,
      style: { fontFamily: "Fira Code, monospace" },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      {!adopted ? (
        <>
          <div className="text-8xl mb-8">🪨</div>
          <h1 className="text-3xl md:text-4xl mb-6 font-bold">Adopt a Digital Rock</h1>
          <input
            type="text"
            placeholder="name your rock..."
            className="border-2 border-primary p-3 bg-transparent text-center w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary font-mono mb-6"
            value={rockName}
            onChange={(e) => setRockName(e.target.value)}
            autoFocus
          />
          <button
            onClick={() => rockName.trim() && setAdopted(true)}
            disabled={!rockName.trim()}
            className="border-2 border-primary px-8 py-3 hover:bg-primary hover:text-background transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed font-mono font-semibold"
          >
            Adopt
          </button>
        </>
      ) : (
        <>
          <div className="text-8xl mb-4">{rockMood === "💀" ? "💀" : "🪨"}</div>
          <div className="text-3xl mb-6">{rockMood}</div>
          <h2 className="text-2xl md:text-3xl mb-4 font-bold">
            <span className="text-primary">{rockName}</span>
          </h2>
          
          <div className="max-w-md w-full mb-6 space-y-3 font-mono text-sm">
            <div className="flex justify-between items-center">
              <span>Age:</span>
              <span className="text-chaos-green">{age}s</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Hunger:</span>
                <span className={hunger < 30 ? "text-destructive" : "text-chaos-green"}>{hunger}%</span>
              </div>
              <div className="w-full bg-void/30 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-chaos-green transition-all duration-300"
                  style={{ width: `${hunger}%` }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Boredom:</span>
                <span className={boredom > 70 ? "text-destructive" : "text-chaos-pink"}>{boredom}%</span>
              </div>
              <div className="w-full bg-void/30 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-chaos-pink transition-all duration-300"
                  style={{ width: `${boredom}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-6 flex-wrap justify-center">
            <button
              onClick={feedRock}
              className="border-2 border-chaos-green px-6 py-2 hover:bg-chaos-green hover:text-void transition-all font-mono text-sm"
            >
              Feed
            </button>
            <button
              onClick={playWithRock}
              className="border-2 border-chaos-pink px-6 py-2 hover:bg-chaos-pink hover:text-void transition-all font-mono text-sm"
            >
              Play
            </button>
            <button
              onClick={talkToRock}
              className="border-2 border-primary px-6 py-2 hover:bg-primary hover:text-background transition-all font-mono text-sm"
            >
              Talk
            </button>
          </div>

          <button 
            onClick={onBack} 
            className="underline opacity-70 hover:opacity-100 font-mono text-sm"
          >
            abandon {rockName}
          </button>
        </>
      )}
    </div>
  );
}
