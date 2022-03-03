import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "react-use-cookie";

export function useFetch<T, R>(url: string, method: string = "get", body?: R) {
    const [data, setData] = useState<T>();
    const [isPending, setPending] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        setPending(true);
        setError("");
        

        let config = {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            }
        }

        // Select the method for the fetch
        // Default == GET
        const selectMethod = async () => {
            if(method === "post") {
                return axios.post(`${process.env.REACT_APP_API_URL}/${url}`, body, config);
            } else if(method === "delete") {
                return axios.delete(`${process.env.REACT_APP_API_URL}/${url}`, config);
            } else if(method === "put") {
                return axios.put(`${process.env.REACT_APP_API_URL}/${url}`, body, config);
            } else {
                return axios.get(`${process.env.REACT_APP_API_URL}/${url}`, config);
            }
        }
        
        
        selectMethod()
        .then(res => res.data)
        .then(data => {
            if(mounted) {
                setData(data);
                setError("");
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
    }, [url, body, method])

    return { data, isPending, error }
}
