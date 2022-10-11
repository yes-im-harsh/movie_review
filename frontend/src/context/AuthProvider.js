import { useState, createContext } from "react";
import { signInUser } from "../api/auth";

export const AuthContext = createContext();

const defaultInfo = {
  profile: null,
  isLoggedIn: false,
  isPending: false,
  error: "",
};

const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState({ ...defaultInfo });

  const handleLogin = async (email, password) => {
    setAuthInfo({ ...authInfo, isPending: true });
    const { error, user } = await signInUser({ email, password });

    if (error) {
      return setAuthInfo({ ...authInfo, isPending: false, error });
    }

    setAuthInfo({
      profile: { ...user },
      isLoggedIn: true,
      isPending: false,
      error: "",
    });

    localStorage.setItem("auth-token", user.token);
  };

  //To-Do: handleLogout, isAuth

  return (
    <AuthContext.Provider value={{ authInfo, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
