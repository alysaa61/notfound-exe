import { useState } from "react";

interface AdoptRockProps {
  onBack: () => void;
}

export default function AdoptRock({ onBack }: AdoptRockProps) {
  const [rockName, setRockName] = useState("");
  const [adopted, setAdopted] = useState(false);

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
          <div className="text-8xl mb-8 animate-bounce">🪨</div>
          <h2 className="text-2xl md:text-3xl mb-4 font-bold">
            You adopted <span className="text-primary">{rockName}</span>
          </h2>
          <p className="max-w-md mb-8 opacity-80 font-mono">
            {rockName} stares into the void... wondering if it's even a rock or
            just code.
          </p>
          <button 
            onClick={onBack} 
            className="underline opacity-70 hover:opacity-100 font-mono"
          >
            back
          </button>
        </>
      )}
    </div>
  );
}
