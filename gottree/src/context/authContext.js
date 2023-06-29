import React, { useEffect, useState } from "react";
import { performJWTLogin } from "../utils/authUtils";

export const AuthContext = React.createContext({
  isUserLoggedIn: false,
  loggedInUser: "guest",
  userAuth: [],
  logout: () => {},
  login: () => {},
});

const AuthContextProvider = (props) => {
  const [isUserLoggedIn, setUserLoggedInState] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("guest");
  const [userAuth, setUserAuth] = useState([]);
  console.log("re-rendering");
  useEffect(() => {
    (async function performLogin() {
      if (localStorage.getItem("authToken")) {
        const userInfo = await performJWTLogin();
        if (!userInfo) {
          setUserLoggedInState(false);
          return;
        }
        login(userInfo.headers, userInfo.userName, userInfo.authorities);
      } else {
        setUserLoggedInState(false);
      }
    })();
  }, []);
  const logout = () => {
    setUserLoggedInState(false);
    localStorage.removeItem("authToken");
  };
  const login = (authToken, loggedInUser, authorities) => {
    setUserLoggedInState(true);
    setUserAuth(authorities);
    setLoggedInUser(loggedInUser);
    localStorage.setItem("authToken", authToken);
  };
  return (
    <AuthContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,
        loggedInUser: loggedInUser,
        logout: logout,
        login: login,
        userAuth: userAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
