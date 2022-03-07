import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useFetch } from "../../hooks/useFetch";
import { MethodTableRow } from "./MethodTableRow";

export interface MethodInterface {
    id: string,
    info: string,
    link: string,
    name: string,
    user_id: string,
    private: boolean
    results: Results
}

export interface Results {
    f1_score:        number;
    recall_score:    number;
    precision_score: number;
}


export const MethodsTableComponent = () => {
    const { data, isPending, error } = useFetch<MethodInterface[], undefined>("methods/all");

    const [methods, setMethods] = useState<MethodInterface[]>();
    const [evaluationName, setEvaluationName] = useState<string[]>();

    const [sorting, setSorting] = useState({
        name: false,
        f1_score: false,
        recall_score: false,
        precision_score: false
    });

    function reload() {
        window.location.reload();
    }

    function sortByResult(result: "f1_score" | "recall_score" | "precision_score") {
        if(methods) {
            if(sorting[result]) {
                const newList = methods.sort((a, b) => {
                    var valueA = a.results[result];
                    var valueB = b.results[result];
                    if(valueA > valueB) return 1;
                    if(valueA < valueB) return -1;
                    return 0;
                });
                setMethods(newList);
                setSorting(prevState => ({
                    ...prevState,
                    [result]: false
                }))
            } else {
                const newList = methods.sort((a, b) => {
                    var valueA = a.results[result];
                    var valueB = b.results[result];
                    if(valueA > valueB) return -1;
                    if(valueA < valueB) return 1;
                    return 0;
                });
                setMethods(newList);
                setSorting(prevState => ({
                    ...prevState,
                    [result]: true
                }));
            }
            console.log(sorting);
        }
    }

    function sortByName() {
        if(methods) {
            if(sorting.name) {
                const newList = methods.sort((a, b) => {
                    var valueA = a.name;
                    var valueB = b.name;
                    if(valueA > valueB) return 1;
                    if(valueA < valueB) return -1;
                    return 0;
                });
                setMethods(newList);
                setSorting(prevState => ({
                    ...prevState,
                    name: !prevState.name
                }))
            } else {
                const newList = methods.sort((a, b) => {
                    var valueA = a.name;
                    var valueB = b.name;
                    if(valueA > valueB) return -1;
                    if(valueA < valueB) return 1;
                    return 0;
                });
                setMethods(newList);
                setSorting(prevState => ({
                    ...prevState,
                    name: !prevState.name
                }));
            }
        }      
    }

    useEffect(() => {
        data && setEvaluationName(Object.keys(data[0].results));
        data && setMethods(data);
    }, [data]);

    return (
        <>
        {
            isPending &&
            <div className="flex flex-col items-center">
                <h3 className="animate-pulse text-2xl font-bold">Cargando...</h3>
            </div>
        }
        {
            error &&
            <div className='flex flex-col items-center text-center'>
                <h3 className='text-2xl font-bold'>Ha ocurrido un error</h3>
                <p className='text-sm font-light'>Error: {error}</p>
                <button
                className="m-3 px-3 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-300 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none"
                onClick={reload}>
                    Recargar
                </button>
            </div>
        }
        {
            methods && !error &&
            <table className="border-collapse min-w-full">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="py-4 px-6 text-left hover:cursor-pointer" onClick={() => sortByName()}>Nombre</th>
                        {
                            evaluationName &&
                            evaluationName.map(name => {
                                return <th className="py-4 px-6 text-left hover:cursor-pointer" key={v4()} onClick={() => sortByResult(name as "f1_score" | "recall_score" | "precision_score")}>{name}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        methods.map(method => (
                            <MethodTableRow method={method} key={v4()}/>
                        ))
                    }
                </tbody>
            </table>
        }
        </>
    );
}