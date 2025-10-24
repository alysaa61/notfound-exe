import { useState, useEffect } from "react";
import { toast } from "sonner";

interface LofiStudyProps {
  onBack: () => void;
}

const motivationalYells = [
  "STUDY, YOU BEAUTIFUL DISASTER!",
  "YOUR BRAIN CELLS ARE SCREAMING!",
  "KNOWLEDGE OR CHAOS. PICK ONE.",
  "THE VOID DEMANDS PRODUCTIVITY!",
  "FOCUS... OR DON'T. I'M NOT YOUR MOM.",
  "EXISTENTIAL DREAD = PROCRASTINATION",
  "READ THAT AGAIN. SLOWLY.",
];

const visualizers = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];

export default function LofiStudy({ onBack }: LofiStudyProps) {
  const [playing, setPlaying] = useState(false);
  const [studyTime, setStudyTime] = useState(0);
  const [visualizer, setVisualizer] = useState<string[]>(Array(12).fill("▁"));
  const [vibeCheck, setVibeCheck] = useState("📚");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playing) {
      timer = setInterval(() => setStudyTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    let yellTimer: NodeJS.Timeout;
    if (playing) {
      yellTimer = setInterval(() => {
        if (Math.random() > 0.6) {
          const randomYell = motivationalYells[Math.floor(Math.random() * motivationalYells.length)];
          toast(randomYell, {
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

  useEffect(() => {
    let visualizerTimer: NodeJS.Timeout;
    if (playing) {
      visualizerTimer = setInterval(() => {
        setVisualizer(Array(12).fill(0).map(() => 
          visualizers[Math.floor(Math.random() * visualizers.length)]
        ));
      }, 200);
    }
    return () => clearInterval(visualizerTimer);
  }, [playing]);

  useEffect(() => {
    if (studyTime > 0 && studyTime % 300 === 0) {
      const vibes = ["🧠", "💀", "🔥", "✨", "👁️", "🌀"];
      setVibeCheck(vibes[Math.floor(Math.random() * vibes.length)]);
    }
  }, [studyTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl md:text-4xl mb-4 font-bold">Lo-Fi Study With Chaos 🎧</h1>
      <p className="mb-8 opacity-70 font-mono">chill beats... with occasional existential terror</p>
      
      {playing && (
        <div className="mb-6 space-y-4">
          <div className="text-4xl font-mono text-chaos-pink animate-pulse">
            {visualizer.join(" ")}
          </div>
          <div className="text-2xl font-mono">
            {formatTime(studyTime)} {vibeCheck}
          </div>
          <div className="text-xs opacity-50 font-mono">
            {studyTime > 600 ? "you're actually studying?! impressive." : "the void watches..."}
          </div>
        </div>
      )}

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
      
      {studyTime > 0 && !playing && (
        <button
          onClick={() => setStudyTime(0)}
          className="mt-4 text-xs opacity-50 hover:opacity-100 font-mono underline"
        >
          reset timer
        </button>
      )}

      <button onClick={onBack} className="mt-6 underline opacity-70 hover:opacity-100 font-mono">
        back
      </button>
    </div>
  );
}
