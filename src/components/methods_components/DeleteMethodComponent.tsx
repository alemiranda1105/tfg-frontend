import { Method } from "axios";
import { useEffect } from "react";
import { useAuthFetch } from "../../hooks/useAuthFetch";

interface DeleteMethodProps {
    url: string;
    token: string;
    action: Method;
    setShow: (show: boolean) => void;
}
export function DeleteMethodComponent({ url, token, action, setShow }: DeleteMethodProps) {
    const { data, isPending, error } = useAuthFetch(url, token, action);

    useEffect(() => {
        if (error === "" && data && !isPending) {
            setShow(false);
        }
    }, [data, error, isPending, setShow]);

    return (
        <>
            {isPending &&
                <div className="flex flex-col items-center">
                    <h3 className="animate-pulse text-2xl font-bold">Cargando...</h3>
                </div>}
            {!isPending && error &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-2xl font-bold'>Ha ocurrido un error</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>}
        </>
    );
}
