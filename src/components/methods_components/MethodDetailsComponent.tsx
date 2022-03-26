import { v4 } from "uuid";
import { useFetch } from "../../hooks/useFetch";
import { AuthorDataComponent } from "../table_components/AuthorDataComponent";
import { MethodInterface } from "../table_components/MethodsTableComponent";

/* Private component */
interface ResultTableRowProps {
    name: string,
    result: number
}

function ResultTableRow({name, result}: ResultTableRowProps) {
    return (
        <>
            <tr>
                <th className="bg-blue-100">{name}</th>
            </tr>
            <tr>
                <td>{result}</td>
            </tr>
        </>
    )
}

interface MethodDetailsProps {
    methodId: string
}

export const MethodDetailsComponent = ({methodId}: MethodDetailsProps) => {
    const { data: method, isPending, error } = useFetch<MethodInterface, undefined>(`methods/${methodId}`);

    function reload() {
        window.location.reload();
    }

    return(
        <>
        {
            isPending &&
            <h3 className="animate-pulse text-lg font-bold">Loading...</h3>
        }
        {
            error && !isPending &&
            <div className='flex flex-col items-center text-center'>
                <h3 className='text-lg'>Something went wrong</h3>
                <p className='text-sm font-light'>Error: {error}</p>
                <button
                className="m-3 px-3 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-300 hover:scale-105 hover:shadow-md transition duration-100 ease-in-out active:shadow-none"
                onClick={reload}>
                    Reload
                </button>
            </div>
        }
        {
            method && !isPending &&
            <div className="flex flex-col items-center bg-white rounded border w-11/12 m-3 md:w-4/6">
                <AuthorDataComponent id={method.user_id}/>
            
                <div className="flex flex-col items-center m-2 w-full">
                    <h3 className="text-xl font-bold">Name</h3>
                    <h4 className="text-lg">{method.name}</h4>
                </div>

                <div className="flex flex-col items-center m-2 w-full">
                    <h3 className="text-xl font-bold">Description</h3>
                    <h4 className="text-lg">{method.info}</h4>
                </div>

                <div className="flex flex-col items-center m-2 w-full">
                    <h3 className="text-xl font-bold">Link</h3>
                    <h4 className="text-lg">{method.link}</h4>
                </div>
                
                <div className="flex flex-col items-center m-2 w-full">
                    <h3 className="text-xl font-bold">Private?</h3>
                    <h4 className="text-lg">{method.private? "Yes": "No"}</h4>
                </div>

                <div className="flex flex-col items-center m-2 w-full">
                    <h3 className="text-xl font-bold">Results:</h3>
                    <table className="text-center border">
                        <tbody>
                            {
                                Object.entries(method.results).map(result => {
                                    return (
                                        <ResultTableRow key={v4()} name={result[0]} result={result[1]}/>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        }
        </>
    );
}