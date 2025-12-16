"use client";
import { REST_API } from "@/constants";
import { createContext, useEffect, useState } from "react";
import { AppLoading } from "@/components";

export const UserContext = createContext({});
export const UserTypeContext = createContext(null);
export const LoggedInContext = createContext(null);
export const AppLoadingContext = createContext(null);

export default function AppContext({ children }) {
  const [user, setUser] = useState({}),
    [userType, setUserType] = useState(),
    [appLoading, setAppLoading] = useState(true),
    [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setAppLoading(true);
    const authenticateUser = async () => {
      await fetch(REST_API + "/auth_session/76543b590e84a2512f45c9247413009d", {
        method: "get",
        headers: { "content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.user_id) {
            setUser(res);
            setUserType(res.role);
            setLoggedIn(true);
            setAppLoading(false)
          } else {
            setLoggedIn(false);
            setAppLoading(false);
          }
        })
        .catch(() => {
          setAppLoading(false);
          setLoggedIn(false);
        });
    };

    authenticateUser();
  }, []);
  
  

  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      <AppLoadingContext.Provider value={[appLoading, setAppLoading]}>
        <UserContext.Provider value={[user, setUser]}>
          <UserTypeContext.Provider value={[userType, setUserType]}>
            {appLoading ? <AppLoading /> : children}
          </UserTypeContext.Provider>
        </UserContext.Provider>
      </AppLoadingContext.Provider>
    </LoggedInContext.Provider>
  );
}
