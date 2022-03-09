import { useFetch } from "../../hooks/useFetch"


type UserProfileData = {
    username: string,
    email: string,
    id: string
}

interface UserDataComponentProps {
    user_id: string
}

export const UserDataComponent = ({ user_id }: UserDataComponentProps) => {
    const { data: userData, error, isPending } = useFetch<UserProfileData, undefined>(`users/profile?user_id=${user_id}`, 'GET');
    
    return (
        <div>
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
                    <div className="flex flex-col items-center m-2 w-full">
                        <h3 className="text-xl font-bold">Nombre de usuario</h3>
                        <h4 className="text-lg">{userData.username}</h4>
                    </div>
                    <div className="flex flex-col items-center m-2 w-full">
                        <h3 className="text-xl font-bold">Correo electrónico</h3>
                        <h4 className="text-lg">{userData.email}</h4>
                    </div>
                </>
            }
        </div>
    )
}