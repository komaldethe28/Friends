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
  siddhi: {
    password: "23-28",
    data: {
      name: "siddhi",
      displayName: "Siddhi",
      photos: ["/assets/siddhi/SD1.JPG", "/assets/siddhi/SD2.jpg", "/assets/siddhi/SD3.jpg", "/assets/siddhi/SD4.jpg", "/assets/siddhi/SD5.jpg", "/assets/siddhi/SD6.jpg"],
      message: "I know you’re giving your 100%, and I’m really proud of you. No matter where life takes us, I’ll always be here for you. And remember, I’m the elder one, so respect me 😌❤️"
    }
  },
  monika: {
    password: "18-28",
    data: {
      name: "monika",
      displayName: "Monika",
      photos: ["/assets/monika/MP1.jpg", "/assets/monika/MP2.jpg", "/assets/monika/MP3.jpg", "/assets/monika/MP4.jpg", "/assets/monika/MP5.jpg", "/assets/monika/MP6.webp"],
      message: "Monaa, you’re not just my best friend, you’re my forever family. All our memories and madness mean the world to me. Thank you for being with me! 💕"
    }
  },
  diksha_pawar: {
    password: "19-28",
    data: {
      name: "diksha",
      displayName: "Diksha",
      photos: ["/assets/diksha_pawar/DP0.jpg", "/assets/diksha_pawar/DP1.jpg", "/assets/diksha_pawar/DP2.jpg", "/assets/diksha_pawar/DP3.jpg", "/assets/diksha_pawar/DP4.jpg", "/assets/diksha_pawar/DP5.jpg"],
      message: "काळे, you're not just a friend, you're family! All our crazy adventures and fight mean the world to me. Stay awesome always! 🤍"
    }
  },
  pragati: {
    password: "28-28",
    data: {
      name: "pragati",
      displayName: "Pragati",
      photos: ["/assets/pragati/C1.jpg", "/assets/pragati/IMG_20240428_001523.jpg", "/assets/pragati/IMG_20250531_200442.jpg", "/assets/pragati/Snapchat-1799263343.jpg", "/assets/pragati/Snapchat-403486351.jpg", "/assets/pragati/WhatsApp Image 2025-12-23 at 12.55.23_96eab3bd.jpg"],
      message: "I know you’re tired, but whenever your heart feels heavy, just call me anytime— I’ll always be there for you. You’re an irreplaceable part of my life  and my all-time preferred ChatGPT😅 Thank you for being with me! 💕"
    }
  },
  snehal_rathode: {
    password: "01-28",
    data: {
      name: "snehal_rathode",
      displayName: "Snehal",
      photos: ["/assets/snehal_rathode/C1.jpg", "/assets/snehal_rathode/SR1.jpg", "/assets/snehal_rathode/SR2.jpg", "/assets/snehal_rathode/SR3.jpg", "/assets/snehal_rathode/SR4.jpg", "/assets/snehal_rathode/SR5.jpg"],
      message: "You are the most amazing friend I have. Your kindness and warmth light up my life every single day. Stay awesome always! 🤍"
    }
  },
  snehal_deshmukh: {
    password: "20-28",
    data: {
      name: "snehal",
      displayName: "Snehal",
      photos: ["/assets/snehal_deshmukh/C1.jpg", "/assets/snehal_deshmukh/SD1.jpg", "/assets/snehal_deshmukh/SD2.jpg", "/assets/snehal_deshmukh/SD3.jpg", "/assets/snehal_deshmukh/SD4.jpg", "/assets/snehal_deshmukh/SD5.jpg"],
      message: "Some bonds are chosen, not born—and ours means everything to me. You’re an unchangeable part of my life, and no matter how many new friends I make, you’ll always be my priority. 💕"
    }
  },
  diksha_arsule: {
    password: "18-28",
    data: {
      name: "diksha_arsule",
      displayName: "Diksha",
      photos: ["/assets/diksha_arsule/DA1.jpg", "/assets/diksha_arsule/DA2.jpg", "/assets/diksha_arsule/DA3.jpg", "/assets/diksha_arsule/DA4.jpg", "/assets/diksha_arsule/DA5.jpg", "/assets/diksha_arsule/DA6.jpg"],
      message: "From strangers to friends, our journey has been magical. I don’t like sharing you with anyone—yeah, I get jealous sometimes 😅 Sorry for being rude at times. It’s only because you mean so much to me. And Thanks for always tolerating me. ✨"
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
