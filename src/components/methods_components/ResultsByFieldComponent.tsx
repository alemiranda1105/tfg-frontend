import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { MethodInterface, ResultByField } from "../../interface/MethodInterface";
import { ResultTableRow } from "./MethodDetailsComponent";

interface ResultsByFieldProps {
    method: MethodInterface;
}

export const ResultsByFieldComponent = ({ method }: ResultsByFieldProps) => {
    const ELEMENTS_BY_PAGE = 5;

    const [results, setResults] = useState<ResultByField[]>([]);
    const [actualPage, setActualPage] = useState(1);

    useEffect(() => {
        if (results.length <= 0) {
            setResults(method.results_by_field.slice(0, ELEMENTS_BY_PAGE));
        }
    }, [method, results]);

    function changePage(next: boolean) {
        if (method) {
            if (next) {
                if (ELEMENTS_BY_PAGE * actualPage > method.results_by_field.length) {
                    setActualPage(1);
                } else {
                    setActualPage(actualPage + 1);
                }
            } else {
                if (actualPage <= 1) {
                    setActualPage(method.results_by_field.length);
                } else {
                    setActualPage(actualPage - 1);
                }
            }
            let start = ELEMENTS_BY_PAGE * actualPage;
            var end = ELEMENTS_BY_PAGE * (actualPage + 1);
            if (end > method.results_by_field.length) {
                end = method.results_by_field.length;
            }
            setResults(method.results_by_field.slice(start, end));
        }
    }

    return (
        <div className="flex flex-col items-center content-center w-3/4 max-w-xl">
            {results.map(res => {
                return (
                    <div className="p-2.5 m-2 flex flex-col items-center content-center" key={v4()}>
                        <h4 className="font-bold">Field {res.name}</h4>
                        <table className="text-center border w-full">
                            <tbody>
                                {res.results &&
                                    Object.entries(res.results).map(res => {
                                        return (
                                            <ResultTableRow name={res[0]} result={res[1]} key={v4()} />
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                );
            })}
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
