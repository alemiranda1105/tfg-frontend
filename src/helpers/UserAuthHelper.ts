import { getCookie } from "react-use-cookie";

export function userIsAuth(user_id: string, token: string): boolean {
    const cookie_userId = getCookie('user_id');
    const cookie_token = getCookie('token');
    const user_check: boolean = (user_id === cookie_userId && user_id !== "");
    const token_check: boolean = (token === cookie_token && token !== "");
    return user_check && token_check;
}