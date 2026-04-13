import React, { createContext, useContext, useState, useEffect } from "react";

// Fixed users with their data
const USERS = {
  siddhi: {
    password: "23-28",
    data: {
      name: "siddhi",
      displayName: "Siddhi",
      photos: [
        "/siddhi/SD1.JPG",
        "/siddhi/SD2.jpg",
        "/siddhi/SD3.jpg",
        "/siddhi/SD4.jpg",
        "/siddhi/SD5.jpg",
        "/siddhi/SD6.jpg",
      ],
      message:
        "I know you’re giving your 100%, and I’m really proud of you. No matter where life takes us, I’ll always be here for you. And remember, I’m the elder one, so respect me 😌❤️",
    },
  },
  monika: {
    password: "18-28",
    data: {
      name: "monika",
      displayName: "Monika",
      photos: [
        "/monika/MP1.jpg",
        "/monika/MP2.jpg",
        "/monika/MP3.jpg",
        "/monika/MP4.jpg",
        "/monika/MP5.jpg",
        "/monika/MP6.webp",
      ],
      message:
        "Monaa, you’re not just my best friend, you’re my forever family. All our memories and madness mean the world to me. Thank you for being with me! 💕",
    },
  },
  diksha_pawar: {
    password: "19-28",
    data: {
      name: "diksha",
      displayName: "Diksha",
      photos: [
        "/diksha_pawar/DP0.jpg",
        "/diksha_pawar/DP1.jpg",
        "/diksha_pawar/DP2.jpg",
        "/diksha_pawar/DP3.jpg",
        "/diksha_pawar/DP4.jpg",
        "/diksha_pawar/DP5.jpg",
      ],
      message:
        "काळे, you're not just a friend, you're family! All our crazy adventures and fight mean the world to me. Stay awesome always! 🤍",
    },
  },
  pragati: {
    password: "28-28",
    data: {
      name: "pragati",
      displayName: "Pragati",
      photos: [
        "/pragati/C1.jpg",
        "/pragati/IMG_20240428_001523.jpg",
        "/pragati/IMG_20250531_200442.jpg",
        "/pragati/Snapchat-1799263343.jpg",
        "/pragati/Snapchat-403486351.jpg",
        "/pragati/WhatsApp Image 2025-12-23 at 12.55.23_96eab3bd.jpg",
      ],
      message:
        "I know you’re tired, but whenever your heart feels heavy, just call me anytime— I’ll always be there for you. You’re an irreplaceable part of my life and my all-time preferred ChatGPT😅 Thank you for being with me! 💕",
    },
  },
  snehal_rathod: {
    password: "01-28",
    data: {
      name: "snehal_rathod",
      displayName: "Snehal",
      photos: [
        "/snehal_rathode/C1.jpg",
        "/snehal_rathode/SR1.jpg",
        "/snehal_rathode/SR2.jpg",
        "/snehal_rathode/SR3.jpg",
        "/snehal_rathode/SR4.jpg",
        "/snehal_rathode/SR5.jpg",
      ],
      message:
        "You are the most amazing friend I have. Your kindness and warmth light up my life every single day. Stay awesome always! 🤍",
    },
  },
  snehal_deshmukh: {
    password: "20-28",
    data: {
      name: "snehal",
      displayName: "Snehal",
      photos: [
        "/snehal_deshmukh/C1.jpg",
        "/snehal_deshmukh/SD1.jpg",
        "/snehal_deshmukh/SD2.jpg",
        "/snehal_deshmukh/SD3.jpg",
        "/snehal_deshmukh/SD4.jpg",
        "/snehal_deshmukh/SD5.jpg",
      ],
      message:
        "Some bonds are chosen, not born—and ours means everything to me. You’re an unchangeable part of my life, and no matter how many new friends I make, you’ll always be my priority. 💕",
    },
  },
  diksha_arsule: {
    password: "18-28",
    data: {
      name: "diksha_arsule",
      displayName: "Diksha",
      photos: [
        "/diksha_arsule/DA1.jpg",
        "/diksha_arsule/DA2.jpg",
        "/diksha_arsule/DA3.jpg",
        "/diksha_arsule/DA4.jpg",
        "/diksha_arsule/DA5.jpg",
        "/diksha_arsule/DA6.jpg",
      ],
      message:
        "From strangers to friends, our journey has been magical. I don’t like sharing you with anyone—yeah, I get jealous sometimes 😅 Sorry for being rude at times. It’s only because you mean so much to me. And Thanks for always tolerating me. ✨",
    },
  },
  demo_user: {
    password: "1234",
    data: {
      name: "demo_user",
      displayName: "Demo User",
      photos: [
        "/demo_user/Du1.jpeg",
        "/demo_user/Du5.jpeg",
        "/demo_user/Du6.jpeg",
        "/demo_user/Du4.jpeg",
        "/demo_user/Du2.jpeg",
        "/demo_user/Du3.jpeg",
      ],
      message:
        "Welcome! Explore and enjoy the demo ✨. Have fun discovering features—and reach out to add your favorite One 💕",
    },
  },
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to restore auth state:", error);
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const login = (name, password) => {
    const userName = name.toLowerCase().trim();
    const user = USERS[userName];

    if (user && user.password === password) {
      setIsLoggedIn(true);
      setCurrentUser(user.data);
      localStorage.setItem("currentUser", JSON.stringify(user.data));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
