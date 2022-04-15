import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { ResultsV2 } from "../../interface/MethodInterface";
import { ResultTableRow } from "./MethodDetailsComponent";

interface ShowDetailsProps {
    list: { [key: string]: ResultsV2[]; };
    page: number;
}
export const ShowResultsByFieldAndTemplateComponent = ({ list, page }: ShowDetailsProps) => {
    const ELEMENTS_BY_PAGE = 10;

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
            setResults(Object.entries(list).slice(0, ELEMENTS_BY_PAGE));
        } else if (page != 1) {
            setResults(Object.entries(list).slice(0, ELEMENTS_BY_PAGE));
        }
    }, [list, results.length]);

    return (
        <div className="flex flex-col items-center content-center w-3/4 max-w-xl">
            <div className="flex flex-wrap justify-center w-full">
                {results.map(data => {
                    const [field, res] = data;
                    return (
                        <div className="p-2.5 m-2 flex flex-col items-center content-center" key={v4()}>
                            <h4 className="font-bold">Field {field}</h4>
                            <table className="text-center border w-full">
                                <tbody>
                                    {res.map(res => {
                                        return (
                                            <ResultTableRow name={res.name} result={res.result} key={v4()} />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
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