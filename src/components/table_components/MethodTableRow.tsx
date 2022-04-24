import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { MethodInterface } from "../../interface/MethodInterface";

interface MethodInterfaceProp {
    method: MethodInterface
}

export const MethodTableRow = ({method}: MethodInterfaceProp) => {

    return(
        <>
        <tr className="border-b hover:bg-gray-200">
            <td className="py-4 px-6">
                <button className="flex flex-col">
                    <p className="font-semibold whitespace-nowrap">{method.name}</p>
                    <Link to={`/method_details/${method.id}`} className="font-light">Details</Link>
                </button>
            </td>
            {
                Object.entries(method.results).map(data => {
                    return <td className="py-4 px-6 font-semibold whitespace-nowrap" key={v4()}>{data[1]}</td>
                })
            }
        </tr>
        </>
    )
}