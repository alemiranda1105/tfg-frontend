import { useParams } from "react-router-dom";
import { ResultDetailsComponent } from "../components/methods_components/ResultsDetailsComponent";


export function ResultsByTemplatePage() {
    const { methodId } = useParams();

    return (
        <div className="flex flex-col items-center w-3/4 p-4 rounded-md border bg-white">
            <h2 className="text-xl font-extrabold text-blue-700">Results by template</h2>
            {
                methodId &&
                <ResultDetailsComponent methodId={methodId} byField={false}/>
            }
        </div>
    )
}