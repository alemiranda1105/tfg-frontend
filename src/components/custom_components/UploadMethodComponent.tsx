import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch"
import { NewMethodInterface } from "../../interface/NewMethodInterface";
import { MethodInterface } from "../../interface/MethodInterface";


interface UploadComponentProps {
    url: string,
    method: string,
    uploadData: MethodInterface | NewMethodInterface | FormData,
    setData: (data: MethodInterface) => void,
    setUploading: (state: boolean) => void,
    setError: (error: string) => void
}

export function UploadMethodComponent({url, method, uploadData, setUploading, setError, setData}: UploadComponentProps) {
    const { data, isPending, error } = useFetch<MethodInterface, MethodInterface | NewMethodInterface | FormData>(url, method, uploadData);

    useEffect(() => {
        if(data) {
            setData(data);
        }
        setError(error);
        setUploading(isPending);
    }, [data, error, isPending, setData, setError, setUploading])

    return (
        <>
            <h3 className="animate-pulse text-lg font-bold">Cargando...</h3>
        </>
    )
}