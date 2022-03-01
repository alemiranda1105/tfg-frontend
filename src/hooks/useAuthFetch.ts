import axios, { AxiosRequestConfig, Method } from "axios";
import { useEffect, useState } from "react";


export function useAuthFetch<T>(url: string, token: string, method: Method = "get", body?: T) {
    const [data, setData] = useState<T>();
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        
        if(!token) {
            setError("Token no válido");
            return;
        }

        let requestConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: method,
            url: `${process.env.REACT_APP_API_URL}/${url}`,
            data: body
        }

        axios(requestConfig)
        .then(res => res.data)
        .then(data => {
            if(mounted) {
                setData(data);
                setError("");
                setPending(false);
            }
        })
        .catch(error => {
            if(mounted) {
                if(axios.isAxiosError(error)) {
                    setPending(false);
                    setError(error.response?.data.detail);
                } else {
                    setPending(false);
                    setError('Algo ha ido mal, inténtelo de nuevo más tarde');
                }
            }
        })

        return function cleanup() {
            mounted = false;
        };
    }, [body, method, token, url]);

    return {data, isPending, error}
}