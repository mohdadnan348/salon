import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load admin from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAdmin({ token });
    }

    setLoading(false);
  }, []);

  // Login
  const login = (token) => {
    localStorage.setItem("token", token);
    setAdmin({ token });
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setAdmin(null);
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
