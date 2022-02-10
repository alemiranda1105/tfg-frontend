import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
    const [data, setData] = useState<T>();
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true
        fetch(`${process.env.REACT_APP_API_URL}/${url}`)
        .then(res => {
            if(!res.ok) {
                throw Error("No ha sido posible obtener los datos");
            } else {
                return res.json();
            }
        })
        .then(data => {
            if(mounted) {
                setData(data);
                setPending(false);
            }
        })
        .catch(error => { 
            if(mounted) {
                setError(error.message);
                setPending(false);
            }
        });
        return function cleanup() {
            mounted = false;
        }
    }, [url])

    return { data, isPending, error}
}