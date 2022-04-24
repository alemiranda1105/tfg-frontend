import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useFetch } from "../../hooks/useFetch";
import { MethodInterface } from '../../interface/MethodInterface';
import { LoadingComponent } from '../custom_components/LoadingComponent';
import { MethodTableRow } from "./MethodTableRow";

export const MethodsTableComponent = () => {
    const { data, isPending, error } = useFetch<MethodInterface[], undefined>("methods/all");

    const [methods, setMethods] = useState<MethodInterface[]>();
    const [evaluationName, setEvaluationName] = useState<string[]>();

    const [sorting, setSorting] = useState({
        name: false,
        sorting: ''
    });

    function reload() {
        window.location.reload();
    }

    function sortByResult(result: string) {
        if(methods) {
            if(sorting.sorting === result) {
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
                    sorting: ''
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
                    sorting: result
                }));
            }
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
        if(data) {
            setEvaluationName(Object.keys(data[0].results));
            setMethods(data);
        }
    }, [data]);

    return (
        <>
        {
            isPending &&
            <LoadingComponent />
        }
        {
            error &&
            <div className='flex flex-col items-center text-center'>
                <h3 className='text-2xl font-bold'>Something went wrong</h3>
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
                <thead className="bg-gray-400">
                    <tr>
                        <th className="py-4 px-6 text-left font-bold" key={v4()}>
                            <button className='font-bold' onClick={() => sortByName()}>
                                Name
                            </button>
                        </th>
                        {
                            evaluationName &&
                            evaluationName.map(name => {
                                return (
                                    <th className="py-4 px-6 text-left font-bold" key={v4()}>
                                        <button className='font-bold' onClick={() => sortByResult(name)}>
                                            {name}
                                        </button>
                                    </th>
                                )
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