import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useFetch } from "../../hooks/useFetch";
import { MethodInterface, ResultByCategory, Results } from "../../interface/MethodInterface";
import { MethodDetailsComponent, ResultTableRow } from "./MethodDetailsComponent";
import { ResultsPaginationComponent } from "./ResultsPagination";


interface ResultsDetailsProps {
    methodId: string
    byField: boolean
}

interface ResultsByFieldProps {
    method: MethodInterface;
}

const ResultsByFieldComponent = ({method}: ResultsByFieldProps) => {

    return (
        <div className="flex flex-col items-center w-3/4 max-w-xl">
            {
                Object.entries(method.results_by_field).map(entry => {
                    const [field, result] = entry;
                    return (
                        <div className="w-full m-2 flex flex-col items-center">
                            <h3 className="font-bold">Field {field}</h3>
                            <table className="text-center border w-full mx-2">    
                                <tbody>
                                    {
                                        Object.entries(result).map(res => {
                                            return (
                                                <ResultTableRow name={res[0]} result={res[1]} key={v4()} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
        </div>
    )
}

export const ResultDetailsComponent = ({methodId, byField}: ResultsDetailsProps) => {
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
            <h3 className="animate-pulse text-lg font-bold">Loading...</h3>
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
                    !byField &&
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
                        byField &&
                        <ResultsByFieldComponent method={method} />
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