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
  "A great opportunity awaits. It's probably a scam.",
  "Someone is thinking about you. They forgot already.",
  "Your destiny is written in the stars. They're very far away.",
  "Confusion is the first step to understanding. Also the last step.",
  "You will meet someone important. They won't remember you.",
  "The path ahead is unclear. It's also behind you.",
  "Your dreams will come true. Wrong dreams though.",
  "An adventure awaits! Just kidding, it's Tuesday.",
  "The cosmos has a message for you: 404 Not Found",
  "You are unique, just like everyone else.",
  "Today you will make a choice. It won't matter.",
  "Wisdom comes with age. You still have neither.",
  "A surprise is coming. Spoiler: it's disappointment.",
  "Your lucky day is tomorrow. Always tomorrow.",
  "The universe is speaking to you. Bad reception though.",
  "You will discover something amazing. You'll lose it immediately.",
  "Greatness awaits those who... oh, too late.",
  "The meaning of life is... buffering...",
  "You are destined for greatness. Define 'greatness' first.",
  "A door will open. It's the wrong door.",
  "Your spirit animal is confused too.",
  "Success is around the corner. You're going in circles.",
  "The stars align in your favor. They're lying.",
  "You will receive good news. Email marked as spam.",
  "A journey begins with a single step. Then 10,000 more.",
  "Your potential is limitless. Your motivation isn't.",
  "The truth will set you free. Terms and conditions apply.",
  "You are stronger than you think. Still not strong enough.",
  "Everything happens for a reason. Reason unknown.",
  "Your time will come. Probably during a nap.",
  "The answer is yes. Wait, what was the question?",
  "You will overcome obstacles. New ones will appear.",
  "Happiness is a choice. So is misery. Good luck.",
  "Your greatest fear is unfounded. Your second greatest isn't.",
  "The future is bright. Too bright. It's blinding.",
  "You will learn something valuable. You'll forget it.",
  "A change is coming. Your socks, probably.",
  "Trust your instincts. They're probably wrong.",
  "You are on the right path. The path to nowhere.",
  "Something magical will happen. Define 'magical.'",
  "Your luck is about to change. Not necessarily improve.",
  "The universe rewards patience. Eventually. Maybe.",
  "You will find what you're looking for. It's in the last place.",
  "An old friend will contact you. Wrong number.",
  "Your creativity knows no bounds. Neither does your confusion.",
  "The best is yet to come. The worst too.",
  "You are exactly where you need to be. Sorry about that.",
  "A solution will present itself. It won't work.",
  "Your hard work will pay off. Minimum wage.",
  "The cosmos is conspiring in your favor. They're bad at it.",
  "You will make an impact. Mostly on your furniture.",
  "Destiny calls. Straight to voicemail.",
  "Your aura is glowing. Probably your screen.",
  "A breakthrough is imminent. Through what, unclear.",
  "The wheel of fortune turns. It's stuck actually.",
  "You are guided by unseen forces. They're lost too.",
  "Your energy is magnetic. It attracts problems.",
  "The path of wisdom awaits. No GPS available.",
  "You will achieve balance. Then immediately lose it.",
  "A secret admirer exists. They're keeping it secret.",
  "Your chakras are aligned. In a weird way.",
  "The moon influences your destiny. Not in a good way.",
  "You possess hidden talents. They're really well hidden.",
  "A wish will be granted. The monkey's paw heard you.",
  "Your journey has meaning. Meaning is overrated.",
  "The oracle has spoken. Nobody understood it.",
  "You will transcend limitations. New limitations appear.",
  "Your spirit is unbreakable. Your patience isn't.",
  "A blessing in disguise approaches. Great disguise.",
  "The fates smile upon you. Sarcastically.",
  "You are infinite potential. Infinitely confused too.",
  "Synchronicity is at work. It's buffering.",
  "Your third eye is opening. It sees the same stuff.",
  "A cosmic shift occurs. You won't notice.",
  "You are divinely guided. The GPS is recalculating.",
  "Your frequency is rising. So is your anxiety.",
  "The matrix has a message: Please try again later.",
  "You are awakening. Hit snooze.",
  "A portal opens before you. It's a pop-up ad.",
  "Your consciousness expands. Your focus doesn't.",
  "The akashic records mention you. In a footnote.",
  "You are stardust. Expensive, disappointing stardust.",
  "A higher power watches over you. They're confused too.",
  "Your vibration attracts abundance. Of emails.",
  "The quantum field responds to you. With an error message.",
  "You are ascending. Stairs, mostly.",
  "A divine plan unfolds. The instructions are missing.",
  "Your soul contract is being fulfilled. Nobody signed it.",
  "The universe mirrors your energy. It's also tired.",
  "You are manifesting your reality. This is what you manifested.",
  "A spiritual awakening begins. Press snooze for 5 minutes.",
  "Your inner light shines bright. It's your phone screen.",
  "The collective consciousness includes you. Barely.",
  "You are co-creating reality. With random people.",
  "A karmic cycle completes. Another one starts immediately.",
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
