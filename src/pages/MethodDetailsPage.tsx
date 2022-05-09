import { useParams } from "react-router-dom"
import { MethodDetailsComponent } from "../components/methods_components/MethodDetailsComponent";

export const MethodDetailsPage = () => {
    const { methodId } = useParams();

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="section-title">Details</h1>
            { methodId && <MethodDetailsComponent methodId={methodId} /> }
        </div>
    );
}