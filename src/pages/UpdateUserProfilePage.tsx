import { useContext } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import { UpdateUserForm } from "../components/user_components/UpdateUserForm";


export function UpdateUserProfilePage() {
    const { token, user_id } = useContext(AuthContext);
    
    return(
        <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-extrabold text-blue-700">Editar usuario</h1>
            <h3 className="text-md font-light md:m-0 m-3">Edite los datos del usuario</h3>
            { user_id && token && <UpdateUserForm user_id={user_id} token={token}/> }
        </div>
    )
}