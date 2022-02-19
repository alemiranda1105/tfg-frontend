import { useState } from "react";


export function useCookie<T>(name: string, expiration?: string, data?: T) {
    const [cookieData, setCookieData] = useState<T>();
    
}