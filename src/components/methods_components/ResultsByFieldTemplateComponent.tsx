import { useEffect, useState } from "react";
import { MethodInterface, ResultsV2 } from "../../interface/MethodInterface";
import { ShowResultsByFieldAndTemplateComponent } from "./ShowResultsByFieldAndTemplateComponent";


interface ResultsByFieldProps {
    method: MethodInterface
}

export const ResultsByFieldTemplateComponent = ({method}: ResultsByFieldProps) => {
    const [actualPage, setActualPage] = useState(1);
    const [results, setResults] = useState<{[key: string]: ResultsV2[]}>();

    function loadResults(page: number) {
        let [, actualResults] = Object.entries(method.results_by_category_field).filter(r => r[0] === (page).toString())[0];
        setResults(actualResults);
    }

    function changePage(next: boolean) {
        if(method) {
            var page = actualPage;
            if(next) {
                if(actualPage + 1 > Object.keys(method.results_by_category_field).length) {
                    page = 1;
                } else {
                    page++;
                }
            } else {
                if(actualPage <= 1) {
                    page = Object.keys(method.results_by_category_field).length;
                } else {
                    page--;
                }
            }
            setActualPage(page);
            loadResults(page);
        }
    }

    useEffect(() => {        
        if(!results) {
            let [, actualResults] = Object.entries(method.results_by_category_field).filter(r => r[0] === (actualPage).toString())[0];
            setResults(actualResults);
        }
    }, [actualPage, method.results_by_category_field,results]);

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="text-blue-600 font-semibold">Template {actualPage}</h2>

            { results && <ShowResultsByFieldAndTemplateComponent list={results} page={actualPage}/> }

            <div className="flex flex-wrap">
                <button
                className="m-1 p-1.5 text-blue-500 font-bold hover:underline duration-300 transition"
                onClick={() => changePage(false)}>Previous template</button>
                <button
                className="m-1 p-1.5 text-blue-500 font-bold hover:underline duration-300 transition"
                onClick={() => changePage(true)}>Next template</button>
            </div>
        </div>
    )

}