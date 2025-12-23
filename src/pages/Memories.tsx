import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import FloatingHearts from '@/components/FloatingHearts';

const Memories: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showFooter, setShowFooter] = useState(false);

  const memories = currentUser?.photos.map((photo, index) => ({
    id: index + 1,
    title: `Memory ${index + 1}`,
    description: "A beautiful moment captured 💕",
    color: ["from-pink to-coral", "from-coral to-gold", "from-gold to-pink", "from-heart to-coral", "from-pink to-heart", "from-coral to-pink"][index % 6],
    image: photo,
  })) || [];

  useEffect(() => {
    // Animate cards one by one
    memories.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
      }, index * 300);
    });

    // Show footer after all cards
    setTimeout(() => {
      setShowFooter(true);
    }, memories.length * 300 + 500);
  }, [memories]);

  return (
    <div className="min-h-screen gradient-warm relative overflow-hidden">
      <FloatingHearts />

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
              Some Beautiful Moments
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Our journey together, {currentUser?.displayName}
            </p>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Memory Cards Grid */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {memories.map((memory, index) => (
            <div
              key={memory.id}
              className={`transform transition-all duration-700 ${
                visibleCards.includes(index)
                  ? 'opacity-100 translate-x-0 rotate-0'
                  : 'opacity-0 -translate-x-full -rotate-12'
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <div className="group relative bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2">
                {/* Photo section */}
                <div className={`aspect-[4/3] bg-gradient-to-br ${memory.color} relative overflow-hidden`}>
                  <img
                    src={memory.image}
                    alt={memory.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Sparkle decoration */}
                  <Sparkles className="absolute top-4 right-4 w-6 h-6 text-white/70 group-hover:animate-sparkle" />
                </div>

                {/* Corner heart */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-5 h-5 text-heart fill-heart animate-pulse-heart" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Footer */}
        {showFooter && (
          <footer className="mt-16 mb-8 relative">
            <div className="flex justify-end items-center gap-2 overflow-hidden">                         
              <p 
                style={{animation: 'fadeSlideIn 0.8s ease-out 1s forwards',
                }}
              >
                Thanks for being with me 💕
              </p>
            </div>
          </footer>
        )}
      </main>

      <style>{`
        @keyframes cardDeal {
          0% {
            opacity: 0;
            transform: translateX(-100px) rotate(-30deg);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: translateX(0) rotate(0deg);
          }
        }
        
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Memories;
