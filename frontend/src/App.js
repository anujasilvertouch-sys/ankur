import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Timer, CheckCircle, XCircle, Flame, Star } from 'lucide-react';

// Master Data - 49 Cards (from Developer Blueprint)
const GAME_CARDS = [
  // Dialogues (1-15) - 10 points each
  {id: 1, cat: "Dialogue", task: "Mogambo khush hua!", ans: "Mr. India", pts: 10},
  {id: 2, cat: "Dialogue", task: "Don ko pakadna mushkil hi nahi...", ans: "Don", pts: 10},
  {id: 3, cat: "Dialogue", task: "Mere paas maa hai!", ans: "Deewar", pts: 10},
  {id: 4, cat: "Dialogue", task: "Kitne aadmi the?", ans: "Sholay", pts: 10},
  {id: 5, cat: "Dialogue", task: "Pushpa, I hate tears...", ans: "Amar Prem", pts: 10},
  {id: 6, cat: "Dialogue", task: "All is well!", ans: "3 Idiots", pts: 10},
  {id: 7, cat: "Dialogue", task: "Picture abhi baaki hai mere dost!", ans: "Om Shanti Om", pts: 10},
  {id: 8, cat: "Dialogue", task: "Rahul, naam toh suna hoga?", ans: "Dil To Pagal Hai", pts: 10},
  {id: 9, cat: "Dialogue", task: "Main apni favorite hoon!", ans: "Jab We Met", pts: 10},
  {id: 10, cat: "Dialogue", task: "Rishte mein toh hum tumhare baap lagte hain...", ans: "Shahenshah", pts: 10},
  {id: 11, cat: "Dialogue", task: "Thappad se darr nahi lagta sahab...", ans: "Dabangg", pts: 10},
  {id: 12, cat: "Dialogue", task: "Mhare choriyan choron se kam hain ke?", ans: "Dangal", pts: 10},
  {id: 13, cat: "Dialogue", task: "Kutte, kameene, main tera khoon pee jaunga!", ans: "Sholay", pts: 10},
  {id: 14, cat: "Dialogue", task: "Babumoshai, zindagi badi honi chahiye...", ans: "Anand", pts: 10},
  {id: 15, cat: "Dialogue", task: "Tension lene ka nahi, sirf dene ka.", ans: "Munna Bhai MBBS", pts: 10},
  
  // Keywords (16-48) - 20 points each
  {id: 16, cat: "Keyword", task: "DUPATTA", ans: "Any song starting with word", pts: 20},
  {id: 17, cat: "Keyword", task: "CHASHMA", ans: "Any song starting with word", pts: 20},
  {id: 18, cat: "Keyword", task: "JHUMKA", ans: "Any song starting with word", pts: 20},
  {id: 19, cat: "Keyword", task: "MEHNDI", ans: "Any song starting with word", pts: 20},
  {id: 20, cat: "Keyword", task: "SHAADI", ans: "Any song starting with word", pts: 20},
  {id: 21, cat: "Keyword", task: "PARDESI", ans: "Any song starting with word", pts: 20},
  {id: 22, cat: "Keyword", task: "DEEWANA", ans: "Any song starting with word", pts: 20},
  {id: 23, cat: "Keyword", task: "SAAJAN", ans: "Any song starting with word", pts: 20},
  {id: 24, cat: "Keyword", task: "DILBAR", ans: "Any song starting with word", pts: 20},
  {id: 25, cat: "Keyword", task: "DISCO", ans: "Any song starting with word", pts: 20},
  {id: 26, cat: "Keyword", task: "NACHDE", ans: "Any song starting with word", pts: 20},
  {id: 27, cat: "Keyword", task: "ZINDAGI", ans: "Any song starting with word", pts: 20},
  {id: 28, cat: "Keyword", task: "BARSAAT", ans: "Any song starting with word", pts: 20},
  {id: 29, cat: "Keyword", task: "HERO", ans: "Any song starting with word", pts: 20},
  {id: 30, cat: "Keyword", task: "DUNIYA", ans: "Any song starting with word", pts: 20},
  {id: 31, cat: "Keyword", task: "CHANDNI", ans: "Any song starting with word", pts: 20},
  {id: 32, cat: "Keyword", task: "MASTANI", ans: "Any song starting with word", pts: 20},
  {id: 33, cat: "Keyword", task: "DHOL", ans: "Any song starting with word", pts: 20},
  {id: 34, cat: "Keyword", task: "AANKHEN", ans: "Any song starting with word", pts: 20},
  {id: 35, cat: "Keyword", task: "BINDIYA", ans: "Any song starting with word", pts: 20},
  {id: 36, cat: "Keyword", task: "RAAT", ans: "Any song starting with word", pts: 20},
  {id: 37, cat: "Keyword", task: "DUM", ans: "Any song starting with word", pts: 20},
  {id: 38, cat: "Keyword", task: "SABSE", ans: "Any song starting with word", pts: 20},
  {id: 39, cat: "Keyword", task: "PAAYAL", ans: "Any song starting with word", pts: 20},
  {id: 40, cat: "Keyword", task: "CHAIYYA", ans: "Any song starting with word", pts: 20},
  {id: 41, cat: "Keyword", task: "GULAABI", ans: "Any song starting with word", pts: 20},
  {id: 42, cat: "Keyword", task: "PARTY", ans: "Any song starting with word", pts: 20},
  {id: 43, cat: "Keyword", task: "BOLLYWOOD", ans: "Any song starting with word", pts: 20},
  {id: 44, cat: "Keyword", task: "CHURA", ans: "Any song starting with word", pts: 20},
  {id: 45, cat: "Keyword", task: "BADAN", ans: "Any song starting with word", pts: 20},
  {id: 46, cat: "Keyword", task: "CHALTI", ans: "Any song starting with word", pts: 20},
  {id: 47, cat: "Keyword", task: "MEHBOOBA", ans: "Any song starting with word", pts: 20},
  {id: 48, cat: "Keyword", task: "KHUSHI", ans: "Any song starting with word", pts: 20},
  
  // Climax Card (49) - 50 points
  {id: 49, cat: "Climax", task: "Actor: 'K-k-k-k-Kiran!' + Rain Song", ans: "SRK + Any Rain Song", pts: 50}
];

