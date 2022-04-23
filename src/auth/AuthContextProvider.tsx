import { createContext } from "react";

export type AuthContextType = {
    user_id: string,
    username: string,
    token: string,
    role: string,
    setId: (id: string) => void,
    setUsername: (username: string) => void,
    setToken: (token: string) => void,
    setRole: (role: string) => void
}

export const AuthContext = createContext<AuthContextType>({
    user_id: "",
    username: "",
    token: "",
    role: "",
    setId: () => {},
    setUsername: () => {},
    setToken: () => {},
    setRole: () => {}
});
