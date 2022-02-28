
import { useState } from "react";
import { v4 } from "uuid";
import { MethodInterface } from "../table_components/MethodsTableComponent";

interface MethodLinkProps {
    method: MethodInterface
}

function MethodLink({method}: MethodLinkProps) {
    return(
        <div className="flex flex-row m-3 p-2 border rounded-md justify-between items-center hover:shadow-md hover:rounded-none hover:bg-slate-400/30 duration-300">
            <div className="flex flex-col">
                <h3 className="font-bold">{method.name}</h3>
                <h4 className="font-light text-sm">{method.info.substring(0, 20)}...</h4>
            </div>
            <div className="m-2">
                <h4>{method.link}</h4>
            </div>
        </div>
    )
}

export function MethodsListComponent() {
    const mockedMethodsList: MethodInterface[] = [
        {
            id: "1",
            info: "Esto es un metodo de ejemplo",
            link: "www.google.es",
            name: "Metodo 1",
            user_id: "1",
            results: {
                f1Score: 0.9899,
                recallScore: 0.2223,
                precisionScore: 0.3321
            }
        },
        {
            id: "2",
            info: "Esto es un metodo de ejemplo",
            link: "www.google.es",
            name: "Metodo 2",
            user_id: "1",
            results: {
                f1Score: 0.2323,
                recallScore: 0.7687,
                precisionScore: 0.6785
            }
        },
        {
            id: "3",
            info: "Esto es un metodo de ejemplo",
            link: "www.google.es",
            name: "Metodo 3",
            user_id: "1",
            results: {
                f1Score: 0.5743,
                recallScore: 0.7857,
                precisionScore: 0.8986
            }
        },
    ]
    return (
        <div className="w-full">
            {mockedMethodsList.map(method => <MethodLink method={method} key={method.id}/>)}
        </div>
    )
}