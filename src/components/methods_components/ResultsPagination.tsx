import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { MethodInterface, Results } from "../../interface/MethodInterface";
import { ResultTableRow } from "./MethodDetailsComponent";

interface ResultsPagination {
    page: number;
    method: MethodInterface;
}

export const ResultsPaginationComponent = ({ page, method }: ResultsPagination) => {
    const [results, setResults] = useState<Results>();
    useEffect(() => {
        if (method) {
            Object.entries(method.results_by_category).forEach(entry => {
                const [template, results] = entry;
                if (template === page.toString()) {
                    setResults(results);
                }

            });
        }
    }, [method, page]);

    return (
        <div className="flex flex-col items-center w-3/4 max-w-xl">
            <h4 className="font-bold">Template {page}</h4>
            <table className="text-center border w-full">
                <tbody>
                    {results &&
                        Object.entries(results).map(res => {
                            return (
                                <ResultTableRow name={res[0]} result={res[1]} key={v4()} />
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};
