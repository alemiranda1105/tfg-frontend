import { MethodInterface } from "./MethodsTableComponent"

interface MethodInterfaceProp {
    method: MethodInterface
}

export const MethodTableRow = ({method}: MethodInterfaceProp) => {
    return(
        <>
        <tr className="border-b">
            <td className="py-4 px-6 font-semibold whitespace-nowrap">{method.name}</td>
            <td className="py-4 px-6 font-semibold whitespace-nowrap">{method.results[0].f1_score}</td>
            <td className="py-4 px-6 font-semibold whitespace-nowrap">{method.results[1].recall_score}</td>
            <td className="py-4 px-6 font-semibold whitespace-nowrap">{method.results[2].precision_score}</td>
        </tr>
        </>
    )
}