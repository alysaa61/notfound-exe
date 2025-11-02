import { useState } from "react";
import ExistentialLoading from "./ExistentialLoading";
import Menu from "./Menu";
import LofiStudy from "./LofiStudy";
import AdoptRock from "./AdoptRock";
import ExistentialNotFound from "./ExistentialNotFound";
import CursorJudge from "@/components/CursorJudge";
import AboutMe from "./AboutMe";
import TypingTest from "./TypingTest";
import ColorMemory from "./ColorMemory";
import PetTheVoid from "./PetTheVoid";
import WhackAThought from "./WhackAThought";
import PointlessClicker from "./PointlessClicker";
import ChaosFortune from "./ChaosFortune";

const Index = () => {
  const [page, setPage] = useState("loading");

  const renderPage = () => {
    switch (page) {
      case "menu":
        return <Menu setPage={setPage} />;
      case "lofi":
        return <LofiStudy onBack={() => setPage("menu")} />;
      case "rock":
        return <AdoptRock onBack={() => setPage("menu")} />;
      case "typing":
        return <TypingTest onBack={() => setPage("menu")} />;
      case "memory":
        return <ColorMemory onBack={() => setPage("menu")} />;
      case "void":
        return <PetTheVoid onBack={() => setPage("menu")} />;
      case "whack":
        return <WhackAThought onBack={() => setPage("menu")} />;
      case "clicker":
        return <PointlessClicker onBack={() => setPage("menu")} />;
      case "fortune":
        return <ChaosFortune onBack={() => setPage("menu")} />;
      case "about":
        return <AboutMe onBack={() => setPage("menu")} />;
      case "404":
        return <ExistentialNotFound onBack={() => setPage("menu")} />;
      default:
        return <ExistentialLoading setPage={setPage} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CursorJudge />
      {renderPage()}
      <footer className="fixed bottom-4 right-4 text-sm opacity-70">
        <button 
          onClick={() => setPage("404")} 
          className="underline hover:opacity-100 transition-opacity font-mono"
        >
          try not to click on this
        </button>
      </footer>
    </div>
  );
};

export default Index;