const App = () => {
  const [gameState, setGameState] = useState('setup'); // setup, playing, result
  const [teamAName, setTeamAName] = useState('');
  const [teamBName, setTeamBName] = useState('');
  const [umpireChecked, setUmpireChecked] = useState(false);
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [currentTurn, setCurrentTurn] = useState('A');
  const [usedCards, setUsedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  
  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft <= 5 && timeLeft > 0) {
          playTickSound();
        }
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      playBuzzerSound();
      setTimerActive(false);
      setTimerExpired(true); // Mark timer as expired
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, timerActive]);

  // Sound effects
  const playTickSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.1;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playBuzzerSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    gainNode.gain.value = 0.2;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const playVictorySound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.15;
      oscillator.start(audioContext.currentTime + i * 0.15);
      oscillator.stop(audioContext.currentTime + i * 0.15 + 0.3);
    });
  };

  const startGame = () => {
    if (teamAName.trim() && teamBName.trim() && umpireChecked) {
      setGameState('playing');
    }
  };

  const handleCardClick = (cardId) => {
    if (usedCards.includes(cardId)) return;
    setSelectedCard(cardId);
    setShowAnswer(false);
    setTimeLeft(20);
    setTimerActive(true);
  };

  const handleCorrect = () => {
    // Don't allow points if timer has expired
    if (timerExpired) return;
    
    const card = GAME_CARDS.find(c => c.id === selectedCard);
    if (currentTurn === 'A') {
      setTeamAScore(teamAScore + card.pts);
    } else {
      setTeamBScore(teamBScore + card.pts);
    }
    closePopup();
  };

  const handleWrong = () => {
    closePopup();
  };

  const closePopup = () => {
    setUsedCards([...usedCards, selectedCard]);
    setSelectedCard(null);
    setTimerActive(false);
    setShowAnswer(false);
    setTimerExpired(false); // Reset timer expired flag
    setCurrentTurn(currentTurn === 'A' ? 'B' : 'A');
    
    // Check if game is over (all 49 cards used)
    if (usedCards.length + 1 === 49) {
      setTimeout(() => {
        setGameState('result');
        playVictorySound();
        setShowConfetti(true);
      }, 500);
    }
  };

  const getCardColor = (cardId) => {
    if (cardId >= 1 && cardId <= 15) return 'from-red-400 to-rose-500'; // Dialogues - Light Red
    if (cardId >= 16 && cardId <= 48) return 'from-blue-400 to-cyan-500'; // Keywords - Light Blue
    if (cardId === 49) return 'from-yellow-400 via-amber-500 to-orange-600'; // Climax - Gold
  };

  const resetGame = () => {
    setGameState('setup');
    setTeamAName('');
    setTeamBName('');
    setUmpireChecked(false);
    setTeamAScore(0);
    setTeamBScore(0);
    setCurrentTurn('A');
    setUsedCards([]);
    setSelectedCard(null);
    setShowAnswer(false);
    setShowConfetti(false);
  };

  // Setup Page
  if (gameState === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 via-red-800 to-amber-900 flex items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full relative z-10 border-4 border-yellow-400">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Sparkles className="text-orange-600 w-16 h-16 animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 mb-2 tracking-tight" style={{fontFamily: 'Poppins, sans-serif'}}>
              Smart Antakshari
            </h1>
            <p className="text-red-700 text-lg font-semibold">Wedding Special Edition</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-red-900 font-bold mb-2 text-sm uppercase tracking-wide">Team A Ka Naam</label>
              <input
                type="text"
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
                placeholder="Dulha Ki Team"
                className="w-full px-4 py-3 rounded-xl border-3 border-orange-300 focus:border-orange-500 focus:outline-none text-lg font-semibold text-red-900 bg-white/80 placeholder-red-400"
              />
            </div>
            
            <div>
              <label className="block text-red-900 font-bold mb-2 text-sm uppercase tracking-wide">Team B Ka Naam</label>
              <input
                type="text"
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value)}
                placeholder="Dulhan Ki Team"
                className="w-full px-4 py-3 rounded-xl border-3 border-orange-300 focus:border-orange-500 focus:outline-none text-lg font-semibold text-red-900 bg-white/80 placeholder-red-400"
              />
            </div>
            
            <div className="flex items-center gap-3 bg-white/50 p-4 rounded-xl border-2 border-orange-300">
              <input
                type="checkbox"
                id="umpire"
                checked={umpireChecked}
                onChange={(e) => setUmpireChecked(e.target.checked)}
                className="w-6 h-6 rounded border-orange-400 text-orange-600 focus:ring-orange-500 cursor-pointer"
              />
              <label htmlFor="umpire" className="text-red-900 font-bold text-sm cursor-pointer">
                Main Umpire hoon aur game fair khilaonga! ✋
              </label>
            </div>
            
            <button
              onClick={startGame}
              disabled={!teamAName.trim() || !teamBName.trim() || !umpireChecked}
              className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-black py-4 rounded-2xl text-xl uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              🎉 Game Shuru Karo! 🎉
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Result Page
  if (gameState === 'result') {
    const winner = teamAScore > teamBScore ? teamAName : teamBName;
    const winnerScore = Math.max(teamAScore, teamBScore);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4 relative overflow-hidden">
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-10%',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
        
        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full relative z-10 border-4 border-yellow-400 text-center">
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6 animate-bounce" />
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600 mb-4">
            🎊 VICTORY 🎊
          </h1>
          
          <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-2xl p-8 mb-6 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-black mb-2">{winner}</h2>
            <p className="text-6xl md:text-7xl font-black">{winnerScore} Points</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/50 rounded-xl p-4 border-2 border-orange-300">
              <p className="text-sm font-bold text-red-800 uppercase">Team A</p>
              <p className="text-2xl font-black text-red-900">{teamAName}</p>
              <p className="text-3xl font-black text-orange-600">{teamAScore}</p>
            </div>
            <div className="bg-white/50 rounded-xl p-4 border-2 border-orange-300">
              <p className="text-sm font-bold text-red-800 uppercase">Team B</p>
              <p className="text-2xl font-black text-red-900">{teamBName}</p>
              <p className="text-3xl font-black text-orange-600">{teamBScore}</p>
            </div>
          </div>
          
          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-500 to-teal-600 text-white font-black py-4 px-8 rounded-2xl text-xl uppercase tracking-wider shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            🔄 Naya Game Shuru Karo
          </button>
        </div>
      </div>
    );
  }

  // Main Dashboard (7x7 Grid)
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-cyan-900 p-4 md:p-6">
      {/* Header - Scoreboard */}
      <div className="mb-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 md:p-6 shadow-xl border-4 border-yellow-400">
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Team A */}
          <div className={`text-center p-4 rounded-xl transition-all ${currentTurn === 'A' ? 'bg-gradient-to-br from-orange-400 to-red-500 scale-105 shadow-lg' : 'bg-white/50'}`}>
            <p className={`text-xs md:text-sm font-bold uppercase tracking-wide mb-1 ${currentTurn === 'A' ? 'text-white' : 'text-red-800'}`}>
              {currentTurn === 'A' && '👉 '} Team A
            </p>
            <p className={`text-lg md:text-xl font-black truncate ${currentTurn === 'A' ? 'text-white' : 'text-red-900'}`}>
              {teamAName}
            </p>
            <p className={`text-3xl md:text-4xl font-black ${currentTurn === 'A' ? 'text-yellow-300' : 'text-orange-600'}`}>
              {teamAScore}
            </p>
          </div>
          
          {/* VS */}
          <div className="text-center">
            <Flame className="w-12 h-12 md:w-16 md:h-16 text-red-600 mx-auto animate-pulse" />
            <p className="text-red-800 font-black text-xl md:text-2xl">VS</p>
          </div>
          
          {/* Team B */}
          <div className={`text-center p-4 rounded-xl transition-all ${currentTurn === 'B' ? 'bg-gradient-to-br from-orange-400 to-red-500 scale-105 shadow-lg' : 'bg-white/50'}`}>
            <p className={`text-xs md:text-sm font-bold uppercase tracking-wide mb-1 ${currentTurn === 'B' ? 'text-white' : 'text-red-800'}`}>
              {currentTurn === 'B' && '👉 '} Team B
            </p>
            <p className={`text-lg md:text-xl font-black truncate ${currentTurn === 'B' ? 'text-white' : 'text-red-900'}`}>
              {teamBName}
            </p>
            <p className={`text-3xl md:text-4xl font-black ${currentTurn === 'B' ? 'text-yellow-300' : 'text-orange-600'}`}>
              {teamBScore}
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-red-800 font-bold text-sm">
            Cards Used: {usedCards.length} / 49
          </p>
        </div>
      </div>

      {/* Card Grid - 7x7 = 49 Cards */}
      <div className="grid grid-cols-7 gap-2 md:gap-3 max-w-4xl mx-auto">
        {GAME_CARDS.map((card) => {
          const isUsed = usedCards.includes(card.id);
          
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={isUsed}
              className={`aspect-square rounded-xl font-black text-base md:text-xl transition-all shadow-lg flex items-center justify-center ${
                isUsed
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-40'
                  : `bg-gradient-to-br ${getCardColor(card.id)} text-white hover:scale-110 hover:shadow-2xl active:scale-95`
              }`}
            >
              {card.id === 49 ? <Star className="w-6 h-6 md:w-8 md:h-8" /> : card.id}
            </button>
          );
        })}
      </div>

      {/* Pop-up Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 border-4 border-yellow-400 relative">
            {(() => {
              const card = GAME_CARDS.find(c => c.id === selectedCard);
              return (
                <>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-2xl px-6 py-3 rounded-full shadow-lg">
                    Card #{selectedCard}
                  </div>
                  
                  {/* Timer */}
                  <div className="text-center mb-6 mt-4">
                    <Timer className={`w-16 h-16 mx-auto mb-2 ${timeLeft <= 5 ? 'text-red-600 animate-bounce' : 'text-orange-600'}`} />
                    <div className={`text-6xl font-black ${timeLeft <= 5 ? 'text-red-600 animate-pulse' : 'text-orange-600'}`}>
                      {timeLeft}s
                    </div>
                    {timerExpired && (
                      <div className="mt-2 bg-red-500 text-white font-black py-2 px-4 rounded-lg animate-pulse">
                        ⏰ TIME UP! No points can be awarded
                      </div>
                    )}
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-yellow-500 h-full transition-all duration-1000 rounded-full"
                        style={{ width: `${(timeLeft / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Question */}
                  <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 mb-4 border-2 border-orange-300">
                    <p className="text-sm font-bold text-red-800 uppercase mb-2">
                      {card.cat === 'Dialogue' ? '🎬 Dialogue' : 
                       card.cat === 'Keyword' ? '🎵 Keyword Challenge' : 
                       '⭐ Climax Challenge'}
                      {' '} (+{card.pts} points)
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-red-900">
                      {card.task}
                    </p>
                  </div>
                  
                  {/* Answer Section */}
                  <div className="mb-6">
                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 rounded-xl mb-3 hover:shadow-lg transition-all"
                    >
                      {showAnswer ? '🙈 Answer Chhupao' : '👀 Check Answer'}
                    </button>
                    
                    {showAnswer && (
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-400 animate-fadeIn">
                        <p className="text-lg font-bold text-green-900">
                          ✅ {card.ans}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleCorrect}
                      disabled={timerExpired}
                      className={`bg-gradient-to-br from-green-500 to-emerald-600 text-white font-black py-4 rounded-xl text-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 ${
                        timerExpired ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''
                      }`}
                    >
                      <CheckCircle className="w-6 h-6" />
                      Correct
                    </button>
                    <button
                      onClick={handleWrong}
                      className="bg-gradient-to-br from-red-500 to-rose-600 text-white font-black py-4 rounded-xl text-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-6 h-6" />
                      Wrong
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;