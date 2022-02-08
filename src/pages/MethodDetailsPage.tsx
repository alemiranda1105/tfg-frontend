import { useLocation } from "react-router-dom"
import { MethodDetailsComponent } from "../components/MethodDetailsComponent";
import { MethodInterface } from "../components/MethodsTableComponent";
import { useFetch } from "../hooks/useFetch";

export interface MethodDetailsProps {
    method: string
}

export const MethodDetailsPage = () => {
    const location = useLocation();
    const { method } = location.state as MethodDetailsProps;

    const { data, isPending, error } = useFetch<MethodInterface>(`methods/${method}`);


    const reload = () => {
        window.location.reload();
    }

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold tracking-widest">Detalles</h1>
            {
                isPending &&
                <div className="flex flex-col items-center">
                    <h3 className="animate-pulse text-2xl font-bold">Cargando...</h3>
                </div>
            }
            {
            error &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-2xl font-bold'>Ha ocurrido un error</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                    <button
                    className="m-3 px-3 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-300 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none"
                    onClick={reload}
                    >
                        Recargar
                    </button>
                </div>
            }
            {
                data && !isPending &&
                <MethodDetailsComponent method={data} />
            }
        </div>
    );
}