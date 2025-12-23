import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import FloatingHearts from '@/components/FloatingHearts';

const Message: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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
              Message for You
            </h1>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Envelope Container */}
      <main className="flex-1 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div 
          className="relative cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {/* Instructions */}
          {!isOpen && (
            <p className="absolute -top-16 left-1/2 -translate-x-1/2 text-muted-foreground text-center animate-pulse">
              Click the envelope to open 💌
            </p>
          )}

          {/* Envelope */}
          <div className={`relative transition-all duration-1000 ${isOpen ? 'scale-110' : 'hover:scale-105'}`}>
            {/* Envelope body */}
            <div 
              className={`relative w-72 h-48 md:w-96 md:h-64 bg-card rounded-lg shadow-card overflow-hidden transition-all duration-700 ${
                isOpen ? 'bg-opacity-50' : ''
              }`}
              style={{
                perspective: '1000px',
              }}
            >
              {/* Envelope flap */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1/2 origin-top transition-transform duration-700 ease-in-out z-20 ${
                  isOpen ? 'rotate-x-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)',
                }}
              >
                {/* Front of flap */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-secondary to-card"
                  style={{
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    backfaceVisibility: 'hidden',
                  }}
                />
                {/* Back of flap */}
                <div 
                  className="absolute inset-0 bg-pink-light"
                  style={{
                    clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateX(180deg)',
                  }}
                />
              </div>

              {/* Bottom triangles */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-secondary"
                style={{
                  clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                }}
              />

              {/* Decorative seal */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 ${
                isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-heart rounded-full flex items-center justify-center shadow-glow animate-pulse-heart">
                  <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground fill-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Letter */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 w-64 md:w-80 bg-card rounded-lg shadow-card p-6 md:p-8 transition-all duration-1000 ease-out ${
                isOpen 
                  ? 'opacity-100 -translate-y-[120%] md:-translate-y-[50%]' 
                  : 'opacity-0 translate-y-0 pointer-events-none'
              }`}
            >
              {/* Decorative header */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-pink" />
                <Heart className="w-6 h-6 text-heart fill-heart" />
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-pink" />
              </div>

              {/* To line */}
              <p className="text-sm text-muted-foreground mb-3 font-script">
                To: {currentUser?.displayName} 💕
              </p>

              {/* Message */}
              <p className="text-foreground leading-relaxed text-sm md:text-base">
                {currentUser?.message}
              </p>

              {/* From line */}
              <div className="mt-6 text-right">
                <p className="font-script text-xl text-gradient">With Love,</p>
                <p className="text-muted-foreground text-sm">Your Friend 💖</p>
              </div>

              {/* Corner decorations */}
              <Heart className="absolute top-3 right-3 w-4 h-4 text-pink-light" />
              <Heart className="absolute bottom-3 left-3 w-4 h-4 text-pink-light" />
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .rotate-x-180 {
          transform: rotateX(-180deg);
        }
      `}</style>
    </div>
  );
};

export default Message;
