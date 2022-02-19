import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useFetch } from "../hooks/useFetch";
import { MethodTableRow } from "./MethodTableRow";

export interface MethodInterface {
    id: string,
    info: string,
    link: string,
    name: string,
    user_id: string,
    results: Results
}

export interface Results {
    f1Score:        number;
    recallScore:    number;
    precisionScore: number;
}


export const MethodsTableComponent = () => {
    const { data, isPending, error } = useFetch<MethodInterface[]>("methods/all");
    const [evaluationName, setEvaluationName] = useState<string[]>();

    function reload() {
        window.location.reload();
    }

    useEffect(() => {
        data && setEvaluationName(Object.keys(data[0].results));
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
            data && !error &&
            <table className="relative -z-10 border-collapse min-w-full">
                <thead className="sticky top-0 bg-blue-100">
                    <tr>
                        <th className="py-4 px-6 text-left">Nombre</th>
                        {
                            evaluationName &&
                            evaluationName.map(name => {
                                return <th className="py-4 px-6 text-left" key={v4()}>{name}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(method => (
                            <MethodTableRow method={method} key={v4()}/>
                        ))
                    }
                </tbody>
            </table>
        }
        </>
    );
}