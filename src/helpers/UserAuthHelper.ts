
export function userIsAuth(user_id: string, token: string): boolean {
    return (user_id !== "" && user_id.length >= 24 && token !== "");
}