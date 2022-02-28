import { useParams } from "react-router-dom"
import { MethodDetailsComponent } from "../components/methods_components/MethodDetailsComponent";

export const MethodDetailsPage = () => {
    const { methodId } = useParams();

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold tracking-widest">Detalles</h1>
            <MethodDetailsComponent  methodId={methodId ?? ""} />
        </div>
    );
}