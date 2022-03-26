import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { AuthContext } from "../../auth/AuthContextProvider";
import { useFetch } from "../../hooks/useFetch";
import { MethodInterface } from "../table_components/MethodsTableComponent";
import { DeleteMethodComponent } from "./DeleteMethodComponent";


export function MethodsListComponent() {
    const { token } = useContext(AuthContext);
    const { data, isPending, error } = useFetch<MethodInterface[], undefined>(`methods/user_methods?user_id=${getCookie('user_id')}`);

    const [userMethods, setUserMethods] = useState<MethodInterface[]>();

    const [removing, setRemoving] = useState(false);
    const [removingId, setRemovingId] = useState("");

    useEffect(() => {
        setUserMethods(data);
    }, [data]);

    const handleClick = async (id: string) => {
        const list = userMethods?.filter(method => method.id !== id);
        setUserMethods(list);
        setRemovingId(id);
        setRemoving(true);
    }

    return (
        <div className="w-full">
            {isPending &&
                <div className="flex flex-col items-center">
                    <h3 className="animate-pulse text-2xl font-bold">Loading...</h3>
                </div>
            }
            {!isPending && error &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-2xl font-bold'>Something went wrong</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
            }
            {!isPending && userMethods && userMethods.map(method => {
                return (
                    <div className="flex flex-col my-3 p-2 w-full border rounded-md items-center hover:rounded-none hover:bg-slate-400/30 duration-300" key={method.id}>
                        <div className="flex flex-row justify-between items-center w-full">
                            <div className="flex flex-col">
                                <h3 className="font-bold">{method.name}</h3>
                                <h4 className="font-light text-sm">{method.info.substring(0, 20)}...</h4>
                                <h4 className="text-sm">{method.private? "Private": "Public"}</h4>
                            </div>
                            <div className="m-2">
                                <h4>{method.link}</h4>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row text-center">
                            <Link to={`/edit_method/${method.id}`} className="px-3 py-2 m-2 rounded-md text-sm bg-slate-500 hover:bg-slate-500/40 text-white">Update</Link>
                            <Link to={`/method_details/${method.id}`} className="px-3 py-2 m-2 rounded-md text-sm bg-blue-500 hover:bg-blue-500/40 text-white">Details</Link>
                            <button className="px-3 py-2 m-2 rounded-md text-sm bg-red-500 hover:bg-red-500/40 text-white" onClick={() => handleClick(method.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                )
            })}

            {removing && removingId &&
                <DeleteMethodComponent url={`methods/${removingId}`} token={token} action={"delete"} setShow={setRemoving} />
            }

            {!isPending && userMethods && userMethods.length <= 0 &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-2xl font-bold'>An error happened</h3>
                    <p className='text-sm font-light'>Error: This user has not upload any method yet</p>
                    <Link to={"/upload_method"} className="px-3 py-2 m-2 rounded-md text-sm bg-blue-500 hover:bg-blue-500/40 text-white font-bold">Upload method</Link>
                </div>
            }
        </div>
    )
}