import { useState, useEffect } from "react";

interface SelfTicTacToeProps {
  onBack: () => void;
}

type Player = "X" | "O" | null;
type Board = Player[];

const EXISTENTIAL_COMMENTS = [
  "You're literally playing against yourself.",
  "This is a metaphor for internal conflict.",
  "Both sides are you. You can't win.",
  "The real opponent was inside you all along.",
  "This is what overthinking looks like.",
  "X and O are just symbols of your duality.",
  "Every move is both right and wrong.",
  "You're both winning and losing simultaneously.",
  "Schrödinger's tic-tac-toe game.",
  "The only winning move is not to... wait.",
  "This is your brain during decision-making.",
  "Congratulations, you played yourself.",
];

const DRAW_MESSAGES = [
  "A draw. Of course. You're perfectly balanced.",
  "Neither side wins. Classic internal struggle.",
  "Stalemate. Your mind is at peace. Or is it?",
  "A tie. You've achieved perfect equilibrium.",
  "Draw. The universe is satisfied with your indecision.",
];

const WIN_MESSAGES = [
  "You won! Against yourself. Paradox achieved.",
  "Victory! But at what cost? (You also lost)",
  "Congratulations! You defeated... you?",
  "Winner: You. Loser: Also you. Net result: Zero.",
  "You win! Your other half is devastated.",
];

export default function SelfTicTacToe({ onBack }: SelfTicTacToeProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<Player | "draw" | null>(null);
  const [comment, setComment] = useState("");
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("self-tictactoe-stats");
    if (saved) {
      const data = JSON.parse(saved);
      setGamesPlayed(data.gamesPlayed || 0);
      setXWins(data.xWins || 0);
      setOWins(data.oWins || 0);
      setDraws(data.draws || 0);
    }
    
    setComment(
      EXISTENTIAL_COMMENTS[
        Math.floor(Math.random() * EXISTENTIAL_COMMENTS.length)
      ]
    );
  }, []);

  const checkWinner = (squares: Board): Player | "draw" | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    if (squares.every((square) => square !== null)) {
      return "draw";
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
      const newGamesPlayed = gamesPlayed + 1;
      let newXWins = xWins;
      let newOWins = oWins;
      let newDraws = draws;

      if (result === "X") {
        newXWins++;
        setXWins(newXWins);
        setComment(
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
        );
      } else if (result === "O") {
        newOWins++;
        setOWins(newOWins);
        setComment(
          WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
        );
      } else {
        newDraws++;
        setDraws(newDraws);
        setComment(
          DRAW_MESSAGES[Math.floor(Math.random() * DRAW_MESSAGES.length)]
        );
      }

      setGamesPlayed(newGamesPlayed);
      localStorage.setItem(
        "self-tictactoe-stats",
        JSON.stringify({
          gamesPlayed: newGamesPlayed,
          xWins: newXWins,
          oWins: newOWins,
          draws: newDraws,
        })
      );
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      if (Math.random() > 0.7) {
        setComment(
          EXISTENTIAL_COMMENTS[
            Math.floor(Math.random() * EXISTENTIAL_COMMENTS.length)
          ]
        );
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setComment(
      EXISTENTIAL_COMMENTS[
        Math.floor(Math.random() * EXISTENTIAL_COMMENTS.length)
      ]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 existential-pulse">
          Existential Tic-Tac-Toe
        </h1>
        <p className="text-sm opacity-70 font-mono italic max-w-md">
          Play against yourself. Question your decisions.
        </p>
      </div>

      <div className="mb-6 text-center">
        <div className="text-2xl font-mono font-bold mb-2">
          Current Turn:{" "}
          <span
            className={
              currentPlayer === "X" ? "text-primary" : "text-secondary"
            }
          >
            {currentPlayer}
          </span>
        </div>
        {winner && (
          <div className="text-xl font-mono font-bold text-accent animate-scale-in">
            {winner === "draw" ? "DRAW!" : `${winner} WINS!`}
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 w-72 h-72">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="border-2 border-primary rounded-lg text-5xl font-bold hover:bg-primary/10 transition-all disabled:cursor-not-allowed hover-lift"
            disabled={!!cell || !!winner}
          >
            {cell && (
              <span
                className={
                  cell === "X"
                    ? "text-primary animate-scale-in"
                    : "text-secondary animate-scale-in"
                }
              >
                {cell}
              </span>
            )}
          </button>
        ))}
      </div>

      {comment && (
        <div className="max-w-md mb-6 p-4 border border-muted rounded-lg bg-background/30 animate-fade-in">
          <p className="text-sm font-mono italic text-center opacity-70">
            {comment}
          </p>
        </div>
      )}

      <div className="mb-6 p-4 border border-muted rounded-lg bg-background/20">
        <div className="text-xs font-mono space-y-1 text-center">
          <div className="opacity-70">Games Played: {gamesPlayed}</div>
          <div className="text-primary">X Wins: {xWins}</div>
          <div className="text-secondary">O Wins: {oWins}</div>
          <div className="opacity-50">Draws: {draws}</div>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={resetGame}
          className="px-6 py-3 border-2 border-secondary rounded-lg hover:bg-secondary hover:text-background transition-all font-mono font-semibold hover-lift"
        >
          New Game
        </button>
        <button
          onClick={onBack}
          className="px-6 py-3 border-2 border-muted rounded-lg hover:bg-muted hover:text-background transition-all font-mono hover-lift"
        >
          ← Back to Menu
        </button>
      </div>
    </div>
  );
}
