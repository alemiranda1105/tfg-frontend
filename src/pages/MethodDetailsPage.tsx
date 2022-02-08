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
            <h1 className="text-4xl font-bold">Detalles</h1>
            {
                isPending &&
                <div>
                    <h3>Cargando...</h3>
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