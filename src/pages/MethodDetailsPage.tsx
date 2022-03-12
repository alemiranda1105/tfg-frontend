import { useParams } from "react-router-dom"
import { MethodDetailsComponent } from "../components/methods_components/MethodDetailsComponent";

export const MethodDetailsPage = () => {
    const { methodId } = useParams();

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-extrabold text-blue-700">Detalles</h1>
            <MethodDetailsComponent  methodId={methodId ?? ""} />
        </div>
    );
}