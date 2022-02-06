import { useEffect, useState } from "react";

export function useFetch(url: string) {
    const [data, setData] = useState();
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/${url}`)
        .then(res => {
            if(!res.ok) {
                throw Error("No ha sido posible obtener los datos");
            } else {
                return res.json();
            }
        })
        .then(data => {
            setData(data);
            setPending(false);
        })
        .catch(error => { 
            setError(error);
            setPending(false);
        })
    }, [url])

    return { data, isPending, error}
}