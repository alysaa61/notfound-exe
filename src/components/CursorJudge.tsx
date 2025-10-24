import { useEffect, useState } from "react";

export default function CursorJudge() {
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let lastTime = Date.now();

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const now = Date.now();
      const diff = now - lastTime;
      if (diff < 50) setMessage("😩 slow down, sprinter");
      else if (diff > 400) setMessage("…are you even here?");
      else setMessage("😐");
      lastTime = now;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <div 
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div className="fixed bottom-4 left-4 text-xs opacity-70 font-mono">
        {message}
      </div>
    </>
  );
}
