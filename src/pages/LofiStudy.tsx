import { useState, useEffect } from "react";
import { toast } from "sonner";

interface LofiStudyProps {
  onBack: () => void;
}

export default function LofiStudy({ onBack }: LofiStudyProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let yellTimer: NodeJS.Timeout;
    if (playing) {
      yellTimer = setInterval(() => {
        if (Math.random() > 0.7) {
          toast("STUDY, YOU BEAUTIFUL DISASTER!", {
            duration: 3000,
            style: {
              background: "hsl(var(--chaos-pink))",
              color: "hsl(var(--void))",
              border: "none",
              fontFamily: "Fira Code, monospace",
              fontWeight: "bold",
            },
          });
        }
      }, 8000);
    }
    return () => clearInterval(yellTimer);
  }, [playing]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl md:text-4xl mb-4 font-bold">Lo-Fi Study With Chaos 🎧</h1>
      <p className="mb-8 opacity-70 font-mono">chill beats... with occasional existential terror</p>
      <button
        onClick={() => setPlaying((p) => !p)}
        className={`mt-4 border-2 px-8 py-3 font-mono font-semibold transition-all duration-200 ${
          playing 
            ? "border-destructive bg-destructive text-destructive-foreground" 
            : "border-primary hover:bg-primary hover:text-background"
        }`}
      >
        {playing ? "pause chaos" : "start chaos"}
      </button>
      <button onClick={onBack} className="mt-6 underline opacity-70 hover:opacity-100 font-mono">
        back
      </button>
    </div>
  );
}
