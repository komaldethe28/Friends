import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  name: string;
  displayName: string;
  photos: string[];
  message: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  currentUser: UserData | null;
  login: (name: string, password: string) => boolean;
  logout: () => void;
}

// Fixed users with their data
const USERS: Record<string, { password: string; data: UserData }> = {
  siddhi_dethe: {
    password: "23-28",
    data: {
      name: "siddhi",
      displayName: "Siddhi",
      photos: ["memory1", "memory2", "memory3", "memory4"],
      message: "I know you’re giving your 100%, and I’m really proud of you. No matter where life takes us, I’ll always be here for you. And remember, I’m the elder one, so respect me 😌❤️"
    }
  },
  monika: {
    password: "18-28",
    data: {
      name: "monika",
      displayName: "Monika",
      photos: ["memory1", "memory2", "memory3", "memory4"],
      message: "Monaa, you’re not just my best friend, you’re my forever family. All our memories and madness mean the world to me. Thank you for being with me! 💕"
    }
  },
  diksha_pawar: {
    password: "19-28",
    data: {
      name: "diksha",
      displayName: "Diksha",
      photos: ["memory1", "memory2", "memory3", "memory4"],
      message: "काळे, you're not just a friend, you're family! All our crazy adventures and fight mean the world to me. Stay awesome always! 🤍"
    }
  },
  pragati: {
    password: "29-28",
    data: {
      name: "pragati",
      displayName: "Pragati",
      photos: ["memory1", "memory2", "memory3", "memory4"],
      message: "I know you’re tired, but whenever your heart feels heavy, just call me anytime— I’ll always be there for you. You’re an irreplaceable part of my life  and my all-time preferred ChatGPT😅 Thank you for being with me! 💕"
    }
  },
  snehal_rathode: {
    password: "01-28",
    data: {
      name: "snehal_rathode",
      displayName: "Snehal",
      photos: ["memory1", "memory2", "memory3", "memory4"],
      message: "You are the most amazing friend I have. Your kindness and warmth light up my life every single day. Stay awesome always! 🤍"
    }
  },
  snehal_deshmukh: {
    password: "20-28",
    data: {
      name: "snehal",
      displayName: "Snehal",
      photos: ["memory1", "memory2", "memory3", "memory4"],
      message: "Some bonds are chosen, not born—and ours means everything to me. You’re an unchangeable part of my life, and no matter how many new friends I make, you’ll always be my priority. 💕"
    }
  },
  diksha_arsule: {
    password: "17-28",
    data: {
      name: "diksha_arsule",
      displayName: "Diksha",
      photos: ["memory1", "memory2", "memory3", "memory4"],
      message: "From strangers to friends, our journey has been magical. I don’t like sharing you with anyone—yeah, I get jealous sometimes 😅 Sorry for being rude at times. It’s only because you mean so much to me. And Thanks for always tolerating me. ✨"
    }
  },
  siddhi_nagare: {
    password: "05-28",
    data: {
      name: "siddhi_nagare",
      displayName: "Diksha",
      photos: ["memory1", "memory2", "memory3", "memory4"],
      message: "Remember when we first met? Who knew we'd become this close! You're the one I chose. Forever grateful! 🙌"
    }
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const login = (name: string, password: string): boolean => {
    const userName = name.toLowerCase().trim();
    const user = USERS[userName];
    
    if (user && user.password === password) {
      setIsLoggedIn(true);
      setCurrentUser(user.data);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
