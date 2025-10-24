import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Shuffle, Repeat, Repeat1, Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface LofiStudyProps {
  onBack: () => void;
}

interface Song {
  id: number;
  name: string;
  artist: string;
  url: string;
  duration: string;
}

// Curated lofi playlist from Pixabay
const PLAYLIST: Song[] = [
  {
    id: 1,
    name: "Lofi Study",
    artist: "FASSounds",
    url: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3",
    duration: "2:20"
  },
  {
    id: 2,
    name: "Good Night",
    artist: "FASSounds", 
    url: "https://cdn.pixabay.com/audio/2023/10/03/audio_c23ae9e5f8.mp3",
    duration: "2:17"
  },
  {
    id: 3,
    name: "Morning Routine",
    artist: "Mood Mode",
    url: "https://cdn.pixabay.com/audio/2024/03/07/audio_a356ec015d.mp3",
    duration: "2:18"
  },
  {
    id: 4,
    name: "Spirit Blossom",
    artist: "RomanBelov",
    url: "https://cdn.pixabay.com/audio/2022/03/10/audio_4c91f4e8ed.mp3",
    duration: "2:43"
  },
  {
    id: 5,
    name: "Lofi Chill",
    artist: "Lesfm",
    url: "https://cdn.pixabay.com/audio/2023/04/25/audio_00e00bdaf8.mp3",
    duration: "2:41"
  },
  {
    id: 6,
    name: "Aesthetic",
    artist: "Newsound",
    url: "https://cdn.pixabay.com/audio/2022/10/18/audio_9b6fa396c3.mp3",
    duration: "2:30"
  },
  {
    id: 7,
    name: "Chill Vibes",
    artist: "Petar Dukic",
    url: "https://cdn.pixabay.com/audio/2024/10/28/audio_b503201f2f.mp3",
    duration: "3:01"
  },
  {
    id: 8,
    name: "Night Sky",
    artist: "prazkhanal",
    url: "https://cdn.pixabay.com/audio/2024/06/09/audio_94d815daad.mp3",
    duration: "2:45"
  }
];

const motivationalYells = [
  "STUDY, YOU BEAUTIFUL DISASTER!",
  "YOUR BRAIN CELLS ARE SCREAMING!",
  "KNOWLEDGE OR CHAOS. PICK ONE.",
  "THE VOID DEMANDS PRODUCTIVITY!",
  "FOCUS... OR DON'T. I'M NOT YOUR MOM.",
  "EXISTENTIAL DREAD = PROCRASTINATION",
  "READ THAT AGAIN. SLOWLY.",
];

const visualizers = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];

type RepeatMode = "off" | "all" | "one";

