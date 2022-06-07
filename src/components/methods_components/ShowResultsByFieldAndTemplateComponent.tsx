import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { fieldDescription } from "../../interface/FieldDescription";
import { ResultsV2 } from "../../interface/MethodInterface";

interface ShowDetailsProps {
    list: { [key: string]: ResultsV2[]; };
    page: number;
}
export const ShowResultsByFieldAndTemplateComponent = ({ list, page }: ShowDetailsProps) => {
    const ELEMENTS_BY_PAGE = 10;

    const [scores, setScores] = useState<string[]>([]);
    const [results, setResults] = useState<[string, ResultsV2[]][]>([]);
    const [actualPage, setActualPage] = useState(1);

    function changePage(next: boolean) {
        var page = actualPage;
        if (next) {
            if (ELEMENTS_BY_PAGE * actualPage > Object.entries(list).length) {
                page = 1;
            } else {
                page++;
            }
        } else {
            if (actualPage < 1) {
                page = Math.round(Object.entries(list).length / ELEMENTS_BY_PAGE) - 1;
            } else {
                page--;
            }
        }
        let start = ELEMENTS_BY_PAGE * page;
        var end = ELEMENTS_BY_PAGE * (page + 1);
        if (end > Object.entries(list).length) {
            end = Object.entries(list).length;
        }
        setResults(Object.entries(list).slice(start, end));
        setActualPage(page);
    }


    useEffect(() => {
        if (results.length <= 0) {
            if(scores.length <= 0) {
                let names: string[] = []
                Object.entries(list)[0][1].forEach(entry => {
                    names.push(entry.name)
                })
                setScores(names)
            }
            setResults(Object.entries(list).slice(0, ELEMENTS_BY_PAGE));
        } else if (page !== 1) {
            setResults(Object.entries(list).slice(0, ELEMENTS_BY_PAGE));
        }
    }, [list, results.length, page, scores.length]);

    return (
        <div className="flex flex-col items-center content-center w-3/4 max-w-xl">
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
                            results.map(res => {
                                const [field, result] = res;
                                return (
                                    <tr className="border p-2.5" key={v4()}>
                                        <td className="font-semibold p-2.5 text-left" key={v4()}>
                                            Field {field}: {fieldDescription[field]}
                                        </td>
                                        {
                                            Object.values(result).map(value => {
                                                return (
                                                    <td key={v4()}>
                                                        {value.result}
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
            <div className="flex">
                <button
                    className="m-1 p-1.5 text-orange-500 font-bold hover:underline duration-300 transition"
                    onClick={() => changePage(false)}>Previous fields</button>
                <button
                    className="m-1 p-1.5 text-orange-500 font-bold hover:underline duration-300 transition"
                    onClick={() => changePage(true)}>Next fields</button>
            </div>
        </div>
    );
};
