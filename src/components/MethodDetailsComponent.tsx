import { useFetch } from "../hooks/useFetch";
import { AuthorDataComponent } from "./AuthorDataComponent";
import { MethodInterface } from "./MethodsTableComponent";

interface MethodDetailsProps {
    methodId: string
}

export const MethodDetailsComponent = ({methodId}: MethodDetailsProps) => {
    const { data: method, isPending, error } = useFetch<MethodInterface>(`methods/${methodId}`);

    return(
        <>
        {
            isPending &&
            <p>Cargando...</p>
        }
        {
            error && !isPending &&
            <p>Error</p>
        }
        {
            method && !isPending &&
            <div className="flex flex-col items-center bg-white rounded shadow-md w-11/12 m-3 md:w-4/6">
            <div className="flex flex-col items-center m-2 w-full">
                <h3 className="text-xl font-bold">Nombre</h3>
                <h4 className="text-lg">{method.name}</h4>
            </div>
            
            <AuthorDataComponent id={method.user_id}/>

            <div className="flex flex-col items-center m-2 w-full">
                <h3 className="text-xl font-bold">Descripción</h3>
                <h4 className="text-lg">{method.info}</h4>
            </div>
            <div className="flex flex-col items-center m-2 w-full">
                <h3 className="text-xl font-bold">Link de la publicación</h3>
                <h4 className="text-lg">{method.link}</h4>
            </div>
            <div className="flex flex-col items-center m-2 w-full">
                <h3 className="text-xl font-bold">Resultados:</h3>
                <table className="text-center border">
                    <tbody>
                        <tr>
                            <th className="bg-blue-100">f1_score</th>
                        </tr>
                        <tr>
                            <td>{method.results[0].f1_score}</td>
                        </tr>
                        <tr>
                            <th className="bg-blue-100">recall_score</th>
                        </tr>
                        <tr>
                            <td>{method.results[1].recall_score}</td>
                        </tr>
                        <tr>
                            <th className="bg-blue-100">precision_score</th>
                        </tr>
                        <tr>
                            <td>{method.results[2].precision_score}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        }
        </>
    );
}