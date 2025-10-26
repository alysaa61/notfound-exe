import { useEffect, useState } from "react";

export default function CursorJudge() {
  const [message, setMessage] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [clicks, setClicks] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let lastTime = Date.now();
    let lastX = 0;
    let lastY = 0;
    let idleTimer: NodeJS.Timeout;

    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsIdle(false);
      
      // Add trail effect
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
      
      const now = Date.now();
      const diff = now - lastTime;
      const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));
      
      if (diff < 50 && distance > 20) setMessage("🏃 SPEED DEMON DETECTED");
      else if (diff > 400) setMessage("💤 wake up...");
      else if (distance < 2 && diff < 100) setMessage("🎯 surgical precision");
      else if (distance > 100) setMessage("🌪️ chaotic energy");
      else setMessage("😐 meh");
      
      lastTime = now;
      lastX = e.clientX;
      lastY = e.clientY;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 2000);
    };

    const handleClick = () => {
      setClicks(prev => {
        const newCount = prev + 1;
        if (newCount === 1) setMessage("👆 that's one click");
        else if (newCount === 10) setMessage("🤔 why so clicky?");
        else if (newCount === 50) setMessage("🚨 CLICK ADDICTION DETECTED");
        else if (newCount % 100 === 0) setMessage(`💯 ${newCount} clicks... get help`);
        return newCount;
      });
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
      clearTimeout(idleTimer);
    };
  }, []);

  useEffect(() => {
    if (isIdle) setMessage("👻 cursor has left the chat");
  }, [isIdle]);

  return (
    <>
      {trail.map((point, i) => (
        <div
          key={point.id}
          className="custom-cursor-trail"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: (i + 1) / trail.length * 0.3,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      <div 
        className="custom-cursor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 0.08s ease-out, top 0.08s ease-out',
        }}
      />
      <div className="fixed bottom-4 left-4 text-xs opacity-70 font-mono space-y-1">
        <div>{message}</div>
        {clicks > 0 && <div className="text-chaos-pink">clicks: {clicks}</div>}
      </div>
    </>
  );
}
