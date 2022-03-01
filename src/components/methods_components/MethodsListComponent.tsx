import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContextProvider";
import { useFetch } from "../../hooks/useFetch";
import { MethodInterface } from "../table_components/MethodsTableComponent";

export function MethodsListComponent() {
    const [showOptions, setShowOptions] = useState(true);
    const {user_id, token} = useContext(AuthContext);
    const {data, isPending, error} = useFetch<MethodInterface[]>(`methods/user_methods?user_id=${user_id}`, token, true);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    }

    const handleClick = (id: string) => {
        console.log("Eliminado " + id);
    }

    return (
        <div className="w-full">
            {isPending &&
                <div className="flex flex-col items-center">
                    <h3 className="animate-pulse text-2xl font-bold">Cargando...</h3>
                </div>
            }
            {!isPending && error &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-2xl font-bold'>Ha ocurrido un error</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
            }
            {!isPending && data && data.map(method => {
                return (
                    <div className="flex flex-col m-3 p-2 w-full border rounded-md items-center hover:shadow-md hover:rounded-none hover:bg-slate-400/30 duration-300" key={method.id}>
                        <div className="flex flex-row justify-between items-center w-full" onClick={toggleOptions}>
                            <div className="flex flex-col">
                                <h3 className="font-bold">{method.name}</h3>
                                <h4 className="font-light text-sm">{method.info.substring(0, 20)}...</h4>
                            </div>
                            <div className="m-2">
                                <h4>{method.link}</h4>
                            </div>
                        </div>
                        {showOptions &&
                            <div className="flex flex-row">
                                <Link to={`/method_details/${method.id}`} className="px-3 py-2 m-2 rounded-md text-sm bg-slate-500 text-white">Editar</Link>
                                <Link to={`/method_details/${method.id}`} className="px-3 py-2 m-2 rounded-md text-sm bg-blue-500 text-white">Ver detalles</Link>
                                <button className="px-3 py-2 m-2 rounded-md text-sm bg-red-500 text-white" onClick={() => handleClick(method.id)}>
                                    Borrar
                                </button>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}