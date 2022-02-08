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
                error && !isPending &&
                <div>
                    <h3>Ha ocurrido un error</h3>
                    <h4>{error}</h4>
                </div>
            }
            {
                data && !isPending &&
                <MethodDetailsComponent method={data} />
            }
        </div>
    );
}