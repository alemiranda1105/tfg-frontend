import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch"
import { NewMethodInterface } from "../methods_components/NewMethodFormComponent";
import { MethodInterface } from "../table_components/MethodsTableComponent";


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