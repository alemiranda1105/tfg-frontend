import { useState, useEffect } from "react";
import { v4 } from "uuid";
import { MethodInterface } from "../../interface/MethodInterface";


interface TableProps {
    method: MethodInterface;
}

export const ResultsByTemplateTable = ({ method }: TableProps) => {
    const [score, setScore] = useState<string[]>([]);

    useEffect(() => {
        if(method) {
            setScore(Object.keys(method.results_by_category['1']));            
        }
    }, [method]);

    return (
        <div className="inline-block overflow-y-auto w-full md:w-[80%] border shadow bg-white">
            <table className="text-center border w-full">
                <thead className="bg-gray-400">
                    <tr>
                        <th className="py-4 px-6 text-left font-bold" key={v4()}>
                            Template
                        </th>
                        {
                            score &&
                            score.map(name => {
                                return (
                                    <th className="py-4 px-6 text-left font-bold" key={v4()}>
                                        <h6 className='font-bold'>
                                            {name}
                                        </h6>
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        method.results_by_category &&
                        Object.entries(method.results_by_category).map(entry => {
                            const [template, results] = entry;
                            return(
                                <tr className="border p-2.5" key={v4()}>
                                    <td className="text-left p-2.5 font-semibold">
                                        Template {template}
                                    </td>
                                    {
                                        Object.entries(results).map(res => {
                                            return (
                                                <td key={v4()}>
                                                    {res[1]}
                                                </td>
                                            )    
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}