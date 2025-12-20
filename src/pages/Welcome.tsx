import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Camera, Mail, Gift, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import FloatingHearts from '@/components/FloatingHearts';

const Welcome: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      icon: Camera,
      title: 'Our Memory',
      description: 'Relive our beautiful moments',
      path: '/memories',
      gradient: 'from-pink to-coral',
      delay: 0.1,
    },
    {
      icon: Mail,
      title: 'Message for You',
      description: 'A special letter awaits',
      path: '/message',
      gradient: 'from-coral to-gold',
      delay: 0.2,
    },
    {
      icon: Gift,
      title: 'Surprise',
      description: 'Something special inside',
      path: '/surprise',
      gradient: 'from-heart to-pink',
      delay: 0.3,
    },
  ];

  return (
    <div className="min-h-screen gradient-warm flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />

      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 p-2 rounded-full bg-card/50 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-300 z-20"
      >
        <LogOut size={20} />
      </button>

      {/* Welcome Message */}
      <div className="text-center mb-12 relative z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-8 h-8 text-gold animate-sparkle" />
          <Heart className="w-12 h-12 text-heart fill-heart animate-pulse-heart" />
          <Sparkles className="w-8 h-8 text-gold animate-sparkle" style={{ animationDelay: '0.5s' }} />
        </div>
        <h1 className="text-5xl md:text-7xl font-script text-gradient mb-4">
          Welcome {currentUser?.displayName}!
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          I'm so happy you're here! Choose what you'd like to explore...
        </p>
      </div>

      {/* Menu Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full px-4 relative z-10">
        {menuItems.map((item, index) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="group relative bg-card/80 backdrop-blur-sm rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in overflow-hidden"
            style={{ animationDelay: `${item.delay}s`, animationFillMode: 'forwards' }}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-soft mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="w-8 h-8 text-primary-foreground" />
            </div>

            {/* Text */}
            <h3 className="text-2xl font-script text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>

            {/* Arrow indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
              <Heart className="w-5 h-5 text-pink fill-pink" />
            </div>
          </button>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coral/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default Welcome;
