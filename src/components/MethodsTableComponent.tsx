import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export const MethodsTableComponent = () => {
    const { data, isPending, error } = useFetch("methods/all");
    
    useEffect(() => {
        console.log(data, isPending, error);
    });

    return (
        <div className="overflow-x-auto w-[80%] sm:-mx-6 lg:-mx-8">
            <div className="inline-block py-2 min-w-full">
                <div className="overflow-hidden shadow-none md:drop-shadow-md sm:rounded-md">            
                    <table className="border-collapse min-w-full">
                        <thead className="bg-blue-100">
                            <tr>
                                <th className="py-4 px-6 text-left">Nombre</th>
                                <th className="py-4 px-6 text-left">M1</th>
                                <th className="py-4 px-6 text-left">M2</th>
                                <th className="py-4 px-6 text-left">M3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-4 px-6 font-semibold whitespace-nowrap">Metodo 1</td>
                                <td className="py-4 px-6 font-semibold whitespace-nowrap">0.1215</td>
                                <td className="py-4 px-6 font-semibold whitespace-nowrap">0.6778</td>
                                <td className="py-4 px-6 font-semibold whitespace-nowrap">0.7627</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-4 px-6 font-semibold whitespace-nowrap">Metodo 2</td>
                                <td className="py-4 px-6 font-semibold whitespace-nowrap">0.5241</td>
                                <td className="py-4 px-6 font-semibold whitespace-nowrap">0.9663</td>
                                <td className="py-4 px-6 font-semibold whitespace-nowrap">0.4775</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}