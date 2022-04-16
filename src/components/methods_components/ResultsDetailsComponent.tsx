import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { MethodInterface } from "../../interface/MethodInterface";
import { LoadingComponent } from "../custom_components/LoadingComponent";
import { MethodDetailsComponent } from "./MethodDetailsComponent";
import { ResultsByFieldComponent } from "./ResultsByFieldComponent";
import { ResultsByFieldTemplateComponent } from "./ResultsByFieldTemplateComponent";
import { ResultsPaginationComponent } from "./ResultsPagination";


interface ResultsDetailsProps {
    methodId: string
    details: "FIELD" | "TEMPLATE" | "FIELD_TEMPLATE"
}

export const ResultDetailsComponent = ({methodId, details}: ResultsDetailsProps) => {
    const { data: method, isPending, error } = useFetch<MethodInterface, undefined>(`methods/${methodId}`);

    const [actualPage, setActualPage] = useState(1);
    const [showDetails, setShowDetails] = useState(false);

    function changePage(next: boolean) {
        if(method) {
            if(next) {
                if(actualPage + 1 > Object.keys(method.results_by_category).length) {
                    setActualPage(1);
                } else {
                    setActualPage(actualPage + 1);
                }
            } else {
                if(actualPage <= 1) {
                    setActualPage(Object.keys(method.results_by_category).length);
                } else {
                    setActualPage(actualPage - 1);
                }
            }
        }
    }

    return(
        <>
        {
            isPending &&
            <LoadingComponent />
        }
        {
            error && !isPending &&
            <div className='flex flex-col items-center text-center'>
                <h3 className='text-lg'>Something went wrong</h3>
                <p className='text-sm font-light'>Error: {error}</p>
            </div>
        }
        {
            method && !isPending &&
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col items-center m-2 w-full">
                    {
                        (details === "TEMPLATE") &&
                        <>
                            <ResultsPaginationComponent page={actualPage} method={method} />
                            <div>
                                <button
                                className="m-1 p-1.5 text-blue-500 font-bold hover:underline duration-300 transition"
                                onClick={() => changePage(false)}>Back</button>
                                <button
                                className="m-1 p-1.5 text-blue-500 font-bold hover:underline duration-300 transition"
                                onClick={() => changePage(true)}>Next</button>
                            </div>
                        </>
                    }
                    {
                        (details === "FIELD") &&
                        <ResultsByFieldComponent method={method} />
                    }
                    {
                        (details === "FIELD_TEMPLATE") &&
                        <ResultsByFieldTemplateComponent method={method} />
                    }
                </div>
                <button 
                className="p-2.5 m-2 bg-blue-500 rounded text-white font-bold hover:rounded-none hover:bg-blue-300 duration-300"
                onClick={() => setShowDetails(!showDetails)}>
                    {showDetails? "Hide details": "Show details"}
                </button>
                {
                    showDetails &&
                    <MethodDetailsComponent methodId={methodId} />
                }
            </div>
        }
        </>
    )
}