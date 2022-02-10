import { Link } from "react-router-dom";
import { MethodInterface } from "./MethodsTableComponent"

interface MethodInterfaceProp {
    method: MethodInterface
}

export const MethodTableRow = ({method}: MethodInterfaceProp) => {

    return(
        <>
        <tr className="border-b hover:bg-slate-50">
            <td className="py-4 px-6">
                <button className="flex flex-col">
                    <p className="font-semibold whitespace-nowrap">{method.name}</p>
                    <Link to={`/method_details/${method.id}`} className="font-light">Ver detalles</Link>
                </button>
            </td>
            <td className="py-4 px-6 font-semibold whitespace-nowrap">{method.results[0].f1_score}</td>
            <td className="py-4 px-6 font-semibold whitespace-nowrap">{method.results[1].recall_score}</td>
            <td className="py-4 px-6 font-semibold whitespace-nowrap">{method.results[2].precision_score}</td>
        </tr>
        </>
    )
}