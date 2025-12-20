import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import FloatingHearts from '@/components/FloatingHearts';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !password.trim()) {
      toast.error('Please enter both name and password');
      return;
    }

    const success = login(name, password);
    
    if (success) {
      toast.success('Welcome back, friend! 💕');
      navigate('/welcome');
    } else {
      setIsShaking(true);
      toast.error('Invalid credentials! Are you really my friend? 🤔');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen gradient-warm flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-coral opacity-20 animate-float">
        <Sparkles size={60} />
      </div>
      <div className="absolute bottom-10 right-10 text-pink opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles size={80} />
      </div>

      <div 
        className={`w-full max-w-md bg-card/80 backdrop-blur-sm rounded-3xl shadow-card p-8 relative z-10 ${
          isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''
        }`}
        style={{
          animation: isShaking ? 'shake 0.5s ease-in-out' : 'none',
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink to-coral rounded-full shadow-glow mb-4">
            <Heart className="w-10 h-10 text-primary-foreground fill-primary-foreground animate-pulse-heart" />
          </div>
          <h1 className="text-4xl font-script text-gradient mb-2">Welcome Friend!</h1>
          <p className="text-muted-foreground">Enter your credentials to unlock our memories</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <User size={16} className="text-coral" />
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background/50 focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/20 transition-all duration-300 placeholder:text-muted-foreground/50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Lock size={16} className="text-coral" />
              Secret Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your secret..."
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background/50 focus:border-pink focus:outline-none focus:ring-2 focus:ring-pink/20 transition-all duration-300 placeholder:text-muted-foreground/50"
            />
          </div>

          <Button type="submit" variant="love" size="xl" className="w-full">
            <Heart className="w-5 h-5" />
            Enter Our World
          </Button>
        </form>

        {/* Hint */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Only true friends know the password! 💕
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
