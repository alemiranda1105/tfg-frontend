import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { fieldDescription } from "../../interface/FieldDescription";
import { MethodInterface, ResultByField } from "../../interface/MethodInterface";

interface ResultsByFieldProps {
    method: MethodInterface;
}

export const ResultsByFieldComponent = ({ method }: ResultsByFieldProps) => {
    const ELEMENTS_BY_PAGE = 10;

    const [scores, setScores] = useState<string[]>([]);
    const [results, setResults] = useState<ResultByField[]>([]);
    const [actualPage, setActualPage] = useState(1);

    useEffect(() => {
        if (results.length <= 0) {
            setScores(Object.keys(method.results_by_category['1']))
            setResults(method.results_by_field.slice(0, ELEMENTS_BY_PAGE));
        }
    }, [method, results]);

    function changePage(next: boolean) {
        if (method) {
            var page = actualPage;
            if (next) {
                if (ELEMENTS_BY_PAGE * actualPage > method.results_by_field.length) {
                    page = 1;
                } else {
                    page++;
                }
            } else {
                if (actualPage < 1) {
                    page = Math.round(method.results_by_field.length / ELEMENTS_BY_PAGE) - 1;
                } else {
                    page--;
                }
            }
            let start = ELEMENTS_BY_PAGE * page;
            var end = ELEMENTS_BY_PAGE * (page + 1);
            if (end > method.results_by_field.length) {
                end = method.results_by_field.length;
            }
            setResults(method.results_by_field.slice(start, end));
            setActualPage(page);
        }
    }

    return (
        <div className="flex flex-col items-center content-center w-full max-w-xl">
            <div className="inline-block overflow-y-auto w-full border shadow bg-white">
                <table className="text-center border w-full">
                    <thead className="bg-gray-400">
                        <tr>
                            <th className="py-4 px-6 text-left font-bold" key={v4()}>
                                Field
                            </th>
                            {
                                scores &&
                                scores.map(name => {
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
                            results &&
                            results.map(result => {
                                return (
                                    <tr className="border p-2.5" key={v4()}>
                                        <td className="font-semibold p-2.5" key={v4()}>
                                            Field {result.name}: {fieldDescription[result.name]}
                                        </td>
                                        {
                                            Object.entries(result.results).map(res => {
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
            <div>
                <button
                    className="m-1 p-1.5 text-blue-500 font-bold hover:underline duration-300 transition"
                    onClick={() => changePage(false)}>Back</button>
                <button
                    className="m-1 p-1.5 text-blue-500 font-bold hover:underline duration-300 transition"
                    onClick={() => changePage(true)}>Next</button>
            </div>
        </div>
    );
};