export default function LofiStudy({ onBack }: LofiStudyProps) {
  const [playing, setPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [visualizer, setVisualizer] = useState<string[]>(Array(12).fill("▁"));
  const [vibeCheck, setVibeCheck] = useState("📚");
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("off");
  const [shuffledPlaylist, setShuffledPlaylist] = useState<Song[]>(PLAYLIST);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (shuffle) {
      const shuffled = [...PLAYLIST].sort(() => Math.random() - 0.5);
      setShuffledPlaylist(shuffled);
    } else {
      setShuffledPlaylist(PLAYLIST);
    }
  }, [shuffle]);

  const currentPlaylist = shuffle ? shuffledPlaylist : PLAYLIST;
  const currentSong = currentPlaylist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (playing) {
        audioRef.current.play().catch(() => {
          setPlaying(false);
        });
      }
    }
  }, [currentSong, currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => setPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  const handleSongEnd = () => {
    if (repeat === "one") {
      audioRef.current?.play();
    } else if (repeat === "all" || currentSongIndex < currentPlaylist.length - 1) {
      nextSong();
    } else {
      setPlaying(false);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => 
      prev >= currentPlaylist.length - 1 ? 0 : prev + 1
    );
  };

  const prevSong = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
    } else {
      setCurrentSongIndex((prev) => 
        prev <= 0 ? currentPlaylist.length - 1 : prev - 1
      );
    }
  };

  const toggleRepeat = () => {
    setRepeat(prev => {
      if (prev === "off") return "all";
      if (prev === "all") return "one";
      return "off";
    });
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (playing) {
      timer = setInterval(() => setStudyTime(prev => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    let yellTimer: NodeJS.Timeout;
    if (playing) {
      yellTimer = setInterval(() => {
        if (Math.random() > 0.6) {
          const randomYell = motivationalYells[Math.floor(Math.random() * motivationalYells.length)];
          toast(randomYell, {
            duration: 3000,
            style: {
              background: "hsl(var(--chaos-pink))",
              color: "hsl(var(--void))",
              border: "none",
              fontFamily: "Fira Code, monospace",
              fontWeight: "bold",
            },
          });
        }
      }, 8000);
    }
    return () => clearInterval(yellTimer);
  }, [playing]);

  useEffect(() => {
    let visualizerTimer: NodeJS.Timeout;
    if (playing) {
      visualizerTimer = setInterval(() => {
        setVisualizer(Array(12).fill(0).map(() => 
          visualizers[Math.floor(Math.random() * visualizers.length)]
        ));
      }, 200);
    }
    return () => clearInterval(visualizerTimer);
  }, [playing]);

  useEffect(() => {
    if (studyTime > 0 && studyTime % 300 === 0) {
      const vibes = ["🧠", "💀", "🔥", "✨", "👁️", "🌀"];
      setVibeCheck(vibes[Math.floor(Math.random() * vibes.length)]);
    }
  }, [studyTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
      <audio 
        ref={audioRef} 
        onEnded={handleSongEnd}
        onError={() => {
          toast.error("Failed to load song", {
            style: { fontFamily: "Fira Code, monospace" }
          });
        }}
      />

      <h1 className="text-3xl md:text-4xl mb-2 font-bold">Lo-Fi Study With Chaos 🎧</h1>
      <p className="mb-6 opacity-70 font-mono text-sm">chill beats... with occasional existential terror</p>
      
      {/* Now Playing */}
      <div className="mb-6 p-6 border-2 border-primary rounded-lg max-w-md w-full bg-card">
        <div className="text-xs opacity-50 mb-2 font-mono">NOW PLAYING</div>
        <div className="text-xl font-bold mb-1">{currentSong.name}</div>
        <div className="text-sm opacity-70 mb-4">{currentSong.artist}</div>
        
        {playing && (
          <div className="text-2xl font-mono text-chaos-pink animate-pulse mb-4">
            {visualizer.join(" ")}
          </div>
        )}

        {/* Player Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={prevSong}
            className="p-2 hover:bg-primary/20 rounded transition-colors"
            title="Previous"
          >
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={() => setPlaying(!playing)}
            className="p-4 bg-primary text-background rounded-full hover:scale-110 transition-transform"
          >
            {playing ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </button>
          
          <button
            onClick={nextSong}
            className="p-2 hover:bg-primary/20 rounded transition-colors"
            title="Next"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Secondary Controls */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <button
            onClick={() => setShuffle(!shuffle)}
            className={`p-2 rounded transition-colors ${shuffle ? 'text-chaos-green' : 'opacity-50 hover:opacity-100'}`}
            title={shuffle ? "Shuffle on" : "Shuffle off"}
          >
            <Shuffle size={18} />
          </button>
          
          <button
            onClick={toggleRepeat}
            className={`p-2 rounded transition-colors ${repeat !== 'off' ? 'text-chaos-pink' : 'opacity-50 hover:opacity-100'}`}
            title={`Repeat: ${repeat}`}
          >
            {repeat === "one" ? <Repeat1 size={18} /> : <Repeat size={18} />}
          </button>
        </div>
      </div>

      {/* Study Timer */}
      {studyTime > 0 && (
        <div className="mb-6 font-mono">
          <div className="text-xl text-chaos-green">
            Study Time: {formatTime(studyTime)} {vibeCheck}
          </div>
          <div className="text-xs opacity-50 mt-1">
            {studyTime > 600 ? "you're actually studying?! impressive." : "the void watches..."}
          </div>
        </div>
      )}

      {/* Playlist Toggle */}
      <button
        onClick={() => setShowPlaylist(!showPlaylist)}
        className="mb-4 px-6 py-2 border border-secondary hover:bg-secondary/20 transition-colors font-mono text-sm rounded"
      >
        {showPlaylist ? "hide playlist" : "show playlist"}
      </button>

      {/* Playlist */}
      {showPlaylist && (
        <div className="w-full max-w-md mb-6 border-2 border-secondary/50 rounded-lg overflow-hidden">
          <div className="max-h-64 overflow-y-auto">
            {currentPlaylist.map((song, index) => (
              <button
                key={`${song.id}-${index}`}
                onClick={() => {
                  setCurrentSongIndex(index);
                  setPlaying(true);
                }}
                className={`w-full p-3 text-left hover:bg-secondary/20 transition-colors border-b border-secondary/20 last:border-b-0 ${
                  index === currentSongIndex ? 'bg-secondary/30' : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className={`text-sm font-semibold ${index === currentSongIndex ? 'text-secondary' : ''}`}>
                      {index === currentSongIndex && playing && "▶ "}{song.name}
                    </div>
                    <div className="text-xs opacity-70">{song.artist}</div>
                  </div>
                  <div className="text-xs opacity-50 font-mono">{song.duration}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {studyTime > 0 && (
        <button
          onClick={() => setStudyTime(0)}
          className="mb-4 text-xs opacity-50 hover:opacity-100 font-mono underline"
        >
          reset timer
        </button>
      )}

      <button onClick={onBack} className="underline opacity-70 hover:opacity-100 font-mono text-sm">
        back
      </button>
    </div>
  );
}
