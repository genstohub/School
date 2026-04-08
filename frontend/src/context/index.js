"use client";
import { REST_API } from "@/constants";
import { createContext, useEffect, useState, useMemo } from "react";
import { AppLoading } from "@/components";
import { socket } from "@/lib/socket";

// Exporting all contexts
export const SocketContext = createContext(null);
export const UserContext = createContext([{}, () => {}]);
export const UserTypeContext = createContext([null, () => {}]);
export const LoggedInContext = createContext([false, () => {}]);
export const AppLoadingContext = createContext([true, () => {}]);

export default function AppContext({ children }) {
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState();
  const [appLoading, setAppLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await fetch(`${REST_API}/auth_session/76543b590e84a2512f45c9247413009d`, {
          method: "get",
          headers: { "content-Type": "application/json" },
          credentials: "include",
        });
        const res = await response.json();

        if (res?.user_id) {
          setUser(res);
          setUserType(res.role);
          setLoggedIn(true);
          
          // Only connect if not already connected
          if (!socket.connected) socket.connect();
        }
      } catch (error) {
        console.error("Auth failed:", error);
      } finally {
        setAppLoading(false);
      }
    };

    authenticateUser();

    // Socket status listeners
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      // We don't necessarily disconnect here to keep the socket alive 
      // during route changes, unless the whole AppContext unmounts.
    };
  }, []);

  // Sync user with Socket server once both are ready
  useEffect(() => {
    if (isConnected && user?.user_id) {
      socket.emit("AddUserToActive", { 
          userId: user.user_id, 
          role: user.role // or userType
      });
    }
  }, [isConnected, user]);

  // useMemo prevents the entire app from re-rendering on every socket heartbeat
  const socketValue = useMemo(() => ({ socket, isConnected }), [isConnected]);

  return (
    <SocketContext.Provider value={socketValue}>
      <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
        <AppLoadingContext.Provider value={[appLoading, setAppLoading]}>
          <UserContext.Provider value={[user, setUser]}>
            <UserTypeContext.Provider value={[userType, setUserType]}>
              {appLoading ? <AppLoading /> : children}
            </UserTypeContext.Provider>
          </UserContext.Provider>
        </AppLoadingContext.Provider>
      </LoggedInContext.Provider>
    </SocketContext.Provider>
  );
}