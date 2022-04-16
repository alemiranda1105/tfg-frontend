import { Method } from "axios";
import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { LoadingComponent } from "../custom_components/LoadingComponent";

interface DeleteMethodProps {
    url: string;
    token: string;
    action: Method;
    setShow: (show: boolean) => void;
}
export function DeleteMethodComponent({ url, action, setShow }: DeleteMethodProps) {
    const { data, isPending, error } = useFetch(url, action);

    useEffect(() => {
        if (error === "" && data && !isPending) {
            setShow(false);
        }
    }, [data, error, isPending, setShow]);

    return (
        <>
            {isPending &&
                <LoadingComponent />
            }
            {!isPending && error &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-2xl font-bold'>Something went wrong</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>}
        </>
    );
}
