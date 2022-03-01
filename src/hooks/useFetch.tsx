import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T>(url: string, token?: string, needAuth?: boolean) {
    const [data, setData] = useState<T>();
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        let config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        setPending(true);

        // Check if the call needs auth to avoid 403 response
        if(needAuth && !token) return;

        axios.get(`${process.env.REACT_APP_API_URL}/${url}`, config)
        .then(res => res.data)
        .then(data => {
            if(mounted) {
                setData(data);
                setPending(false);
                setError("");
            }
        })
        .catch(error => {
            if(axios.isAxiosError(error)) {
                setPending(false);
                setError(error.message);
            } else {
                setPending(false);
                setError('Algo ha ido mal, inténtelo de nuevo más tarde');
            }
        });

        return function cleanup() {
            mounted = false;
        }
    }, [url, token, needAuth])

    return { data, isPending, error }
}
