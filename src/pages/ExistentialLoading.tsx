import { useState } from "react";

interface ExistentialLoadingProps {
  setPage: (page: string) => void;
}

export default function ExistentialLoading({ setPage }: ExistentialLoadingProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  
  const questions = [
    "why?",
    "Why?",
    "wHy?",
    "whY?",
    "wHY?",
    "WHY?",
    "why?",
  ];

  const handleAnswer = (ans: string) => {
    if (
      ans.toLowerCase().includes("cause") ||
      ans.toLowerCase().includes("why") ||
      ans.toLowerCase().includes("because")
    ) {
      setPage("menu");
    } else {
      setQuestionIndex((prev) => (prev + 1) % questions.length);
      setInputValue("");
    }
  };

  if (questionIndex === 4) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl md:text-5xl mb-8 existential-pulse font-bold">
          {questions[questionIndex]}
        </h1>
        <input
          type="text"
          placeholder="your answer..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border-2 border-primary p-3 bg-transparent text-center w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary font-mono"
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              handleAnswer(inputValue);
            }
          }}
          autoFocus
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl md:text-5xl mb-8 existential-pulse font-bold">
        {questions[questionIndex]}
      </h1>
      <button
        onClick={() => setQuestionIndex((prev) => (prev + 1) % questions.length)}
        className="border-2 border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-200 font-mono"
      >
        continue
      </button>
    </div>
  );
}
