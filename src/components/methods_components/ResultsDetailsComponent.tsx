import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { useFetch } from "../../hooks/useFetch";
import { MethodInterface, ResultByField } from "../../interface/MethodInterface";
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
    const ELEMENTS_BY_PAGE = 5;

    const [results, setResults] = useState<ResultByField[]>([]);
    const [actualPage, setActualPage] = useState(1);

    useEffect(() => {
        if(results.length <= 0) {
            setResults(method.results_by_field.slice(0, ELEMENTS_BY_PAGE));
        }      
    }, [method, results]);

    function changePage(next: boolean) {
        if(method) {
            if(next) {
                if(ELEMENTS_BY_PAGE * actualPage > method.results_by_field.length) {
                    setActualPage(1);
                } else {
                    setActualPage(actualPage + 1);
                }
            } else {
                if(actualPage <= 1) {
                    setActualPage(method.results_by_field.length);
                } else {
                    setActualPage(actualPage - 1);
                }
            }
            let start = ELEMENTS_BY_PAGE * actualPage;
            var end = ELEMENTS_BY_PAGE * (actualPage + 1);
            if(end > method.results_by_field.length) {
                end = method.results_by_field.length;
            }
            setResults(method.results_by_field.slice(start, end));
        }
    }

    return (
        <div className="flex flex-col items-center w-3/4 max-w-xl">
            {
                results.map(res => {
                    return (
                        <div key={v4()}>
                            <h4>Field {res.name}</h4>
                            <table className="text-center border w-full">
                                <tbody>
                                    {res.results &&
                                        Object.entries(res.results).map(res => {
                                            return (
                                                <ResultTableRow name={res[0]} result={res[1]} key={v4()} />
                                            );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )
                })
            }
            <div>
                <button
                    className="m-1 p-1.5 text-blue-500 font-bold hover:underline duration-300 transition"
                    onClick={() => changePage(false)}>Back</button>
                <button
                    className="m-1 p-1.5 text-blue-500 font-bold hover:underline duration-300 transition"
                    onClick={() => changePage(true)}>Next</button>
            </div>
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