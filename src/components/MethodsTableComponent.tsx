import {v4 } from 'uuid';
import { useFetch } from "../hooks/useFetch";
import { MethodTableRow } from "./MethodTableRow";

export interface MethodInterface {
    id: string,
    info: string,
    link: string,
    name: string,
    user_id: string,
    results: [
        {f1_score: number},
        {recall_score: number},
        {precision_score: number}
    ]
}

export const MethodsTableComponent = () => {
    const { data, isPending, error } = useFetch<MethodInterface[]>("methods/all");

    return (
        <>
        {
            isPending &&
            <div className="flex flex-col items-center">
                <h3 className="animate-pulse text-2xl font-bold">Cargando...</h3>
            </div>
        }
        {
            data &&
            <table className="border-collapse min-w-full">
                <thead className="bg-blue-100">
                    <tr>
                        <th className="py-4 px-6 text-left">Nombre</th>
                        <th className="py-4 px-6 text-left">f1_score</th>
                        <th className="py-4 px-6 text-left">recall_score</th>
                        <th className="py-4 px-6 text-left">precision_score</th>
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