import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

const Confetti = () => {
  return (
    <>
      <style>{`
        @keyframes bubbleFall {
          0% {
            top: -20px;
            opacity: 1;
          }
          100% {
            top: 100vh;
            opacity: 0;
          }
        }
        
        .bubble {
          position: fixed;
          pointer-events: none;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent);
          animation: bubbleFall linear infinite;
          z-index: 10;
        }
      `}</style>

      {Array.from({ length: 25 }).map((_, i) => {
        const size = 10 + Math.random() * 30;
        const left = Math.random() * 100;
        const duration = 4 + Math.random() * 3;
        const delay = Math.random() * 2;
        const color = ['#ec4899', '#f97316', '#fbbf24', '#ef4444'][
          Math.floor(Math.random() * 4)
        ];

        return (
          <div
            key={i}
            className="bubble"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              animation: `bubbleFall ${duration}s linear ${delay}s infinite`,
              opacity: 0.7,
            }}
          />
        );
      })}
    </>
  );
};

const Surprise = () => {
  const { currentUser } = useAuth();
  const [hearts, setHearts] = useState([]);

  const handleHeartClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  return (
    <div
      className="min-h-screen gradient-warm overflow-hidden relative  flex items-center justify-center p-4"
      onClick={handleHeartClick}
    >
      <Confetti />

      {/* Floating hearts on click */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none text-5xl"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            animation: 'floatHeart 1.2s ease-out forwards',
            zIndex: 50,
          }}
        >
          ❤️
        </div>
      ))}

      <style>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-80px) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>

      {/* Main Card like image */}
      <div className="relative z-20 w-full max-w-md">
        <div className="bg-gradient-to-br from-pink-50 to-white rounded-3xl shadow-2xl p-10 text-center border border-pink-100">

          <h1 className="text-4xl md:text-5xl font-script text-pink-400 mb-2">
            Congrats!
          </h1>

          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="text-red-400 text-xl">❤️</span>
            <div className="w-10 h-[2px] bg-pink-300 rounded-full"></div>
            <span className="text-red-400 text-xl">❤️</span>
          </div>

          <p className="text-lg md:text-xl text-gray-700 font-medium mb-3">
            You resubscribe our friendship!
          </p>

          <p className="text-gray-500 mb-8">
            Dear {currentUser?.displayName || 'Friend'}, here’s to more memories,
            more laughs, and an unbreakable bond! 🎉
          </p>

          <button className="w-full mb-4 py-3 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 text-white font-semibold shadow-lg hover:scale-105 transition">
            ⭐ Friendship Renewed Forever ⭐
          </button>


          <Link to="/welcome">
            <button className="w-full py-3 rounded-full bg-pink-300 text-white font-medium hover:bg-pink-400 transition">
              ♡ Back to Home
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Surprise;
