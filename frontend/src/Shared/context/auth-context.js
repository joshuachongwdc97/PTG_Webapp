import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  email: null,
  role: null,
  token: null,
  login: () => {},
  logout: () => {},
});
