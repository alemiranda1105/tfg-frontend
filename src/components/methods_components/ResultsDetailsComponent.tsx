import { useEffect } from "react";
import { v4 } from "uuid";
import { useFetch } from "../../hooks/useFetch";
import { MethodInterface } from "../../interface/MethodInterface";
import { ResultTableRow } from "./MethodDetailsComponent";


interface ResultsDetailsProps {
    methodId: string
    byField: boolean
}

export const ResultDetailsComponent = ({methodId, byField}: ResultsDetailsProps) => {
    const { data: method, isPending, error } = useFetch<MethodInterface, undefined>(`methods/${methodId}`);

    useEffect(() => {
        if(method) {
            Object.entries(method.results_by_category).forEach(entry => {
                const [template, results] = entry;
                console.log("template " + template);
                Object.entries(results).forEach(result => {
                    console.log(result);
                })
            })
        }
    }, [method])

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
            <div className="flex flex-col items-center">
            
                <div className="flex flex-col items-center m-2 w-full">
                    <h3 className="text-xl font-bold">Name</h3>
                    <h4 className="text-lg">{method.name}</h4>
                </div>

                <div className="flex flex-col items-center m-2 w-full">
                    <h3 className="text-xl font-bold">Link</h3>
                    <a className="text-lg hover:text-blue-500 duration-300" 
                    href={method.link}
                    rel="noopener"
                    aria-label="Link to method publication"
                    >
                        {method.link}
                    </a>
                </div>
                
                {method.source_code &&
                    <div className="flex flex-col items-center m-2 w-full">
                        <h3 className="text-xl font-bold">Source code</h3>
                        <a className="text-lg hover:text-blue-500 duration-300" 
                        href={method.source_code}
                        rel="noopener"
                        aria-label="Link to method source code"
                        >
                            {method.source_code}
                        </a>
                    </div>
                }

                <div className="flex flex-col items-center m-2 w-full">
                    <table className="text-center border">
                        <tbody>
                            {
                                Object.entries(method.results_by_category).map(entry => {
                                    return (
                                        <>
                                            <h3>Template {entry[0]}</h3>
                                            {
                                                Object.entries(method.results).map(result => {
                                                    return (
                                                        <ResultTableRow key={v4()} name={result[0]} result={result[1]}/>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        }
        </>
    )
}