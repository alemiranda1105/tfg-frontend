import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch"


interface UploadComponentProps<T> {
    url: string,
    method: string,
    uploadData: T,
    setData: (data: T) => void,
    setUploading: (state: boolean) => void,
    setError: (error: string) => void
}

export function UploadComponent<T>({url, method, uploadData, setUploading, setError, setData}: UploadComponentProps<T>) {
    const { data, isPending, error } = useFetch<typeof uploadData>(url, method,uploadData);

    useEffect(() => {
        data && setData(data);
        setUploading(isPending);
        setError(error);
    }, [data, error, isPending, setData, setError, setUploading])

    return (
        <>
            <h3 className="animate-pulse text-lg font-bold">Cargando...</h3>
        </>
    )
}