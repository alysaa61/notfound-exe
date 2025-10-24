interface MenuProps {
  setPage: (page: string) => void;
}

export default function Menu({ setPage }: MenuProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 existential-pulse">
        Welcome to notfound.exe
      </h1>
      <p className="italic opacity-70 mb-8 font-mono">
        Choose your brand of chaos wisely.
      </p>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => setPage("lofi")}
          className="w-full border-2 border-secondary px-6 py-4 rounded-lg hover:bg-secondary hover:text-background transition-all duration-200 font-mono font-semibold"
        >
          🎧 Lo-Fi Study With Chaos
        </button>
        <button
          onClick={() => setPage("rock")}
          className="w-full border-2 border-primary px-6 py-4 rounded-lg hover:bg-primary hover:text-background transition-all duration-200 font-mono font-semibold"
        >
          🪨 Adopt a Rock
        </button>
      </div>

      <p className="mt-12 text-xs opacity-50 italic font-mono">
        (There is no right choice. Only interesting ones.)
      </p>
    </div>
  );
}
