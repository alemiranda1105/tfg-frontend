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

export function userIsAuth(user_id: string, token: string): boolean {
    return (user_id !== "" && user_id.length >= 24 && token !== "");
}
