import { createContext } from "react";

export type AuthContextType = {
    user_id: string,
    token: string,
    setId: (id: string) => void,
    setToken: (token: string) => void,
}

export const AuthContext = createContext<AuthContextType>({
    user_id: "",
    token: "",
    setId: () => {},
    setToken: () => {}
});
