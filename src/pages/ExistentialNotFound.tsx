interface ExistentialNotFoundProps {
  onBack: () => void;
}

export default function ExistentialNotFound({ onBack }: ExistentialNotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl md:text-5xl mb-6 font-bold glitch" style={{ userSelect: "none" }}>404: This Page Exists</h1>
      <p className="italic opacity-70 mb-8 text-center max-w-md font-mono" style={{ userSelect: "none" }}>
        You just can't see it. Maybe it's behind you.
      </p>
      <button 
        onClick={onBack} 
        className="underline opacity-70 hover:opacity-100 font-mono"
      >
        back
      </button>
    </div>
  );
}
