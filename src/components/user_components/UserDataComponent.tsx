import { useState } from "react"
import { Link } from "react-router-dom"
import { useFetch } from "../../hooks/useFetch"
import { LoadingComponent } from "../custom_components/LoadingComponent"
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
                <LoadingComponent />
            }
            {error &&
                <div className='flex flex-col items-center text-center'>
                    <h3 className='text-lg'>Something went wrong</h3>
                    <p className='text-sm font-light'>Error: {error}</p>
                </div>
            }
            {userData &&
                <>
                    <div className="flex flex-col flex-wrap items-center m-2 overflow-auto text-ellipsis">
                        <h3 className="text-xl font-bold">Username</h3>
                        <h4 className="text-lg">{userData.username}</h4>
                    </div>
                    <div className="flex flex-col flex-wrap items-center m-2 overflow-auto text-ellipsis">
                        <h3 className="text-xl font-bold">Email</h3>
                        <h4 className="text-sm text-left md:text-center md:text-lg">{userData.email}</h4>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center text-center m-2">
                        <Link to={`/update_user`} className="px-3 py-2 m-2 rounded-md text-sm bg-slate-500 hover:bg-slate-500/40 text-white">Update profile</Link>
                        {
                            !showDelete &&
                            <button className="px-3 py-2 m-2 rounded-md text-sm bg-red-500 hover:bg-red-500/40 text-white" onClick={() => setShowDelete(!showDelete)}>Remove profile</button>
                        }
                    </div>
                    {
                        showDelete &&
                        <DeleteUserComponent handleShow={setShowDelete} />
                    }        
                </>
            }
        </div>
    )
}