interface MenuProps {
  setPage: (page: string) => void;
}

export default function Menu({ setPage }: MenuProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 existential-pulse" style={{ userSelect: "none" }}>
        Welcome to notfound.exe
      </h1>
      <p className="italic opacity-70 mb-8 font-mono" style={{ userSelect: "none" }}>
        Choose your brand of chaos wisely.
      </p>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => setPage("lofi")}
          className="w-full border-2 border-chaos-green px-6 py-4 rounded-lg hover:bg-chaos-green hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          🎧 Lo-Fi Study With Chaos
        </button>
        <button
          onClick={() => setPage("rock")}
          className="w-full border-2 border-chaos-pink px-6 py-4 rounded-lg hover:bg-chaos-pink hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          🪨 Adopt a Rock
        </button>
        <button
          onClick={() => setPage("typing")}
          className="w-full border-2 border-chaos-green px-6 py-4 rounded-lg hover:bg-chaos-green hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          ⌨️ Existential Typing Test
        </button>
        <button
          onClick={() => setPage("memory")}
          className="w-full border-2 border-chaos-pink px-6 py-4 rounded-lg hover:bg-chaos-pink hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          🎨 Color Memory Chaos
        </button>
        <button
          onClick={() => setPage("void")}
          className="w-full border-2 border-chaos-green px-6 py-4 rounded-lg hover:bg-chaos-green hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          🌑 Pet the Void
        </button>
        <button
          onClick={() => setPage("whack")}
          className="w-full border-2 border-chaos-pink px-6 py-4 rounded-lg hover:bg-chaos-pink hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          💭 Whack-a-Thought
        </button>
        <button
          onClick={() => setPage("clicker")}
          className="w-full border-2 border-chaos-green px-6 py-4 rounded-lg hover:bg-chaos-green hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          👆 Pointless Clicker
        </button>
        <button
          onClick={() => setPage("fortune")}
          className="w-full border-2 border-chaos-pink px-6 py-4 rounded-lg hover:bg-chaos-pink hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          🔮 Chaos Fortune Teller
        </button>
        <button
          onClick={() => setPage("elevator")}
          className="w-full border-2 border-chaos-green px-6 py-4 rounded-lg hover:bg-chaos-green hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          🛗 Infinite Elevator
        </button>
        <button
          onClick={() => setPage("tictactoe")}
          className="w-full border-2 border-chaos-pink px-6 py-4 rounded-lg hover:bg-chaos-pink hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          ❌⭕ Existential Tic-Tac-Toe
        </button>
        <button
          onClick={() => setPage("about")}
          className="w-full border-2 border-muted px-6 py-4 rounded-lg hover:bg-muted hover:text-background transition-all duration-200 font-mono font-semibold hover-lift"
        >
          👤 About notfound.exe
        </button>
      </div>

      <p className="mt-12 text-xs opacity-50 italic font-mono" style={{ userSelect: "none" }}>
        (There is no right choice. Only interesting ones.)
      </p>
    </div>
  );
}
