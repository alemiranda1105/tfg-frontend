import { createContext } from "react";

export type AuthContextType = {
    user_id: string,
    username: string,
    token: string,
    setId: (id: string) => void,
    setUsername: (username: string) => void,
    setToken: (token: string) => void,
}

export const AuthContext = createContext<AuthContextType>({
    user_id: "",
    username: "",
    token: "",
    setId: () => {},
    setUsername: () => {},
    setToken: () => {}
});
