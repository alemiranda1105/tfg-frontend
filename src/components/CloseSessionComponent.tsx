import { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContextProvider";


interface ModalInterface {
    handleClose: () => void
}

function LogOutDialog({handleClose}: ModalInterface) {
    const {setId, setToken} = useContext(AuthContext);
    const logout = () => {
        document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setId("");
        setToken("");
        
    }

    return (
        <div className="fixed top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-gray-800/60">
            <div className="flex flex-col items-center content-center place-content-between w-2/4 h-1/4 rounded-md shadow-md bg-white p-3">
                <h2 className="text-2xl font-bold">
                    ¿Seguro que desea cerrar sesión?
                </h2>
                <h3 className="text-md font-light">
                    Para volver a utilizar los servicios deberá iniciar sesión de nuevo
                </h3>
                <div className="flex justify-center items-center w-full content-between">
                    <button 
                    onClick={logout}
                    className="px-10 py-3 bg-orange-400 active:bg-orange-400/40 rounded-md m-4 font-semibold text-white shadow-lg hover:shadow-none"
                    >
                        Sí
                    </button>

                    <button 
                    onClick={handleClose}
                    className="px-10 py-3 bg-blue-500 active:bg-blue-500/40 rounded-md m-4 font-semibold text-white shadow-lg hover:shadow-none"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )

}


export function CloseSessionComponent() {
    const [showModal, setShowModal] = useState(false);

    const displayModal = () => {
        setShowModal(!showModal);
    }

    return (
        <>
            <button onClick={displayModal}>
                Cerrar sesión
            </button>

            {
                showModal && <LogOutDialog handleClose={displayModal} />
            }
        </>
    )
}