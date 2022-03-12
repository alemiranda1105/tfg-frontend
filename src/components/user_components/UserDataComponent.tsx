import { useState } from "react"
import { Link } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { DeleteUserComponent } from "./DeleteUserComponent"


export type UserProfileData = {
    username: string,
    email: string,
    id: string
}

interface UserDataComponentProps {
    user_id: string
}

export const UserDataComponent = ({ user_id }: UserDataComponentProps) => {
    const { data: userData, error, isPending } = useFetch<UserProfileData, undefined>(`users/profile?user_id=${user_id}`, 'GET');

    const [showDelete, setShowDelete] = useState(false);

    return (
        <div className="w-full">
            {isPending &&
                <h3 className="animate-pulse text-lg font-bold">Cargando...</h3>
            }
            {error &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-lg'>Ha ocurrido un error</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
            }
            {userData &&
                <>
                    <div className="flex flex-col items-center m-2">
                        <h3 className="text-xl font-bold">Nombre de usuario</h3>
                        <h4 className="text-lg">{userData.username}</h4>
                    </div>
                    <div className="flex flex-col items-center m-2">
                        <h3 className="text-xl font-bold">Correo electrónico</h3>
                        <h4 className="text-lg">{userData.email}</h4>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center text-center m-2">
                        <Link to={`/update_user`} className="px-3 py-2 m-2 rounded-md text-sm bg-slate-500 hover:bg-slate-500/40 text-white">Editar perfil</Link>
                        <button className="px-3 py-2 m-2 rounded-md text-sm bg-red-500 hover:bg-red-500/40 text-white" onClick={() => setShowDelete(!showDelete)}>Borrar perfil</button>
                    </div>
                    {
                        showDelete &&
                        <DeleteUserComponent />
                    }        
                </>
            }
        </div>
    )
}