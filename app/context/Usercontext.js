"use client";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    const storedUser=localStorage.getItem("user");
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  },[]);
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user",JSON.stringify(userData));
  };
  const logout = () =>{
     setUser(null);
     localStorage.removeItem("user");
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
