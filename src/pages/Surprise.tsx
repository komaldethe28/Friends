import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Star, PartyPopper } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Confetti: React.FC = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
    color: ['bg-pink', 'bg-coral', 'bg-gold', 'bg-heart', 'bg-coral-light'][Math.floor(Math.random() * 5)],
    size: 8 + Math.random() * 8,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute ${piece.color} rounded-sm`}
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            animation: `confettiFall ${piece.duration}s linear ${piece.delay}s infinite`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
};

const Surprise: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start confetti after a short delay
    setTimeout(() => setShowConfetti(true), 300);
    setTimeout(() => setShowContent(true), 800);
  }, []);

  return (
    <div className="min-h-screen gradient-warm relative overflow-hidden">
      {showConfetti && <Confetti />}

      {/* Sparkle decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-gold animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/welcome')}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl md:text-4xl font-script text-gradient">
              Surprise!
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div 
          className={`text-center max-w-lg mx-auto transition-all duration-1000 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Celebration icon */}
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-gold via-coral to-pink rounded-full flex items-center justify-center shadow-glow animate-bounce-in">
              <PartyPopper className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
            </div>
            
            {/* Floating stars */}
            <Star className="absolute -top-2 -right-2 w-8 h-8 text-gold fill-gold animate-float" />
            <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-pink fill-pink animate-float" style={{ animationDelay: '0.5s' }} />
            <Heart className="absolute top-1/2 -right-6 w-6 h-6 text-heart fill-heart animate-pulse-heart" />
          </div>

          {/* Message */}
          <div 
            className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-card relative overflow-hidden"
            style={{
              animation: showContent ? 'scaleIn 0.6s ease-out 0.3s both' : 'none',
            }}
          >
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink/5 via-transparent to-coral/5" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-script text-gradient mb-4">
                Congrats!
              </h2>
              
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-heart fill-heart animate-pulse-heart" />
                <div className="w-16 h-0.5 bg-gradient-to-r from-pink to-coral" />
                <Heart className="w-5 h-5 text-heart fill-heart animate-pulse-heart" />
              </div>

              <p className="text-xl md:text-2xl text-foreground font-medium mb-4">
                You resubscribe our friendship!
              </p>
              
              <p className="text-muted-foreground mb-8">
                Dear {currentUser?.displayName}, here's to more memories, more laughs, and an unbreakable bond! 🎉
              </p>

              {/* Renewal badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink to-coral rounded-full text-primary-foreground shadow-soft">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold">Friendship Renewed Forever</span>
                <Star className="w-5 h-5 fill-current" />
              </div>

              {/* Back button */}
              <div className="mt-8">
                <Button variant="love" onClick={() => navigate('/welcome')}>
                  <Heart className="w-5 h-5" />
                  Back to Home
                </Button>
              </div>
            </div>

            {/* Corner hearts */}
            <Heart className="absolute top-4 right-4 w-6 h-6 text-pink-light opacity-50" />
            <Heart className="absolute bottom-4 left-4 w-6 h-6 text-pink-light opacity-50" />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes scaleIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Surprise;
