import { useState, useEffect } from "react";

interface InfiniteElevatorProps {
  onBack: () => void;
}

const FLOOR_MESSAGES = [
  "Floor 3... almost there...",
  "Floor 7... maybe?",
  "Floor -2... wait, negative floors?",
  "Floor 42... the answer!",
  "Floor ∞... mathematically impossible",
  "Floor G... going to ground?",
  "Floor ???... system error",
  "Floor 13... unlucky",
  "Floor 99... so close!",
  "Floor 0.5... between floors",
];

const ELEVATOR_THOUGHTS = [
  "The elevator music is a lie.",
  "Have you considered taking the stairs?",
  "Time is an illusion. Especially here.",
  "This elevator has no destination.",
  "You've been waiting for 3 eternities.",
  "The 'close door' button does nothing.",
  "Everyone knows the button is a placebo.",
  "Some say the elevator is the destination.",
  "Schrödinger's elevator: both moving and still.",
  "The real journey is the wait we experienced.",
];

export default function InfiniteElevator({ onBack }: InfiniteElevatorProps) {
  const [floor, setFloor] = useState("1");
  const [isMoving, setIsMoving] = useState(false);
  const [thought, setThought] = useState("");
  const [waitTime, setWaitTime] = useState(0);
  const [pressCount, setPressCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("elevator-stats");
    if (saved) {
      const data = JSON.parse(saved);
      setWaitTime(data.waitTime || 0);
      setPressCount(data.pressCount || 0);
    }
  }, []);

  useEffect(() => {
    if (isMoving) {
      const timer = setInterval(() => {
        setWaitTime((prev) => {
          const newTime = prev + 1;
          localStorage.setItem(
            "elevator-stats",
            JSON.stringify({ waitTime: newTime, pressCount })
          );
          return newTime;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isMoving, pressCount]);

  const pressButton = () => {
    if (isMoving) return;

    setIsMoving(true);
    const newCount = pressCount + 1;
    setPressCount(newCount);
    localStorage.setItem(
      "elevator-stats",
      JSON.stringify({ waitTime, pressCount: newCount })
    );

    // Random floor updates
    const duration = 3000 + Math.random() * 2000;
    const updates = 5 + Math.floor(Math.random() * 5);
    const interval = duration / updates;

    let count = 0;
    const floorInterval = setInterval(() => {
      setFloor(
        FLOOR_MESSAGES[Math.floor(Math.random() * FLOOR_MESSAGES.length)]
      );
      count++;
      if (count >= updates) {
        clearInterval(floorInterval);
        setIsMoving(false);
        setThought(
          ELEVATOR_THOUGHTS[
            Math.floor(Math.random() * ELEVATOR_THOUGHTS.length)
          ]
        );
      }
    }, interval);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 existential-pulse">
          Infinite Elevator
        </h1>
        <p className="text-sm opacity-70 font-mono italic">
          Your floor is coming. Eventually. Maybe.
        </p>
      </div>

      <div className="mb-8 w-full max-w-md">
        <div className="border-4 border-primary rounded-lg p-8 bg-background/50">
          <div className="text-center mb-6">
            <div className="text-8xl mb-4">🏢</div>
            <div
              className={`text-3xl font-mono font-bold mb-2 ${
                isMoving ? "animate-pulse" : ""
              }`}
            >
              {floor}
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    isMoving ? "bg-primary animate-pulse" : "bg-muted"
                  }`}
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={pressButton}
            disabled={isMoving}
            className="w-full py-4 border-2 border-secondary rounded-lg hover:bg-secondary hover:text-background transition-all font-mono font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
          >
            {isMoving ? "MOVING..." : "CALL ELEVATOR"}
          </button>
        </div>
      </div>

      {thought && (
        <div className="max-w-md mb-6 p-4 border border-muted rounded-lg bg-background/30 animate-fade-in">
          <p className="text-sm font-mono italic text-center opacity-70">
            {thought}
          </p>
        </div>
      )}

      <div className="text-center mb-6 space-y-1">
        <div className="text-xs opacity-50 font-mono">
          Time Waited: {formatTime(waitTime)}
        </div>
        <div className="text-xs opacity-50 font-mono">
          Button Presses: {pressCount}
        </div>
        <div className="text-xs opacity-30 font-mono italic mt-2">
          {pressCount > 50 && "Achievement: Eternal Optimist"}
        </div>
      </div>

      <button
        onClick={onBack}
        className="px-6 py-3 border-2 border-muted rounded-lg hover:bg-muted hover:text-background transition-all font-mono hover-lift"
      >
        ← Take the Stairs (Back to Menu)
      </button>
    </div>
  );
}
