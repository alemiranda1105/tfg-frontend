import { useContext } from "react";
import { AuthContext } from "../auth/AuthContextProvider";
import { UserDataComponent } from "../components/user_components/UserDataComponent";


export function UserProfilePage() {
    const { user_id } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-3xl font-extrabold text-blue-700">Perfil</h1>
            <div className="flex flex-col items-center w-3/4 p-4 rounded-md shadow-md bg-white">
                { user_id && <UserDataComponent user_id={user_id} /> }
            </div>
        </div>
    )
}