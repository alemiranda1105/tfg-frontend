import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T>();
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;

        axios.get(`${process.env.REACT_APP_API_URL}/${url}`)
        .then(res => res.data)
        .then(data => {
            if(mounted) {
                console.log(data);
                setData(data);
                setPending(false);
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
    }, [url])

    return { data, isPending, error }
}
