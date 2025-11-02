import { useState, useEffect } from "react";

interface PointlessClickerProps {
  onBack: () => void;
}

const MILESTONES = [
  { count: 10, message: "You're actually doing this?" },
  { count: 50, message: "Seriously?" },
  { count: 100, message: "You have too much free time." },
  { count: 250, message: "This is genuinely concerning." },
  { count: 500, message: "Are you okay?" },
  { count: 1000, message: "Achievement: Complete Dedication to Meaninglessness" },
];

const UPGRADES = [
  { name: "Auto-Clicker", cost: 20, perSecond: 1 },
  { name: "Existential Dread", cost: 100, perSecond: 5 },
  { name: "Void Generator", cost: 500, perSecond: 25 },
];

export default function PointlessClicker({ onBack }: PointlessClickerProps) {
  const [points, setPoints] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [message, setMessage] = useState("Click the button. No reason why.");
  const [upgrades, setUpgrades] = useState<number[]>([0, 0, 0]);
  const [buttonScale, setButtonScale] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem("pointless-clicker");
    if (saved) {
      const data = JSON.parse(saved);
      setPoints(data.points || 0);
      setTotalClicks(data.totalClicks || 0);
      setUpgrades(data.upgrades || [0, 0, 0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pointless-clicker",
      JSON.stringify({ points, totalClicks, upgrades })
    );
  }, [points, totalClicks, upgrades]);

  useEffect(() => {
    const perSecond = upgrades.reduce(
      (sum, count, idx) => sum + count * UPGRADES[idx].perSecond,
      0
    );

    if (perSecond > 0) {
      const interval = setInterval(() => {
        setPoints((prev) => prev + perSecond);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [upgrades]);

  useEffect(() => {
    const milestone = MILESTONES.find((m) => m.count === totalClicks);
    if (milestone) {
      setMessage(milestone.message);
    }
  }, [totalClicks]);

  const handleClick = () => {
    setPoints((prev) => prev + 1);
    setTotalClicks((prev) => prev + 1);
    setButtonScale(1.2);
    setTimeout(() => setButtonScale(1), 100);
  };

  const buyUpgrade = (index: number) => {
    const upgrade = UPGRADES[index];
    if (points >= upgrade.cost) {
      setPoints((prev) => prev - upgrade.cost);
      setUpgrades((prev) => {
        const newUpgrades = [...prev];
        newUpgrades[index]++;
        return newUpgrades;
      });
    }
  };

  const perSecond = upgrades.reduce(
    (sum, count, idx) => sum + count * UPGRADES[idx].perSecond,
    0
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 existential-pulse">
          Pointless Clicker
        </h1>
        <p className="text-sm opacity-70 font-mono italic max-w-md">
          {message}
        </p>
      </div>

      <div className="mb-8 text-center">
        <div className="text-6xl font-bold mb-2">{points}</div>
        <div className="text-sm opacity-70 font-mono">Meaningless Points</div>
        {perSecond > 0 && (
          <div className="text-xs opacity-50 font-mono mt-1">
            +{perSecond}/sec
          </div>
        )}
      </div>

      <button
        onClick={handleClick}
        className="mb-8 w-48 h-48 rounded-full bg-primary text-background text-4xl font-bold hover:bg-primary/80 transition-all shadow-lg hover:shadow-xl"
        style={{ transform: `scale(${buttonScale})` }}
      >
        CLICK
      </button>

      <div className="w-full max-w-md space-y-3 mb-6">
        <h3 className="text-xl font-bold font-mono mb-4">Upgrades</h3>
        {UPGRADES.map((upgrade, idx) => (
          <button
            key={idx}
            onClick={() => buyUpgrade(idx)}
            disabled={points < upgrade.cost}
            className="w-full px-4 py-3 border-2 border-secondary rounded-lg hover:bg-secondary hover:text-background transition-all font-mono disabled:opacity-30 disabled:cursor-not-allowed hover-lift"
          >
            <div className="flex justify-between items-center">
              <span>
                {upgrade.name} ({upgrades[idx]})
              </span>
              <span className="text-sm">
                {upgrade.cost} pts • +{upgrade.perSecond}/s
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="text-xs opacity-50 font-mono mb-6">
        Total Clicks: {totalClicks}
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
